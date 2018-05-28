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

function getInclusionStates() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Get the inclusion states of a set of transactions. This is for determining 
if a transaction was accepted and confirmed by the network or not. You can 
search for multiple tips (and thus, milestones) to get past inclusion states of transactions.

This API call simply returns a list of boolean values in the same 
order as the transaction list you submitted, thus you get a true/false whether a 
transaction is confirmed or not.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getInclusionStates</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>transactions</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of transactions you want to get the inclusion state for.</Cell>
  </Row>
  <Row>
    <BoldCell>tips</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of tips (including milestones) you want to search for the inclusion state.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>states</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of boolean values in the same order.</Cell>
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
  body={'{"command": "getInclusionStates", "transactions": ["QHBYXQWRAHQJZEIARWSQGZJTAIITOZRMBFICIPAVD9YRJMXFXBDPFDTRAHHHP9YPDUVTNOFWZGFGWMYHEKNAGNJHMW"], "tips": ["ZIJGAJ9AADLRPWNCYNNHUHRRAC9QOUDATEDQUMTNOTABUVRPTSTFQDGZKFYUUIE9ZEBIVCCXXXLKX9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "states": [
        true,
        false,
        true
    ], 
    "duration": 91
  }`}</Code>}
    `
  ]
      ]}
    />
  )
}

export default pure(getInclusionStates)
