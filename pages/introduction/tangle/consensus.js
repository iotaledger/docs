import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { alongal } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Consensus on the Tangle',
  date: '20 Feburary 2018',
  authors: [alongal],
  editUrl: 'pages/introduction/tangle/consensus.js',
})(markdown(components)`
In order to be useful as a payment network, IOTA must provide a method
of knowing when a transaction can be safely considered to be  _confirmed_.
A confirmed transaction is accepted into the public consensus, and is very
unlikely to be removed from it.

There are two approaches to establishing consensus in the tangle: the currently
implemented _coordinator_, and the distributed approach suggested in the white paper.

## The Coordinator
The coordinator is an entity controlled by the IOTA Foundation, which issues
zero-valued transactions every two minutes, called a _milestone_. Using the
coordinator, the definition of consensus is simple: any transaction referenced
by a milestone is confirmed, and the others are not.

## MCMC
The white paper suggests a distributed approach, which gives a probabilistic
answer. This is similar to Bitcoin and other distributed ledgers, where at any given time
a transaction has a _confirmation confidence_, which is an indication of its
acceptance level.

In order to know the confirmation confidence for a particular transaction, we
perform the tip selection algorithm 100 times, as described. We then measure how
many of the 100 selected tips reference the transaction in question. If it is
referenced by 80 tips of 100, for example, we say it is 80% confirmed.

The idea is the following: if it is very likely for a chosen tip to reference
a transaction, then new transactions coming in will probably approve it. This
effect will only increase with time, since the weighted walk causes large branches
to grow and small branches to get abandoned.

The number 100 is arbitrary; if you need more accuracy, you may run the walk
more times. Note that different nodes might see different confidence rates
for the same transaction: this is because their view of the tangle is not
identical, and their walks will reach different tips.
`)
