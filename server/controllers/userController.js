const db = require('../../db/models/userModels');
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    // console.log(`req body:`, req.body);
    const { username, password } = req.body;
    // Check if user already exists
    const existingUserQuery = 'SELECT COUNT(*) FROM users WHERE username = $1';
    const { rows } = await db.query(existingUserQuery, [username]);

    if (rows[0].count > 0) {
      // User already exists, throw an error
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = [req.body.username, hashedPassword];
    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2)';

    const result = await db.query(queryString, values);
    res.locals.createdUser = result.rows[0];
    console.log('User created, result:', result.rows);

    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.createUser: ERROR: ${err.message}`,
      message: {
        err: 'userController.createUser: ERROR: Failed to create user',
      },
    };
    return next(errorObj);
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(`req body:`, req.body);
    // check if the user exists
    const queryString = 'SELECT * FROM users WHERE username = $1';
    const result = await db.query(queryString, [username]);

    if (result.rows.length === 0) {
      throw new Error({
        log: `userController.verifyUser: ERROR: User not found`,
        message: {
          err: 'Invalid username or password',
        },
      });
    }

    //compare the provided password with the stored password
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords

    if (!isMatch) {
      throw new Error({
        log: `userController.verifyUser: ERROR: Incorrect password`,
        message: {
          err: 'Invalid username or password',
        },
      });
    }

    // If username exists and password matches
    res.locals.user = user; // Optionally store user info for next middleware
    console.log('User verified successfully:', user);

    req.session.userId = user.id; // Or user.username or any relevant data
    console.log('User logged in:', user.username);

    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.createUser: ERROR: ${err.message}`,
      message: {
        err: 'userController.createUser: ERROR: Failed to create user',
      },
    };
    return next(errorObj);
  }
};

userController.updateUser = async (req, res, next) => {};

userController.deleteUser = async (req, res, next) => {};
module.exports = userController;
