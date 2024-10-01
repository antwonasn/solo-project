const express = require('express');
const path = require('path');
const userController = require('./controllers/userController')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('../db/models/userModels');

app.use(cors());
app.use(session({
  store: new pgSession({
    pool: db, // Your PostgreSQL pool instance
  }),
  secret: 'lwZLP3w8sOiO64JG', // Change this to a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // Set to true in production with HTTPS
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//signup post request

app.post('/signup', userController.createUser, (req, res) => {
  console.log(`created user`, res.locals.createdUser);
  return res.status(200).json({ message: 'Signup successful' });
});
// login post request
app.post('/login', userController.verifyUser, (req, res) => {
  if (req.session.userId) {
    // User is authenticated, render the account page or send user data
    res.status(200).json({ message: 'Login successful', userId: req.session.userId });
  } else {
    res.redirect('/'); // Redirect to login if not authenticated
  }
});

app.use((req, res) => res.sendStatus(404));
//global error handler 

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
