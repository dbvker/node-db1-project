const router = require('express').Router();

const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', (req, res, next) => {
    Account.getAll()
        .then((accounts) => {
            res.status(200).json(accounts);
        })
        .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
    // DO YOUR MAGIC
    const account = req.account;
    res.json(account);
});

router.post('/', (req, res, next) => {
    // DO YOUR MAGIC
});

router.put('/:id', checkAccountId, (req, res, next) => {
    // DO YOUR MAGIC
});

router.delete('/:id', checkAccountId, (req, res, next) => {
    // DO YOUR MAGIC
    Account.deleteById(req.params.id)
      .then(deleted => {
        res.json(deleted)
      }).catch(next);
});

router.use((err, req, res, next) => {
    // eslint-disable-line
    // DO YOUR MAGIC
    res.status(err.status || 500).json({
        customMessage: 'There was an error in accounts router.',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;
