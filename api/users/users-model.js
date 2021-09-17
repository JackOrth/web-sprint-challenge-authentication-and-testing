const db = require('../../data/dbConfig');

function findBy(filter){
    return db('users')
    .select('id', 'username', 'password')
    .where(filter)
}


async function findById(id) {
    const result = await db('users')
    .select('id', 'username', 'password')
    .where('users.id', id).first()
    return result;
}


async function add(user) { 
  const newUser = await db('users').insert(user)
  const newUserId = newUser[0]
  return findById(newUserId)
}

module.exports = {
  add,
  findById,
  findBy
};