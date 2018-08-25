import { withRouter } from 'next/router'
import WithMDX from '../../../lib/with-mdx'

import { lewi } from '../../../lib/data/team'
import Image from '../../../components/image'

export const page = {
title: 'Spamnet - Stress-testing Network',
date: '18 August 2018',
authors: [lewi],
editUrl: 'pages/introduction/networks/spamnet.mdx',
}

export default withRouter(props => WithMDX(props, page))

The Spamnet is a Tangle operated by the IOTA Foundation for developers to test the throughput of the current IRI version. This is enables developers from the community and the IOTA Foundation to test the latest IRI and view its ability to handle load.

The Foundation hosts nodes which are open to API calls and requests. We aslo provide nodes that are able to provide peering (UDP) to those wanting to run their own nodes.

## Configuration

The Spamnet is primarily comprised of servers hosted by the IOTA Foundation. The topology of the network is shown below:

<Image
src={`/static/docs/networks/spamnet_layout.png`}
width={600}
height={442}
caption="Topology of the IOTA Spamnet"
/>

---

## Endpoints

### Nodes HTTPS API

This is a High Availability Proxy to provide load balancing
to the nodes that comprise the Spamnet. This is accessible over
HTTPS on port 443.

Check out the Node documentation [here](/iri/)

```
https://nodes.spamnet.iota.org:443
```

### Realtime Message Stream - ØMQ

This provides access to the Zero Message Queue of the IRI
node. This provides the ability to subscribe to the Node in various ways.

Check out a ZMQ tutorial [here](/iri/).

```
tcp://zmq.spamnet.iota.org:5556
```

---

## Setting up a Node on the Spamnet

### Syncing the ledger

The current Spamnet database is more than 15GB. We have regularly updated snapshots of the Spamnet, to allow community members and developers to spawn their own IRI node(s) and sync it in a reasonable period of time.

The database is available for download [here](https://dbfiles.iota.org/?prefix=spamnet/) and usually requires the latest version of IRI.

### Neighbours

The following nodes have autopeering enabled over UDP:

```
udp://p101.spamnet.iota.cafe:14666

udp://p102.spamnet.iota.cafe:14666
```

Developers can sync their nodes by using any of these `p10x` nodes via udp, port 14666.

> NOTE: When setting up IRI use the `--testnet` flag or set `TESTNET = true` in the configuration file.
