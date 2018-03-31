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

function findTransactions() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Find the transactions which match the specified input and return. All input 
values are lists, for which a list of return values (transaction hashes), in 
the same order, is returned for all individual elements. The input fields 
can either be bundles, addresses, tags or approvees. 

>Using multiple of these input fields returns the **intersection** of the values.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>findTransactions</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>bundles</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of bundle hashes. The hashes need to be extended to 81chars by padding the hash with 9's.</Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>tags</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of tags. Has to be 27 trytes.</Cell>
  </Row>
  <Row>
    <BoldCell>approvees</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of approvees of a transaction.</Cell>
  </Row>
</InputTable>}

#### Returned Values

The transaction hashes which are returned depend on your input.
For each specified input value, the command will return the following:

${<OutputTable>
  <Row>
    <BoldCell>bundles</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which contain the specified bundle hash.</Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which have the specified address as an input/output field.</Cell>
  </Row>
  <Row>
    <BoldCell>tags</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which have the specified address as an input/output field.</Cell>
  </Row>
  <Row>
    <BoldCell>approvees</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which reference (i.e. confirm) the specified transaction.</Cell>
  </Row>
</OutputTable>}

#### Output
${<OutputTable>
    <Row>
      <BoldCell>hashes</BoldCell>
      <TypeCell>Array</TypeCell>
      <Cell>List of hashes which relate to the queries entered.</Cell>
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
  body={'{"command": "findTransactions", "addresses": ["RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVAZETAIRPTM"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    hashes: [ 
      'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999' 
    ], 
    "duration": 4
  }`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(findTransactions)
