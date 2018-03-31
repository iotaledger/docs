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

function storeTransactions() {
  return (
    <Section
      contents={// prettier-ignore
      [
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

export default pure(storeTransactions)
