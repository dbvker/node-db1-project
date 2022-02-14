const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id: id })
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id: id }).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
