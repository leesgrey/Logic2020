
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

    //get specific Assignment
    app.get('/api/ass/:aid', (req, res) => {
      ass_table.findOne({ "aid": req.params.aid }, (error, result) => {
        if(error) {
          return res.status(500).send(error);
        }
        res.send(result);
      });
    })

    //create a new assignment
    app.post("/api/ass", (req, res) => {
      const name = req.body.name;
      const question = req.body.question;
      const aid = req.body.aid;
      const due = req.body.due;

      ass_table.insertOne( { "name": name, "questions": question, "aid": aid, "due": due, "date": due} ).catch((error) => {
        res.status(500).send(error)
      })
      student_table.updateMany(
        {},
        { $push: { "assignments" : {"aid": aid, "number": question.length, "grade": 0} } }
      ).catch((error) => {
        res.status(500).send(error)
      });

      res.send({ "name": name, "aid": aid, "questions": question })
    });

    //update an assignment
    app.post('/api/ass/:aid', (req, res) => {
      aid = req.body.aid
      name = req.body.name
      question = req.body.question
      due = req.body.due

      ass_table.updateOne({"aid": aid}, {$set: {"questions": question, "name": name, "due": due, "date": due}}).catch((error) => {
        console.log(questions)
        res.status(500).send()
      });
      res.send({"aid": aid,"name": name, "question": question});
    })



}
