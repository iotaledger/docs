import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import {
  InputTable,
  OutputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  BooleanCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Request from '../../request'

function Publish() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
## attachToTangle
    `
  ],
  [
    markdown(components)`

Attaches the specified transactions (trytes) to the Tangle by 
doing Proof of Work. You need to supply \`branchTransaction\` as well 
as \`trunkTransaction\` (basically the tips which you're going to 
validate and reference with this transaction) - both of which you'll 
get through the \`getTransactionsToApprove\` API call.

The returned value is a different set of tryte values which you can 
input into \`broadcastTransactions\` and \`storeTransactions\`. The 
returned tryte value, the last 243 trytes basically consist of 
the: \`trunkTransaction\` + \`branchTransaction\` + \`nonce\`. These are valid 
trytes which are then accepted by the network.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>attachToTangle</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>trunkTransaction</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>Trunk transaction to approve.</Cell>
  </Row>
  <Row>
    <BoldCell>branchTransaction</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>Branch transaction to approve.</Cell>
  </Row>
  <Row>
    <BoldCell>minWeightMagnitude</BoldCell>
    <TypeCell>Int</TypeCell>
    <BooleanCell status={true} />
    <Cell>Proof of Work intensity. Minimum value is 14</Cell>
  </Row>
  <Row>
    <BoldCell>Trytes</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of trytes (raw transaction data) to attach to the tangle.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>hashes</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of hashes of unreferences transactions.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "attachToTangle", "trunkTransaction": "JVMTDGDPDFYHMZPMWEKKANBQSLSDTIIHAYQUMZOKHXXXGJHJDQPOMDOMNRDKYCZRUFZROZDADTHZC9999", "branchTransaction": "P9KFSJVGSPLXAEBJSHWFZLGP9GGJTIO9YITDEHATDTGAFLPLBZ9FOFWWTKMAZXZHFGQHUOXLXUALY9999", "minWeightMagnitude": 18, "trytes": ["TRYTVALUEHERE"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    'trytes':['FYHMZPMWEKKANBQSLSDTIIHAYQUMZOKHXXXGJHJ...9999']
}`}</Code>}
    `
  ],
  [
    markdown(components)`
## interruptAttachingToTangle
    `
  ],
  [
    markdown(components)`

Interrupts and completely aborts the \`attachToTangle\` process.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>interruptAttachingToTangle</InlineCode></Cell>
  </Row>
</InputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "interruptAttachingToTangle"}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "duration": 30
  }`}</Code>}
    `
  ],
  [
    markdown(components)`
## broadcastTransactions
    `
  ],
  [
    markdown(components)`

Broadcast a list of transactions to all neighbors. The input 
trytes for this call are provided by \`attachToTangle\`.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>broadcastTransactions</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>trytes</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of raw data of transactions to be rebroadcast.</Cell>
  </Row>
</InputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "broadcastTransactions", "trytes": ["BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUS...9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{ 
    "duration": 43
}`}</Code>}
    `
  ],
  [
    markdown(components)`
## storeTransactions
    `
  ],
  [
    markdown(components)`

Store transactions into the local storage. The trytes to be used 
for this call are returned by \`attachToTangle\`.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>storeTransactions</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>trytes</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of raw data of transactions to be stored.</Cell>
  </Row>
</InputTable>}

    `,
    markdown(components)`
Example request:

${<Request
    url="http://localhost:14265/"
    method={"POST"}
    headers={{
      'Content-Type': `application/json`,
      'X-IOTA-API-Version': '1',
    }}
    body={'{"command": "storeTransactions", "trytes": ["BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUS...9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "duration": 91
  }`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(Publish)
