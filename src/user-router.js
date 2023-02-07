const Router = require('../framework/Router');
const controller = require('./user-controller');

const router = new Router();

router.get('/users', controller.getUsers);
//  => {
//   //   console.log('GET');
//   //   console.log(req.params);
//   //   if (req.params.id) {
//   //     console.log(req.params.id);
//   //     return res.send(users.find((user) => user.id === Number(req.params.id)));
//   //   }
//   //   res.send(users);
//   //   res.writeHead(200, {
//   //     'Content-type': 'application/json',
//   //   });
//   //   res.end(JSON.stringify(users));
// });

router.post('/users', controller.createUser);

module.exports = router;
