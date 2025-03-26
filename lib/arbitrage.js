const Logger = require('./logger');

class ArbitrageFinder {
  constructor(exchanges) {
    this.exchanges = exchanges;
  }

  async findOpportunities(symbols) {
    const opportunities = [];
    Logger.info(`Scanning ${symbols.length} symbols for arbitrage opportunities`);
    
    for (const symbol of symbols) {
      try {
        const prices = await this.getPricesForSymbol(symbol);
        if (prices.length < 2) {
          Logger.warn(`Insufficient price data for ${symbol} (only ${prices.length} exchange(s))`);
          continue;
        }

        const sortedPrices = prices.sort((a, b) => a.price - b.price);
        const lowest = sortedPrices[0];
        const highest = sortedPrices[sortedPrices.length - 1];

        const profitPercent = ((highest.price - lowest.price) / lowest.price) * 100;

        if (profitPercent > 0.1) {
          opportunities.push({
            symbol: symbol,
            buyExchange: lowest.exchange,
            sellExchange: highest.exchange,
            buyPrice: lowest.price,
            sellPrice: highest.price,
            profitPercent: profitPercent.toFixed(2)
          });
          Logger.info(`Found opportunity: ${symbol} - ${profitPercent.toFixed(2)}%`);
        }
      } catch (error) {
        Logger.error(`Error processing ${symbol}: ${error.message}`);
      }
    }

    return opportunities.sort((a, b) => b.profitPercent - a.profitPercent);
  }

  async getPricesForSymbol(symbol) {
    const prices = [];
    
    for (const exchange of this.exchanges) {
      try {
        const ticker = await exchange.getTicker(symbol);
        prices.push(ticker);
      } catch (error) {
        Logger.error(`Error getting price from ${exchange.name} for ${symbol}: ${error.message}`);
      }
    }
    
    return prices;
  }
}

module.exports = ArbitrageFinder;