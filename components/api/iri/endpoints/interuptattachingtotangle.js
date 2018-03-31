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

function interruptAttachingToTangle() {
  return (
    <Section
      contents={// prettier-ignore
      [
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
  ]
]}
    />
  )
}

export default pure(interruptAttachingToTangle)
