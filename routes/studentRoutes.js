module.exports = app => {
    //get all students
    app.get("/students", (request, response) => {
        student_table.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });

    //update specific student's grades given student and Ass id's
    app.put('/students/:id/:a_id', (req, res) => {
        // Add code here

        const id = req.params.id
        if (!ObjectID.isValid(id)) {
            res.status(404).send()  
        }

        
        const a_id = req.params.a_id
        if (!ObjectID.isValid(a_id)) {
            res.status(404).send()  
        }

        student_table.findById(id).then((student) => {
            if (!student) {
                res.status(404).send()  
            } else {  
                const ass = student.grades.id(a_id);
                if (!ass) {
                    res.status(404).send();
                } else {
                    ass.set(req.body)
                    student.save()
                    res.send({"Student": student, "grades": student.grades});

                }
            }
        }).catch((error) => {
            res.status(500).send() 
        }) 	
    })
}