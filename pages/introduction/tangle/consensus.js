import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Consensus on the Tangle',
  date: '20 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/tangle/consensus.js',
})(markdown(components)`
IOTA is a next generation permissionless distributed ledger that utilizes a 
novel invention, called a “Tangle”, at its core. 
`)
