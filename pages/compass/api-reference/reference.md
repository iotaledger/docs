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

Compass is a [Daemon process](https://en.wikipedia.org/wiki/Daemon_(computing)) that runs without interaction after it's initiated. As a result, Compass has no public APIs that clients can use to interact with it. 

[Set up Compass](quick-start/simple-install.md).
