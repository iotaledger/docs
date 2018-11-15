import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { nelson } from '../../../lib/data/team'

export const page = {
title: 'IOTA Hub Overview',
date: '4 Sep 2018',
authors: [nelson],
editUrl: 'pages/hub/introduction/overview.md',
}

export default withRouter(props => WithMDX(props, page))

## Overview

IOTA Hub is a multi-user-wallet used by those with custody of other’s tokens and those requiring the secure management of IOTA tokens. Companies can use Hub to manage the complicated tasks associated with deposits and withdrawals of IOTA. 

Hub was developed with the security in mind and includes a number of options to protect tokens in the Hub. These include database encryption, separated signing servers, and secure gRPC connections.

Hub was developed as a standalone module, separate from the IOTA Node or Client software, to allow for easy integration into existing software environments. 

### Repository
To jump directly to the IOTA Hub source code on [Github](https://github.com/iotaledger/rpchub)

### Releases
See the Github page for [Release](https://github.com/iotaledger/rpchub/releases)