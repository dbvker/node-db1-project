const router = require('express').Router();
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', (req, res, next) => {
    Account.getAll()
        .then((accounts) => {
            res.json(accounts);
        })
        .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
    // DO YOUR MAGIC
    res.json(req.result);
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    // DO YOUR MAGIC
    try {
        const newAccount = await Account.create({ name: req.body.name.trim(), budget: req.body.budget })
        res.status(201).json(newAccount);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, async (req, res, next) => {
    // DO YOUR MAGIC
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated);
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
