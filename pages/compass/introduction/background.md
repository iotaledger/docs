import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Background on Compass',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/introduction/background.md',
}

export default withRouter(props => WithMDX(props, page))

The base assumption of the Tangle is that there are more honest than dishonest transactions propagating through the nextwork. However, in the infancy of a Tangle there are less transations propagated between nodes than maximum bandwidth between them.

The creators of the Tangle realized that if an attacker could publish more transactions than the total of the honest transactions, then they might control the direction of consensus. Thus, they could perform double spend and network splitting attacks.
 
Enter the “Coordinator”, a temporary safety mechanism.  Such safety mechanisms are common in blockchain and DLT systems.  For example, Satoshi’s Bitcoin had hard-coded checkpoints plus an alerts system for him to shut down the network if necessary.
 
The Coordinator (COO) issues bundles at a regular interval. This bundle includes a signed transaction called a “milestone”.  When using a coordinator, such as Compass, transaction confrimation is achieved by detemining if and only if, a transaction is referenced by a milestone directly or indirectly. At this point the transaction is considered confirmed by the nodes configured to recognise the coordinator. 

A Coordinator can be used to prevent attacks until the network can ensure a majority of honest transactions at which point it will hard to attack the consensus of the network.  At this point the Tangle, the use of a coordinator will no longer be required.
 
## Further Reading 

To undertsand the requirement and use of a coordinator  there are a number of resources available:
- [IOTA Papers discussing the Tangle and other protocol features](https://www.iota.org/research/academic-papers)
- [A series of posts discussing the removal of the Coordinator](https://blog.iota.org/coordinator-part-1-the-path-to-coordicide-ee4148a8db08)





