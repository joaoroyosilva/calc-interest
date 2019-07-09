import Service from '../service';
import * as Yup from 'yup';

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
      maturity: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(403).json({ error: 'Fields are not specified' });
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
      maturity,
    } = req.body;

    const period = Service.calcPeriod(emission, maturity, type_calc, lack);
    const total_interest = Service.calcInterest(
      type_interest,
      value,
      interest,
      period
    );
    const total_fine = Service.calcFine(fine, type_fine, value);
    const total = value + total_interest + total_fine;

    return res.json({
      type: type_interest == 1 ? 'Single Interest' : 'Compound Interest',
      total_interest,
      total_fine,
      original_value: value,
      total,
      total_charges: total_fine + total_interest,
      period: `${period} ${type_calc == 1 ? 'mounth(s)' : 'day(s)'}`,
    });
  }
}

export default new CalcController();
