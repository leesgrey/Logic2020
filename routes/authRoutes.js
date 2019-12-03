
// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {
    // verify user login by checking username and password, sends error if not
    app.post("/api/login", (req, res) => {
        student_table.findOne({ "username": req.body.username }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            if (req.body.password != result.password){
                res.status(500).send('Wrong Password')

            }
            res.send(result)

        });
    });

}