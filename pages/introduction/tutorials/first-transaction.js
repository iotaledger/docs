import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import { HR } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import {
  OutputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell
} from '../../../components/api/table'

// prettier-ignore
export default withDoc({
  title: 'First Transaction',
  date: '11 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/tutorials/first-transaction.js',
})(markdown(components)`

This basic guide will show you how to setup your environment 
and send your first **0** value transaction on the IOTA Public Testnet.

### Requirements:

- Node.js 8+
- Node Package Manager (NPM)
- Code editor
- Terminal Access
- An Internet Connection

${<HR/>}

To start we need to create a working directory:

${<TerminalInput>{`mkdir iota-example && cd iota-example`}</TerminalInput>}

Once in our directory we can use Node Package Manager (NPM) 
to fetch and install the required Node.js libraries for IOTA to the folder:

${<TerminalInput>{`npm install iota.lib.js @iota/curl-remote`}</TerminalInput>}

This will result in a \`package.json\` file and a \`node_modules\` folder 
being created in your directory. After this we will create a new file 
called \`index.js\` in the current folder with the following contents:

${<Code>
  {`// Require the use of IOTA library
const IOTA = require("iota.lib.js") 

// Create a new instance of the IOTA class object. 
// Use 'provider' variable to specify which Full Node to talk to
const iota = new IOTA({provider: "https://nodes.testnet.iota.org:443"})

// Call the 'getNodeInfo call to check that the node is working
iota.api.getNodeInfo((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success)
  }
})`}
</Code>}

After saving the file you can run this code using this command:

${<TerminalInput>{`node index.js`}</TerminalInput>}

This should result in the following output:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/getting-started/first-response.png`}
    width={710}
    height={386}
    caption="Output of our getNodeInfo call"
  />
}

Now that we've verified that the code is working and returning general 
information about the node, we can create a transaction on the network.

At the bottom of the \`index.js\` file we will add a transaction to the 
testnet with the following message: \`Hello World!\`

To achieve this the following code needs to be appended:

${<Code>{`const trytes = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'

const message = iota.utils.toTrytes('Hello World!')

const transfers = [
  {
    value: 0,
    address: trytes,
    message: message
  }
]

iota.api.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success)
  }
})`}
</Code>}

Lets break this code down:

**Trytes:**
${<Code>{`const trytes = 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'`}
</Code>}

