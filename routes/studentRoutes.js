module.exports = app => {
    //get all students
    //input body: NA
    //output: [{ "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","ass": {aid: 0 , number_qs: 5 ,grade: 0 }, .....]

    app.get("/api/students", (req, res) => {
        student_table.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });

    //get a specific students
    //input body: NA
    //output: { "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","ass": {aid: 0 , number_qs: 5 ,grade: 0 } }

    app.get("/api/students/:username", (req, res) => {
      student_table.findOne({ "username": req.params.username }, (error, result) => {
        if (error || result == null) {
          return res.status(500).send(error);
        }
        res.send(result);
      });
    });

    //update specific student's grades given student and Ass id's (body must contain points to increment grade by)
    //input body: { "points": 90}
    //output: { "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","grades": [0,90,0] }}
    app.put('/api/students/:username', (req, res) => {

        student_table.findOne({ "username": req.params.username}, (error, result) => {
          let assignmentScores = {}
            if(error) {
                return res.status(500).send(error);
            }

            // loop through assignments
            console.log("looping through assignments:")
            ass_table.find({}).toArray( (error, result) => {
              result.map((a) => {
                let score = 0
                for (let i = 0; i < a.questions.length; i++) {
                  if (a.questions[i] in req.body.solutions){
                    score += 1 / a.questions.length
                  }
                }
                assignmentScores[a.aid] = score
                console.log("check1")
                console.log(assignmentScores)
              })
              console.log("check2")
              console.log(assignmentScores)
              student_table.updateMany( { "username": req.params.username}, {$set: { "assignments" : assignmentScores} })
              res.send(assignmentScores);
            })
            student_table.updateMany( { "username": req.params.username}, {$set: {"solutions" : req.body.solutions} })
        })
})};
