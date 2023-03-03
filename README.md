# Ethereum List

The App fetches and watches for the most recent mined block on the Ethereum
Main Net. It displays the transactions for that block with the value in ETH
and in USD. If the USD value is less the 1cent, then the row is gray, else
if the transaction has a significant USD value then the row is displayed in
black text.

See [eth.dottics.com](http://eth.dottics.com).

## Notes and Questions

See [NOTES.md](./NOTES.md)

## Get set up

**Development**
1. Clone the repo.
2. Run NPM install.
3. Start the development server.

```bash
npm run dev
```

**Build**
```bash
npm run build
```

**Test**
```bash
npm run test
```