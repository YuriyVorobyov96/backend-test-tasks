const Currency = require('../domain/currency.domain');
const CURRENCY_ENUM = require('../domain/currency.enum');

class CurrencyService {
  static getRubLine = () => {
    const res = Currency.getLineByCurrency(CURRENCY_ENUM.RUB);

    return res;
  };

  static getUsdLine = () => Currency.getLineByCurrency(CURRENCY_ENUM.USD);

  static getEurLine = () => Currency.getLineByCurrency(CURRENCY_ENUM.EUR);
}

module.exports = CurrencyService;
