import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { nelson } from '../../../lib/data/team'

export const page = {
title: 'Hub Usecases',
date: '4 Sep 2018',
authors: [],
editUrl: 'pages/hub/introduction/usecases.md',
}

export default withRouter(props => WithMDX(props, page))

The IOTA Hub is a simple tool to allow for user wallet management. The application removes the intracacies of the IOTA protocol from the development of applications dealing with tokens. While the Hub is able to manage a large number of separate user wallets the Hub can be used in a number of different ways.

## Scenario A 
> A crypto-currency exchange would like to manage the deposit and withdrawl of IOTA tokens. 

The IOTA Hub would enable them multiple ways of handling user deposits and withdrawls. This reduces the time required for exhcnages to impliment IOTA wallet management into their exchange.

See exchnage scenarios [here](../knowledge-base/exchange-implementation)

## Scenario B
> A custodial service would like to securely manage the IOTA tokens of their clients.

The Hub is able to provide the service an hassle free way of handling separate wallets for each of their customers.

## Scenario C
> A company wants to receive and send IOTA tokens as a means to provide value settlement within their application.

Hub can reduce developer hours when trialing and integrating IOTA into the existing software system. 

