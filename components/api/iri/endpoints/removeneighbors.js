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

function removeNeighbors() {
  return (
    <Section
      contents={// prettier-ignore
      [ 
    [
    markdown(components)`
Removes a list of neighbors to your node

>It should be noted that this is 
>only temporary, and the added neighbors will be removed from your 
>set of neighbors after you relaunch IRI.

#### Input
${<InputTable>
    <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>removeNeighbors</InlineCode> </Cell>
    </Row>
    <Row>
    <BoldCell>uris</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of URI strings in the following format: <InlineCode>udp://IPADDRESS:PORT</InlineCode> </Cell>
    </Row>
</InputTable>}

#### Output
${<OutputTable>
    <Row>
    <BoldCell>removedNeighbors</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Number of neighbours that were removed as a result of this API call.</Cell>
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
    body={'{"command": "removeNeighbors", "uris": ["udp://8.8.8.8:14265", "udp://8.8.8.5:14265"]}'}
/>}
    

Example successful (**200**) response:

${<Code>{`{
    "removeNeighbors": 2, 
    "duration": 2
}`}</Code>}
    `
    ]
    ]}
    />
  )
}

export default pure(removeNeighbors)
