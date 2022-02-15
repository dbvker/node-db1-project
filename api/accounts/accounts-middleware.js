const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
    // DO YOUR MAGIC
    // Note: you can either write "manual" validation logic
    // or use the Yup library (not currently installed)
    next();
};

exports.checkAccountNameUnique = (req, res, next) => {
    // DO YOUR MAGIC
    next();
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
      const result = await Account.getById(id);
      if (!result) {
        next({ status: 404, message: 'account not found'})
      } else {
          req.result = result;
          next();
      }
  } catch (err) {
      next(err);
  }
};
