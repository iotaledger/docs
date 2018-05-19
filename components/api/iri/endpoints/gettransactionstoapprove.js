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

function getTransactionsToApprove() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Tip selection which returns \`trunkTransaction\` and \`branchTransaction\`. The input 
value is depth, which basically determines how many bundles to go back to 
for finding the transactions to approve. 

The higher your depth value, the more "babysitting" you do for 
the network (as you have to confirm more transactions).

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTransactionsToApprove</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of addresses you want to get the confirmed balance from</Cell>
  </Row>
  <Row>
    <BoldCell>Threshold</BoldCell>
    <TypeCell>Int</TypeCell>
    <BooleanCell status={true} />
    <Cell>Confirmation threshold, should be set to 100.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>balances</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of confirmed balances of addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>milestone</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Hash of milestone that referenced this transaction.</Cell>
  </Row>
  <Row>
    <BoldCell>milestoneIndex</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Index of the referencing milestone.</Cell>
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
  body={'{"command": "getTransactionsToApprove", "depth": 3}'}
/>}

Example successful (**200**) response:

${<Code>{`{
  "trunkTransaction": "TKGDZ9GEI9CPNQGHEATIISAKYPPPSXVCXBSR9EIWCTHHSSEQCD9YLDPEXYERCNJVASRGWMAVKFQTC9999", 
  "branchTransaction": "TKGDZ9GEI9CPNQGHEATIISAKYPPPSXVCXBSR9EIWCTHHSSEQCD9YLDPEXYERCNJVASRGWMAVKFQTC9999", 
  "duration": 936
}`}</Code>}
  `
  ]
  ]}
    />
  )
}

export default pure(getTransactionsToApprove)
