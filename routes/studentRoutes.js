module.exports = app => {
    //get all students
    //input body: NA
    //output: [{ "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","grades": [0,90,0] }, .....]


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
    //output: { "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","grades": [0,90,0] }

    app.get("/api/students/:username", (req, res) => {
        student_table.findOne({ "username": req.params.username }, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.send(result);
        });
    });



    //update specific student's grades given student and Ass id's (body must contain points to increment grade by)
    //input body: { "points": 90}
    //output: { "Student": { "_id": 0, "username": "user", "password": "user", "first_name": "james", "last_name": "parker","grades": [0,90,0] }}

    app.put('/api/students/:username/:aid', (req, res) => {
        // Add code here



        const aid = req.params.aid


        student_table.findOne({ "username": req.params.username}, (error, result) => {
            if(error) {
                return res.status(500).send(error);
            }
            result.grades[aid] += req.body.points;
            student_table.updateOne( { "username": req.params.username}, { $set: { "grades" : result.grades } })

            res.send(result);

        })


})};
