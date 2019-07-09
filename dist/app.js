"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _CalcController = _interopRequireDefault(require("./Controllers/CalcController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App {
  constructor() {
    this.server = (0, _express.default)();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.get('/', (req, res) => res.json({
      data: 'Hello!'
    }));
    this.server.post('/calc', _CalcController.default.calc);
  }

  middlewares() {
    this.server.use(_express.default.json());
  }

}

var _default = new App().server;
exports.default = _default;