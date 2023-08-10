class Currency {
  static getLineByCurrency = (currency) => ({ lines: { [currency]: this.#getLineValue() } });

  static #getLineValue = () => (Math.floor(Math.random() * 9) * Math.random()).toFixed(3);
}

module.exports = Currency;
