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

Compass is an open-source Coordinator that is used to protect small IOTA networks against attacks.

<dl>
  <dt>Coordinator</dt>
  <dd>Client application that sends transactions, known as milestones, every two minutes to IRI nodes in the mainnet, the devnet, and the testnet networks. Each IRI node validates the milestone transactions, and when a valid milestone transaction directly or indirectly references another transactions, that transaction is considered confirmed on the IOTA network. The IOTA Foundation runs the client application that is the Coordinator. </dd>
  </dl>

You can use set up Compass in a private IOTA network that does not use the Coordinator.

### Making Compass obsolete

Considerable research is underway towards a viable replacement for the Coordinator.  Releasing Compass, an open source coordinator, will further this research.  

### Repository
Jump directly to the Compass source code on [Github](https://github.com/iotaledger/compass)

### Releases
See the Github page for [Releases](https://github.com/iotaledger/compass/releases)
