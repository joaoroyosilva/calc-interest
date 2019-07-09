"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = _interopRequireDefault(require("../service"));

var Yup = _interopRequireWildcard(require("yup"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CalcController {
  async calc(req, res) {
    const schema = Yup.object().shape({
      value: Yup.number().required(),
      fine: Yup.number(),
      type_fine: Yup.number(),
      interest: Yup.number(),
      type_calc: Yup.number(),
      type_interest: Yup.number(),
      lack: Yup.number(),
      emission: Yup.date().required(),
      maturity: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({
        error: 'Fields are not specified'
      });
    }

    const {
      fine = 0,
      type_fine = 1,
      interest = 0,
      type_calc = 1,
      type_interest = 1,
      lack = 0,
      value = 0,
      emission,
      maturity
    } = req.body;

    const period = _service.default.calcPeriod(emission, maturity, type_calc, lack);

    const total_interest = _service.default.calcInterest(type_interest, value, interest, period);

    const total_fine = _service.default.calcFine(fine, type_fine, value);

    const total = value + total_interest + total_fine;
    return res.json({
      type: type_interest == 1 ? 'Single Interest' : 'Compound Interest',
      total_interest,
      total_fine,
      original_value: value,
      total,
      total_charges: total_fine + total_interest,
      period: "".concat(period, " ").concat(type_calc == 1 ? 'mounth(s)' : 'day(s)')
    });
  }

}

var _default = new CalcController();

exports.default = _default;