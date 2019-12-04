const Express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');

const keys = require('./config/keys');
require('./models/Students');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = 'mongodb+srv://csc309Phil:csc309csc309@cluster0-1bsyp.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "logic2020";

//setup mongoose connection
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    question_table = database.collection("questions");
    ass_table = database.collection("ass");
    student_table = database.collection("Students");
    console.log("Connected to " + DATABASE_NAME + "!");
});

var app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
console.log(__dirname)
app.use(Express.static(__dirname + "/client"));

// express-session for managing user sessions
const session = require('express-session');
// Create a session cookie
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1800000,
    httpOnly: true
  }
}));
// Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    console.log("Checking session: " + req.session.user);
    // res.redirect('/student/dashboard'); // redirect to dashboard if logged in.
    if (req.session.type === "student") {
      res.redirect('/student/dashboard');
    } else {
      res.redirect('/admin/dashboard');
    }
  } else {
    next(); // next() moves on to the route.
  }
};

const isloggedInAsStudent = (req, res, next) => {
  if (req.session.user && req.session.type == "student") {
    next();
  } else {
    res.status(401).redirect('/');
  }
};

const isloggedInAsAdmin = (req, res, next) => {
  if (req.session.user && req.session.type == "admin") {
    next();
  } else {
    res.status(401).redirect('/');
  }
};

require('./routes/questionRoutes')(app)
require('./routes/studentRoutes')(app)
require('./routes/assRoutes')(app)
require('./routes/authRoutes')(app)

app.get('/', sessionChecker, (req, res) => {
    res.sendFile(path.join(__dirname + '/client/tmpl/index.html'));
});

app.get('/admin/dashboard', isloggedInAsAdmin, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/professorDashboard.html'))
})

app.get('/admin/course', isloggedInAsAdmin, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/professorCourse.html'))
})

app.get('/admin/account', isloggedInAsAdmin, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/professorAccount.html'))
})

app.get('/student/dashboard', isloggedInAsStudent, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/dashboard.html'))
})

app.get('/practice/:aid/:qid', isloggedInAsStudent, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/practice.html'))
})

app.get('/practice/:qid', isloggedInAsStudent, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/practice.html'))
})

app.get('/student/account', isloggedInAsStudent, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/account.html'))
})

app.get('/admin/assignment/:aid', isloggedInAsAdmin, (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/createAssignment.html'))
})

app.get('/api/student/login', isloggedInAsStudent, (req, res) => {
  res.send({"user": req.session.user})
})

app.get('/api/getCurrentUserInfo', isloggedInAsStudent, (req, res) => {
  req.url = '/api/students/'+ req.session.user;
  return app._router.handle(req, res);
})

app.get('*', (req, res) => {
  res.redirect('/');
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
