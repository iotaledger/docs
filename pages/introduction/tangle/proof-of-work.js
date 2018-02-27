import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'PoW on the Tangle',
  date: '20 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/tangle/proof-of-work.js',
})(markdown(components)`
Currently the Tangle prevents an unreasonable amount of spam on the 
network using Proof of Work (PoW). The system used is based on [Hash Cash](https://en.wikipedia.org/wiki/Hashcash), which is an
an approach used by [other cryptocurrencies](https://en.wikipedia.org/wiki/Hashcash#Bitcoin_mining)

## Min Weight Magnitude
The difficulty of the PoW is set by a variable called Minimum Weight 
Magnitude (MWM). This refers to the number of trailing zeros (in trits) 
in transaction hash. MWM is proportional to the difficulty of the Proof of Work. 

The device which does the PoW will bruteforce the transaction
hash to find a \`nonce\` that has the correct number of trailing 0's.
Every extra trailing zero to be found will increase the difficulty of PoW 
by 3 times. 

### MWM values 
- Mainnet MWM parameter: 14
- Testnet MWM parameter: 9



  - Possibly explain the basics of hash functions and distinguish between normal and cryptographic hash functions
  - State which hash function IOTA uses for PoW versus private key, address, and signature generation
  - Higher min weight magnitude can give your transaction priority (at least I have heard so) 
`)
