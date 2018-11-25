import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'

export const page = {
title: 'Contributing',
date: '4 Sep 2018',
authors: [lewi],
editUrl: 'pages/compass/knowledge-base/contribution.md',
}

export default withRouter(props => WithMDX(props, page))

## Documentation Contributions

To contribute to the documentation for the IOTA Compass follow the Contribution guidelines on [Github](https://github.com/iotaledger/documentation/blob/master/CONTRIBUTING.md)

## Issues
Issues & feature requests can be created on the [Github Issue](https://github.com/iotaledger/compass/issues) page.

## Code Contributions
Code contributions are not being accepted at this time





