// const users = [
//   { id: 1, name: 'Alex' },
//   { id: 2, name: 'Vasya' },
// ];

const User = require('./user-model');

const getUsers = async (req, res) => {
  //   if (req.params.id) {
  //     // console.log(req.params.id);
  //     return res.send(users.find((user) => user.id === Number(req.params.id)));
  //   }
  let users;
  if (req.params.id) {
    users = await User.findById(req.params.id);
  } else {
    users = await User.find();
  }
  res.send(users);
};

const createUser = async (req, res) => {
  //   const user = req.body;
  //   console.log(user);
  const user = await User.create(req.body);
  //   users.push(user);
  res.send(user);
};

module.exports = {
  getUsers,
  createUser,
};
