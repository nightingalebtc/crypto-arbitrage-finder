class Exchange {
  constructor(name) {
    this.name = name;
  }

  async getTicker(symbol) {
    throw new Error('getTicker must be implemented by subclass');
  }

  async getOrderBook(symbol) {
    throw new Error('getOrderBook must be implemented by subclass');
  }
}

module.exports = Exchange;