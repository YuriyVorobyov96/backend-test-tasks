const CurrencyService = require('./currency.service')
const CURRENCY_ENUM = require('../domain/currency.enum');

class CurrencyController {
  static getUrlsList = () => Object.values(CURRENCY_ENUM).map(currency => `/${currency}`);

  static mapUrlToCurrency = (url) => {
    switch(url) {
      case this.#rubUrl():
        return CurrencyService.getRubLine();
      case this.#usdUrl():
        return CurrencyService.getUsdLine();
      case this.#eurUrl():
        return CurrencyService.getEurLine();
    }
  }

  static #rubUrl = () => `/${CURRENCY_ENUM.RUB}`;

  static #usdUrl = () => `/${CURRENCY_ENUM.USD}`;

  static #eurUrl = () => `/${CURRENCY_ENUM.EUR}`;
}

module.exports = CurrencyController;
