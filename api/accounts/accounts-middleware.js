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
      if (result.length > 0) {
        req.account = result;
          next();
      } else {
          res.status(404).json({
              message: 'account not found',
          });
      }
  } catch (err) {
      next(err);
  }
};
