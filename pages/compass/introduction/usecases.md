import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Compass Use Cases',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/introduction/usecases.md',
}

export default withRouter(props => WithMDX(props, page))

Compass is useful for enabling private Tangles for anyone wanting to look at the IOTA protocol.  

- **Security researchers** could use Compass to create a private Tangle to conduct security testing and research. This enables them a controlled environment to test assumptions and produce attacks.  

- **Developers** could use Compass to create a private Tangle to develop applications in environment with unlimited tokens to manipulate.  

- **Corporates** could use Compass to develop a Proof of Concept application without sharing their technology. It allows them to test and debug in private until they are ready to launch their application on the permissionless [IOTA Mainnet](#).
 
