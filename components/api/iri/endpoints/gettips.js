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

function getTips() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Returns the list of tips.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTips</InlineCode></Cell>
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
  body={'{"command": "getTips"}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "hashes": [
        "YVXJOEOP9JEPRQUVBPJMB9MGIB9OMTIJJLIUYPM9YBIWXPZ9PQCCGXYSLKQWKHBRVA9AKKKXXMXF99999", 
        "ZUMARCWKZOZRMJM9EEYJQCGXLHWXPRTMNWPBRCAGSGQNRHKGRUCIYQDAEUUEBRDBNBYHAQSSFZZQW9999",
        "QLQECHDVQBMXKD9YYLBMGQLLIQ9PSOVDRLYCLLFMS9O99XIKCUHWAFWSTARYNCPAVIQIBTVJROOYZ9999"
    ], 
    "duration": 4
  }`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(getTips)
