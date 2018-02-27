import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { Code } from '../../../components/text/code'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'The IOTA Token',
  date: '19 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/iota-token/the-iota-token.js',
})(markdown(components)`

The IOTA token is a \`cryptotoken\` built upon the Tangle technology. The
token benifits from the advantages of this new Tangle architecture. 

The token operates on a permission-less Tangle network known as the **Mainnet**. 
Individuals are able to intereact with this network by operating
a full node that is peered with neighbours. Alternatively they are able to 
public Mainnet nodes operated by a third party.


## Token Generation

All IOTA's which will ever exist have been created with the genesis 
transaction. This means that the total supply of IOTA's will always 
stay the same and you cannot "mine" IOTA's. Therefore keep in mind, 
if you do Proof of Work in IOTA you are not generating new IOTA 
tokens, you're simply verifying other transactions.

## Token Supply

The total supply of IOTA is \`(3^33-1) / 2\`, which equals to a total number 
of IOTA's of \`2779530283277761\`. IOTA is specifically designed for machines, 
so this high supply makes IOTA optimal for tiny **nano-transactions** while still 
keeping efficiency in mind. 

It also nicely fits into the \`MAX_SAFE_INTEGER\` value in Javascript.

## A Note in Trinary
In this documentation you will often hear the phrase trinary-based which 
is a reference to the unique data structure being utilized in IOTA. 
Whenever we refer to trinary-based seeds, addresses, hashes etc., it means 
that the string can only consist of characters in the latin alphabet and 9.

${<Code>{`// All possible tryte values
var trytesAlphabet = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"
`}</Code>}
Because of the way that Kerl works, a single hash always consists of 81-trytes (81 characters) - sometimes it can be 90-trytes (including 9-tryte checksum).

Valid Trytes: \`VBVEUQY\`

Invalid Trytes: \`Vaafd8432\`
`)
