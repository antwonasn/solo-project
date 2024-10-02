const db = require('../../db/models/userModels');

const accountController = {};

accountController.fetchAccount = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Get userId from request parameters
    // Replace with your actual database query logic
    const result = await db.query('SELECT * FROM accounts WHERE user_id = $1', [
      userId,
    ]);

    // Check if accounts are found
    if (result.rows.length > 0) {
      res.locals.fetchAccount = result.rows; // Send back the accounts as a JSON response
    } else {
      res.status(404).json({ message: 'No accounts found for this user.' });
    }
    return next();
  } catch (err) {
    const errorObj = {
      log: `accountController.createAccount: ERROR: ${err.message}`,
      message: {
        err: 'accountController.createAccount: ERROR: Failed to create account',
      },
    };
    return next(errorObj);
  }
};

accountController.createAccount = async (req, res, next) => {
  try {
    const { accountName, accountType, accountSummary, taxBracket, userId } =
      req.body;
    if (!accountName || !accountType || !userId)
      throw new Error({ message: 'Missing required fields' });

    const values = [
      accountName,
      accountType,
      accountSummary,
      taxBracket,
      userId,
    ];
    const queryString =
      'INSERT INTO accounts (account_name, account_type, account_summary, tax_bracket, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const result = await db.query(queryString, values);

    res.locals.createdAccount = result.rows[0];

    console.log('Account created, result:', result.rows[0]);
    return next();
  } catch (err) {
    const errorObj = {
      log: `accountController.createAccount: ERROR: ${err.message}`,
      message: {
        err: 'accountController.createAccount: ERROR: Failed to create account',
      },
    };
    return next(errorObj);
  }
};

accountController.deleteAccount = async (req, res, next) => {};

accountController.updateAccount = async (req, res, next) => {};

module.exports = accountController;
