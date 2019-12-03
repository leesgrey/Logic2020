
// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {
    //get all questions
    //output:  [{ "_id": "5de060edf04b9c609d37ed1f", "qid": "R_1.001", "question": "P → P.  P.  ∴P", "answer": "mp"}....],
    app.get("/questions", (req, res) => {
        question_table.find({}).toArray((error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });


    //get specific question
    //output: { "_id": "5de060edf04b9c609d37ed1f", "qid": "R_1.001", "question": "P → P.  P.  ∴P", "answer": "mp"}
    //NOTE: SEND IN QID (ie R_1.001)
    app.get('/questions/:qid', (req, res) => {
        question_table.findOne({ "qid": req.params.qid }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    })
}