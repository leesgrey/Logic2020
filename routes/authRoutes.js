// new Student({username: "student", password: "password", first_name: "samin", last_name: "khan", grades: {"A1: 0}})

module.exports = app => {

  // verify user login by checking username and password, sends error if not
  app.post("/api/login", (req, res) => {
    student_table.findOne({ "username": req.body.username }, (error, result) => {
      if(error) {
        return res.status(400).send(error);
      }
      if (req.body.password != result.password){
        return res.status(400).send('Wrong Password');
      }

      req.session.user = req.body.username;
      req.session.password = req.body.password;
      res.send(result);
    });
  });

  // A route to logout a user
  app.get('/logout', (req, res) => {
  	// Remove the session
  	req.session.destroy((error) => {
  		if (error) {
  			res.status(500).send(error)
  		} else {
  			res.redirect('/')
  		}
  	})
  })

}
