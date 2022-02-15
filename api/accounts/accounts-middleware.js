const Account = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
    const error = { status: 400 };
    const { name, budget } = req.body;

    if (name === undefined || budget === undefined) {
        error.message = 'name and budget are required';
        next(error);
    } else if (typeof name !== 'string') {
        error.message = 'name of account must be a string';
    } else if (name.trim().length < 3 || name.trim().length > 100) {
        error.message = 'name of account must be between 3 and 100';
    } else if (typeof budget !== 'number' || isNaN(budget)) {
        error.message = 'budget of account must be a number';
    } else if (budget < 0 || budget > 1000000) {
        error.message = 'budget of account is too large or too small';
    }

    if (error.message) {
        next(error);
    } else {
        next();
    }
};

exports.checkAccountNameUnique = async (req, res, next) => {
    // DO YOUR MAGIC
    try {
        const existingName = await db('accounts')
            .where('name', req.body.name.trim())
            .first();

        if (existingName) {
            next({ status: 400, message: 'that name is taken' });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

exports.checkAccountId = async (req, res, next) => {
    // DO YOUR MAGIC
    const { id } = req.params;
    try {
        const result = await Account.getById(id);
        if (!result) {
            next({ status: 404, message: 'account not found' });
        } else {
            req.result = result;
            next();
        }
    } catch (err) {
        next(err);
    }
};
