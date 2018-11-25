import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { nelson } from '../../../lib/data/team'

export const page = {
title: 'API Reference',
date: '4 Sep 2018',
authors: [],
editUrl: 'pages/compass/api/reference.md',
}

export default withRouter(props => WithMDX(props, page))

Compass can be thought as a [Daemon process](https://en.wikipedia.org/wiki/Daemon_(computing)) which runs without interaction after its initated. Due to this there is no externally facing APIs for external software to interact with. 

Check out the [setup guide](quick-start/setup-guide.md) to understand how to use this software.