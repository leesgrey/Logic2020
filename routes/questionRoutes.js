
// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {
    //sends all questions
    app.get("/questions", (req, res) => {
        question_table.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });


    //Sends specific question
    app.get('/questions/:qid', (req, res) => {
        question_table.findOne({ "qid": req.params.qid }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    })
}