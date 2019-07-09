"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class Service {
  calcPeriod(emission, maturity, type_calc, lack) {
    const period = (0, _dateFns.differenceInCalendarDays)((0, _dateFns.parseISO)(maturity), (0, _dateFns.parseISO)(emission)) - lack;
    return type_calc == 2 ? period : period / 30;
  }

  calcInterest(type_interest, value, interest, period) {
    let total_interest = 0;

    if (type_interest == 1) {
      total_interest = value * (1 + interest / 100 * period) - value;
    } else {
      total_interest = value * Math.pow(1 + interest / 100, period) - value;
    }

    return Math.round(total_interest * 100) / 100;
  }

  calcFine(fine, type_fine, value) {
    let total_fine = 0;

    if (type_fine == 1) {
      total_fine = Math.round(fine * 100) / 100;
    } else {
      total_fine = Math.round(value * (fine / 100) * 100) / 100;
    }

    return Math.round(total_fine * 100) / 100;
  }

}

var _default = new Service();

exports.default = _default;