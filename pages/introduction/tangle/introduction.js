import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { alongal } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Introduction to the Tangle',
  date: '20 Feburary 2018',
  authors: [alongal],
  editUrl: 'pages/introduction/tangle/introduction.js',
})(markdown(components)`
The Tangle is the data structure at the heart of IOTA,
first introduced in the IOTA [white paper](https://iota.org/IOTA_Whitepaper.pdf). 
This section will give a short introduction to what the tangle is and how it works.
For a more in-depth treatise, please check out the white paper 
or [this blog series](https://medium.com/p/4d5eae6fe8d4/).

## Core Principles
IOTA uses a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) instead of 
a [blockchain](https://en.wikipedia.org/wiki/Blockchain) to store its ledger.
The main motivation is scalability: a blockchain has an inherent transaction rate limit,
due to the conflict between block sizes and block issuances rates. If blocks are
issued too frequently, or are too large, forks will occur often. When a fork happens,
several new blocks are added to the chain at similar times, and the network must somehow
decide between them.

In a DAG, we accept that forks can and will occur often; however, unlike in a blockchain,
a fork is not final. Diverging branches can be merged back together, as long as they are
consistent with each other. The transaction rate is therefore bounded only by
the latency between the nodes.

A DAG may be thought of as an alternative to a blockchain, which 
favors [Availability over Consistency](https://en.wikipedia.org/wiki/CAP_theorem).

## Tangle Structure
The Tangle is a DAG, where vertices represent transactions, and edges represent _approvals_:

- If there is an edge from A to B, we say that "A approves B". When a node issues a new 
transaction, it must choose 2 previous ones to approve, thereby adding 2 new edges to the graph.

- If there is some directed path from A to B, we say that that A _references_ B.

The first transaction in the Tangle is referred to as the _genesis_. All the IOTA tokens
were created in the genesis, and no new ones will ever be created. All transactions
in the tangle reference the _genesis_ directly or indirectly.

Transactions with no approvers are called _tips_. Nodes are expected to choose tips to approve,
rather than older transactions, because this helps move the network consensus forwards.
The method for choosing which two tips one should approve is one of the key
innovations of IOTA, and will be introduced in the Tip selection section.

Each transaction contains payment information, in the form of "A paid B X IOTAs". 
Approving a transaction implies verifying that it does not break the consensus
rules: in particular, that none of the accounts have negative balances. It
also implies that the two chosen transactions do not contradict each other.
`)
