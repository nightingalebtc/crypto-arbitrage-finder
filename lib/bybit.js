const axios = require('axios');
const Exchange = require('./exchange');

class Bybit extends Exchange {
  constructor() {
    super('Bybit');
    this.baseUrl = 'https://api.bybit.com/v5';
  }

  async getTicker(symbol) {
    try {
      const response = await axios.get(`${this.baseUrl}/market/tickers?category=spot&symbol=${symbol}`);
      if (response.data.result.list.length === 0) {
        throw new Error('No data returned');
      }
      const data = response.data.result.list[0];
      return {
        symbol: data.symbol,
        price: parseFloat(data.lastPrice),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get ticker from ${this.name}: ${error.message}`);
    }
  }

  async getOrderBook(symbol) {
    try {
      const response = await axios.get(`${this.baseUrl}/market/orderbook?category=spot&symbol=${symbol}&limit=5`);
      if (!response.data.result) {
        throw new Error('No data returned');
      }
      const data = response.data.result;
      return {
        symbol: symbol,
        bids: data.b.map(bid => ({ price: parseFloat(bid[0]), quantity: parseFloat(bid[1]) })),
        asks: data.a.map(ask => ({ price: parseFloat(ask[0]), quantity: parseFloat(ask[1]) })),
        exchange: this.name
      };
    } catch (error) {
      throw new Error(`Failed to get order book from ${this.name}: ${error.message}`);
    }
  }
}

module.exports = Bybit;