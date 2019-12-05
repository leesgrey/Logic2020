
// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {

    //get all asses
    app.get("/api/ass", (req, res) => {
        ass_table.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });

    //post an ass
    app.post("/api/ass", (req, res) => {
        const name = req.body.name
        const q_ids = req.body.q_ids
        const aid = toString(req.body.aid)
        const due = req.body.due

        ass_table.insertOne( { "name": name, "questions": q_ids , "aid": aid, "due": due} ).catch((error) => {
            res.status(500).send(error)
        })
        student_table.updateMany(
            {},
            { $push: { "assignments" : {"aid": aid, "number": q_ids.length, "grade": 0} } }
         ).catch((error) => {
            res.status(500).send(error)
        });

        res.send({ "name": name, "aid": aid, "questions": q_ids })
    });





    //get specific Assignment
    app.get('/api/ass/:aid', (req, res) => {
        ass_table.findOne({ "aid": req.params.aid }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    })

    //update an assignment
    app.post('/api/ass/:aid', (req, res) => {
      aid = req.body.aid
      name = req.body.name
      question = req.body.question
      due = req.body.due

      ass_table.updateOne({"aid": aid}, {$set: {"questions": question, "name": name, "due": due}}).catch((error) => {
        console.log(questions)
        res.status(500).send()
      });
      res.send({"aid": aid,"name": name, "question": question});
    })



}
