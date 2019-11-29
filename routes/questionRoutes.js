const { Questions } = require('../models/Questions')

module.exports = app => {

    app.get('/questions', (req, res) => {
        // Add code here
    
        Questions.find().then((questions) => {
            res.send({ questions }) 
        }, (error) => {
            res.status(500).send(error) 
        })
    
    
    })

    app.get('/questions/:id', (req, res) => {
        // Add code here

        const id = req.params.id
        if (!ObjectID.isValid(id)) {
            res.status(404).send()  
        }

        Questions.findById(id).then((question) => {
            if (!question) {
                res.status(404).send()  
            } else {  
                res.send(question)
            }
        }).catch((error) => {
            res.status(500).send() 
        })


    })
}