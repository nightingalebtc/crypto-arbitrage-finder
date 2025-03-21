const axios = require('axios');
const Exchange = require('./exchange');

class OKX extends Exchange {
  constructor() {
    super('OKX');
    this.baseUrl = 'https://www.okx.com/api/v5';
  }

  async getTicker(symbol) {
    try {
      const instId = symbol.replace('USDT', '-USDT');
      const response = await axios.get(`${this.baseUrl}/market/ticker?instId=${instId}`);
      if (response.data.data.length === 0) {
        throw new Error('No data returned');
      }
      return {
        symbol: instId,
        price: parseFloat(response.data.data[0].last),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get ticker from ${this.name}: ${error.message}`);
    }
  }

  async getOrderBook(symbol) {
    try {
      const instId = symbol.replace('USDT', '-USDT');
      const response = await axios.get(`${this.baseUrl}/market/books?instId=${instId}&sz=5`);
      if (response.data.data.length === 0) {
        throw new Error('No data returned');
      }
      const data = response.data.data[0];
      return {
        symbol: instId,
        bids: data.bids.map(bid => ({ price: parseFloat(bid[0]), quantity: parseFloat(bid[1]) })),
        asks: data.asks.map(ask => ({ price: parseFloat(ask[0]), quantity: parseFloat(ask[1]) })),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get order book from ${this.name}: ${error.message}`);
    }
  }
}

module.exports = OKX;