import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Direct Acyclic Graph',
  date: '20 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/tangle/what-is-iota.js',
})(markdown(components)`
Dag Basics:
- Graphs are composed of edges and vertices 
  - Vertices are sites on the tangle 
    - Transactions or bundles, depending on how you look at it
  - Directed edges connect two vertices on the tangle
- Tangle can be thought of as a two-dimensional DAG 
- Blockchain can be thought of as a one-dimensional DAG
Tangle vocabulary:
    - Site
  - Tip
  - Depth
  - Edge 
  - Height
  -Own weight
  - Cumulative weight
Etc… 
 
`)
