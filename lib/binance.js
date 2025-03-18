const axios = require('axios');
const Exchange = require('./exchange');

class Binance extends Exchange {
  constructor() {
    super('Binance');
    this.baseUrl = 'https://api.binance.com/api/v3';
  }

  async getTicker(symbol) {
    try {
      const response = await axios.get(`${this.baseUrl}/ticker/price?symbol=${symbol}`);
      return {
        symbol: response.data.symbol,
        price: parseFloat(response.data.price),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get ticker from ${this.name}: ${error.message}`);
    }
  }

  async getOrderBook(symbol) {
    try {
      const response = await axios.get(`${this.baseUrl}/depth?symbol=${symbol}&limit=5`);
      return {
        symbol: symbol,
        bids: response.data.bids.map(bid => ({ price: parseFloat(bid[0]), quantity: parseFloat(bid[1]) })),
        asks: response.data.asks.map(ask => ({ price: parseFloat(ask[0]), quantity: parseFloat(ask[1]) })),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get order book from ${this.name}: ${error.message}`);
    }
  }
}

module.exports = Binance;