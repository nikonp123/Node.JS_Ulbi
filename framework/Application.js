const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  //endpoint = {
  // '/users: {
  //    'GET':handler,
  //    'POST':handler,
  //   }
  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          //   this.middlewares.forEach((middlware) => middlware(req, res));
          handler(req, res);
        });
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
  _createServer() {
    return http.createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      //   req.on('end', () => {
      //     console.log(body);
      //     res.end();
      //   });
      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
        }
        this.middlewares.forEach((middlware) => middlware(req, res));
        const emitted = this.emitter.emit(
          this._getRouteMask(req.pathname, req.method),
          req,
          res
        );
        if (!emitted) {
          res.end();
        }
      });
    });
  }
};
