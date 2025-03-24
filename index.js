const Binance = require('./lib/binance');
const OKX = require('./lib/okx');
const ArbitrageFinder = require('./lib/arbitrage');
const config = require('./config.json');

console.log('Crypto Arbitrage Finder - Starting...');

const exchanges = [
  new Binance(),
  new OKX()
];

const finder = new ArbitrageFinder(exchanges);
const symbols = config.symbols;

finder.findOpportunities(symbols).then(opportunities => {
  console.log('\n=== Arbitrage Opportunities ===');
  if (opportunities.length === 0) {
    console.log('No profitable opportunities found.');
  } else {
    opportunities.forEach((opp, index) => {
      console.log(`${index + 1}. ${opp.symbol}`);
      console.log(`   Buy: ${opp.buyExchange} @ $${opp.buyPrice}`);
      console.log(`   Sell: ${opp.sellExchange} @ $${opp.sellPrice}`);
      console.log(`   Profit: ${opp.profitPercent}%\n`);
    });
  }
}).catch(error => {
  console.error('Error:', error.message);
});