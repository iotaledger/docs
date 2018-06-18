import Tangle from '../../components/tangle'
import { lewi } from '../../lib/data/team'
import Layout from '../../lib/with-mdx'

export const page = {
title: 'What is IOTA',
date: '16 Feburary 2018',
authors: [lewi],
editUrl: 'pages/introduction/what-is-iota.js',
}

export default ({children}) => <Layout {...page}>{children}</Layout>

IOTA is a next generation permissionless distributed ledger that utilizes a
novel invention, called a “Tangle”, at its core.

<Tangle />

The Tangle is a new data structure based on a Directed Acyclic Graph.
As such it has no Blocks, no Chain and also no Miners. This
radical new architecture enables things in IOTA work quite differently compared
to Blockchains and other Distributed Ledger Technologies.

## Consensus

Apart from the data structure, the other major difference is how IOTA achieves
consensus and how transactions are made. As mentioned previously, there are no
miners. What this means is that each participant in the network that
wants to make a transaction has to actively participate in the consensus of the
network by approving 2 past transactions.

This attestation on the validity of two past transactions ensures that the
network achieves consensus on the current state of approved transactions,
and it enables a variety of unique features that are only seen in IOTA.

### Features

IOTA has a range of features that are uniquely enabled due to its architecture:

- _Scalability_: IOTA can achieve high transaction throughput thanks
  to parallelized validation of transactions with no limit as to the number
  of transactions that can be confirmed in a certain interval
- _Decentralization_: IOTA has no miners. Every participant in the network
  that is making a transaction, actively participates in the consensus. As
  such, IOTA is more decentralized than any Blockchain.
- _No Transaction Fees_: IOTA has no transaction fees.
- _Quantum-immunity_: IOTA utilized a next generation trinary hash function called
  Curl-p, which is quantum immune (Winternitz signatures)

In the following sections, we will take a deep dive into some of the
important features and principles behind IOTA.
