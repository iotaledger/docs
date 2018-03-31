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

function attachToTangle() {
  return (
    <Section
      contents={// prettier-ignore
      [
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
  ]
]}
    />
  )
}

export default pure(attachToTangle)