We define \`trytes\` here to be used in two places, 
one to feed into the \`sendTransfer\` function as a \`seed\` and 
second to use as the \`address\` where we will send the message. 
We can pick a random \`seed\` because we are not attempting to send value.

*Note: Seeds and Address are both comprised of Trytes and are 81 characters in length.*

**Message:**
${<Code>{`const message = iota.utils.toTrytes('Hello World!')`}
</Code>}

This line create a constant that is the message \`Hello World\` and 
encodes it to the Trytes format that the IOTA network accepts.

**Transfers:**
${<Code>{`const transfers = [
  {
    value: 0,
    address: trytes, // HELLOWORLDHELLOWORLDHELLO....WORLDD
    message: message
  }
]`}
</Code>}

This array lets you specify transfers you want to make from 
your Seed. In this case we want a transaction with **Zero** value, 
to our HELLOWORLD address with the message \`Hello World\` encoded in trytes.

**Transfer Function:**
${<Code>{`iota.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log(success)
  }
})`}
</Code>}

The function invokes the library to do a number of steps to construct a 
transaction locally then send it to the Full Node to be sent to other 
nodes on the network.

Lets take a second to figure out what the variables do:

${<OutputTable>
  <Row>
    <BoldCell>seed</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>This is the 'wallet' you are sending from. With 0 value transactions we do not need to have 
      any tokens in the wallet. So this can be 81 random Trytes.</Cell>
  </Row>
  <Row>
    <BoldCell>mwm</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>This is the minimum weight magnitude (MWM) that specifies how mwm proof of work is required. 
      On the testnet, anything less than 9 is not going to be accepted</Cell>
  </Row>
  <Row>
    <BoldCell>depth</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>This specifies the number of bundles you will walk back and confirm.</Cell>
  </Row>
  <Row>
    <BoldCell>transfers</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>This array contains the value, address and message of your desired transaction. You can specify multiple transactions to different addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>callback</BoldCell>
    <TypeCell>Function</TypeCell>
    <Cell>This returns the success or error resulting from this call.</Cell>
  </Row>
</OutputTable>}

Now if you run this code, you should see the Node's information logged to 
console but also you should see this error:

${<Code>{`Error: Request Error: COMMAND attachToTangle is not available on this node...`}</Code>}


${<HR/>}

## Attach To Tangle

The error \`attachToTangle is not available\` is a common error on 
Public IOTA nodes. 

This is because this function uses heavy CPU load to compute the Proof of 
Work for the transaction. If node operators left this open people could abuse 
the function and slow down the node significantly. 

So will we have publish a transaction without using the \`attachToTangle\` 
command of the node. This is achieved by overriding the behaviour of the library 
with a PoW service. There are three to choose from:

- [ccurl.interface.js](https://github.com/iotaledger/ccurl.interface.js) - This is for 
node.js environments and allows for PoW to be done locally.
- [curl.lib.js](https://github.com/iotaledger/curl.lib.js) - This is for WebGL 2 
enabled browsers to compute PoW using the GPU of the user's computer
- [@iota/curl-remote](https://www.npmjs.com/package/@iota/curl-remote) - This is used to mimic a remote node handling the PoW. In 
reality this is a standalone service built to provide Pow-as-a-Service.

We will use the public Sandbox on the IOTA Testnet.

We must add the following code into \`index.js\` **after** we initialise the IOTA library 
but **before** we do our \`sendTransfer\` call.

${<Code>{` // Import the Powbox Patch for the IOTA lib
const remoteCurl = require('@iota/curl-remote')

// Patch the current IOTA instance
remoteCurl(iota, \`https://powbox.testnet.iota.org\`, 500)`}
</Code>}


${<OutputTable>
  <Row>
    <BoldCell>iota</BoldCell>
    <TypeCell>Object</TypeCell>
    <Cell>The current instance of the IOTA library being used in your application.</Cell>
  </Row>
  <Row>
    <BoldCell>url</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The URL of the sandbox you would like to use.</Cell>
  </Row>
  <Row>
    <BoldCell>delay</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>The polling delay used to check if your PoW calculation is complete. Defaults to 1000 miliseconds</Cell>
  </Row>
  <Row>
    <BoldCell>key</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>JWT used to increase the amount of API calls you can make per minute.</Cell>
  </Row>
</OutputTable>}

## Final Code

The resulting code should look like this:

${<Code>{`const IOTA = require('iota.lib.js')
const iota = new IOTA({ provider: 'https://nodes.testnet.iota.org:443' })

const remoteCurl = require('@iota/curl-remote')
remoteCurl(iota, \`https://powbox.testnet.iota.org\`, 500)

iota.api.getNodeInfo((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log(success)
    }
})

const trytes =
    'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD'

const message = iota.utils.toTrytes('Hello World!')

const transfers = [
    {
        value: 0,
        address: trytes,
        message: message
    }
]

iota.api.sendTransfer(trytes, 3, 9, transfers, (error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log(success)
    }
})`}
</Code>}

We will now be off-loading Proof of Work to the Sandbox on the IOTA Testnet. 
If we run the code we will be returned our transaction object that 
has been successfully sent to the IOTA Testnet. 


${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/getting-started/success.png`}
    width={920}
    height={604}
    caption="Output of a successful transaction"
  />
}

Congratulations 🎊. You've just sent your first IOTA transaction. Now, we just 
need to go retrieve it. This will be covered in the next article.
`)
