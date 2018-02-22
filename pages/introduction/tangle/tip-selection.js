import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { alongal } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Tip selection',
  date: '20 Feburary 2018',
  authors: [alongal],
  editUrl: 'pages/docs/tangle/what-is-iota.js',
})(markdown(components)`
When joining the tangle, a new transaction must choose two previous ones to
approve. In general, it will choose two previously unapproved transactions, or
_tips_. The method for choosing these two tips is called the _tip selection
algorithm_.

Nodes are not obligated to follow the recommended tip selection algorithm,
which is outlined in this section. However it is designed so that if most nodes
do follow it, the rest are incentivized to follow suit.

Tip selection is done by performing a weighted random walk from the genesis
towards the tips. The walk stops when it reaches a tip. The walk is performed
twice, and so two tips are chosen.

The walk is biased towards transactions with more _cumulative weight_, or more
transactions referencing them. This creates an incentive to approve new transactions
rather than old ones.
`)
