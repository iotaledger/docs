import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'
import { HR } from '../../../components/text/paragraph'

// prettier-ignore
export default withDoc({
  title: 'Testnet Introduction',
  date: '9 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/testnet/introduction.js',
})(markdown(components)`

In order to use the IOTA tangle you have to interact with the nodes that
make up the IOTA network. There is the main IOTA network (Mainnet) that
hosts the IOTA token and is used for production applications. 

However if you want to test the functionality of your application without using real tokens
you'll want to use the Public Testnet. 

${<HR/>}

The IOTA Foundation has setup the testnet to provide a comparable network
environment for developers to work in while creating their new IOTA based apps.

While we have created a similar environment, the testnet differs in the following ways:

**Light Wallet**

This testnet is only accessible from Foundation run IRI nodes. 
The endpoint is load balanced to ensure stability when testing application. 
We are looking to provide satellite nodes for automatic peering in the future.

**Minimum Weight Magnitude** is 9

The Testnet **requires a minimum of 9** MWM (Minimum Wieght Magnitude).
This vastly reduces the difficulty of the Proof of Work (PoW) required to 
send a transaction. Given this you will see your application or solution 
operating slower on the Mainnet when it is in production. 

**PowBox**

On the testnet, there is a service is available for use to reduce 
the PoW load on your simulation or application while they do transactions. 
This code is open source so you will be able to use the service privately for 
your mainnet applications.

**Token Dispenser**

We also have an faucet which dispenses Testnet tokens. This enables you 
to test your application with tokens that have 0 value.

## Structure

The Testnet the IOTA Foundation is functionally the same 
in terms of structure[1] as the public. 

Given this you can expect your applications to work immediately 
with the Mainnet when you applications are ready.


**Mutually Peered Full Nodes**

The Testnet has about 8 nodes operated by the Foundation, these 
are are peered to each other. These nodes are functionally the 
same as a full node on the IOTA Mainnet apart from their reduced 
requirement for Minimum Magnitude Weight (MWM) of 9. 

In order to interact with these node's IRI API you will access it 
through a load balanced endpoint.

**Coordinator**

There is a primitive Coordinator running on the Testnet to 
protect against attacks. They operate in the same fashion, issuing transactions
referencing transaction on the network which are not malicious.

${<HR />}

[1] - The Mainnet has no means of being mapped, so this is an assumption.

`)
