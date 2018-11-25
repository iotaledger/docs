import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'
import Image from '../../../components/image'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Architecture',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/knowledge-base/hub-architecture.md',
}

export default withRouter(props => WithMDX(props, page))

Compass is a simple application designed for minimal maintenance. The programs functions, as a coordinator, are simple aswell.

## Operating Environemnt

Compass can be run on a number of platforms. In order to get it run it requires the following dependencies:
- Modern GCC or Clang (or use a provided toolchain from [@iota_toolchains](https://github.com/iotaledger/toolchains))
- bazel

It's suggested to use the Docker containers to prepare and run Compass. 

## Compass components
Compass should have the following components to be operational: 
- Compass Instance
- IRI Instance
- Signing server (optional)

<Image
src={`/static/docs/compass/compass.png`}
width={750}
height={504}
caption="Diagram showing the Compass components"
/>

### Interacting with Compass 
As above, Comapss has interactions with two external services. While it interacts with other entities, users do not interact with Compass directly apart from the initial setup.

Compass is required to interact with an IRI Node to operate. It does so via an HTTP RPC API on the default port `14265` or on whichever port is passed during initialisation. 

Optionally, Compass can interact with the included signing server. This server can reduce the attack surface of Compass by moving sensistive operations to an external service. Compass interacts with the signing server via gRPC.

## Compass Limitations
Compass has been developed to complete one action: issue milestone transactions. 

Compass isn't able to modify balances or censor transactions as invalid ledger states would cause network nodes to reject milestones as invalid.