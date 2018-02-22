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
 - Tangle: prevents transaction spam (hash cash style PoW)
  - Min weight magnitude = number of trailing zeros of trits in transaction hash
    - Min weight magnitude is proportional to difficulty of proof of work
  - Possibly explain the basics of hash functions and distinguish between normal and cryptographic hash functions
  - State which hash function IOTA uses for PoW versus private key, address, and signature generation
  - Higher min weight magnitude can give your transaction priority (at least I have heard so) 
`)
