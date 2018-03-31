import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import {
  InputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  BooleanCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Request from '../../request'

function broadcastTransactions() {
  return (
    <Section
      contents={// prettier-ignore
      [
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
  ]
]}
    />
  )
}

export default pure(broadcastTransactions)
