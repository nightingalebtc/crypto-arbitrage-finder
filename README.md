# Crypto Arbitrage Finder

Find profitable arbitrage opportunities across multiple cryptocurrency exchanges.

## Features

- Real-time price comparison across Binance, OKX, and Bybit
- Configurable trading pairs and profit thresholds
- Detailed logging and error handling
- Easy-to-read console output

## Supported Exchanges

- **Binance** - World's largest crypto exchange
- **OKX** - Major global crypto exchange
- **Bybit** - Popular derivatives exchange

## Installation

```bash
git clone https://github.com/nightingalebtc/crypto-arbitrage-finder.git
cd crypto-arbitrage-finder
npm install
```

## Usage

```bash
npm start
```

## Configuration

Edit `config.json` to customize:

- Trading pairs to monitor
- Minimum profit percentage
- Exchange selection

## Example Output

```
[INFO] 2024-03-29T13:45:23.123Z - Scanning 6 symbols for arbitrage opportunities
[INFO] 2024-03-29T13:45:24.456Z - Found opportunity: BTCUSDT - 0.15%

=== Arbitrage Opportunities ===
1. BTCUSDT
   Buy: Binance @ $67450.23
   Sell: OKX @ $67560.45
   Profit: 0.16%
```

## Risk Warning

This tool is for informational purposes only. Cryptocurrency trading involves substantial risk.