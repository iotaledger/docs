import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Compass Overview',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/introduction/overview.md',
}

export default withRouter(props => WithMDX(props, page))

Compass is an open-source Coordinator that is used to protect small IOTA networks from attacks.

Small IOTA networks are those that have few transactions progagating through it.

<dl>
  <dt>Coordinator</dt>
  <dd>Client application that sends transactions, known as milestones, every two minutes to IRI nodes in the mainnet, the devnet, and the testnet networks. Each IRI node validates the milestone transactions, and when a valid milestone transaction directly or indirectly references another transactions, that transaction is considered confirmed on the IOTA network. The IOTA Foundation runs the client application that is the Coordinator. </dd>
  </dl>

Instead of relying on the Coordinator to send milestones, you can create your own Coordinator by setting up Compass in a private IOTA network.

### Making Compass obsolete

Considerable research is underway towards a viable replacement for the Coordinator. By releasing Compass, we are furthering this research. 

### Repository
Jump directly to the Compass source code on [GitHub](https://github.com/iotaledger/compass).

### Releases
See the GitHub repository for the [latest release](https://github.com/iotaledger/compass/releases).
