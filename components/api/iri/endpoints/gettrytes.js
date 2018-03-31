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

function getTrytes() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Returns the trytes of a transaction.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTips</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>hashes</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>Array of transaction hashes of which you want to get trytes from.</Cell>
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
  body={'{"command": "getTrytes", "hashes": ["OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{ 
    trytes: [ 
        'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFH...9999',
        'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFH...9999' 
    ] 
  }`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(getTrytes)
