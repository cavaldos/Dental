var db = require('../utils/db');

exports.all = () => {
  return db.load('select * from sites');
}

exports.single = id => {
  return db.load(`select * from sites where id = ${id}`);
}

exports.add = entity => {
  return db.add('sites', entity);
}

exports.del = id => {
  return db.del('sites', 'id', id);
}

exports.patch = (id, entityWoId) => {
  return db.patch('sites', 'id', id, entityWoId);
}