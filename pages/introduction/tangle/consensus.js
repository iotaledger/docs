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

- MCMC algorithm is used to tell you percent confirmation
  - Eventual consistency between nodes
- Right now… coordinator and agreement on snapshots


`)
