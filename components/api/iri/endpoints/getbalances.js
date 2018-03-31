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

function getBalances() {
  return (
    <Section
      contents={// prettier-ignore
      [
    [
    markdown(components)`

Similar to \`getInclusionStates\`. It returns the confirmed balance which a list of 
addresses have at the latest confirmed milestone. In addition to the balances, 
it also returns the milestone as well as the index with which the confirmed balance 
was determined. The balances is returned as a list in the same order as the 
addresses were provided as input.

#### Input
${<InputTable>
    <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getBalances</InlineCode></Cell>
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
    body={'{"command": "getBalances", "addresses": ["HBBYKAKTILIPVUKFOTSLHGENPTXYBNKXZFQFR9VQFWNBMTQNRVOUKPVPRNBSZVVILMAFBKOTBLGLWLOHQ"], "threshold": 100}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "balances": [
        "114544444"
    ],
    "milestone": "INRTUYSZCWBHGFGGXXPWRWBZACYAFGVRRP9VYEQJOHYD9URMELKWAFYFMNTSP9MCHLXRGAFMBOZPZ9999",
    "milestoneIndex": 128,
    "duration": 30
}`}</Code>}
    `
    ]
        ]}
    />
  )
}

export default pure(getBalances)
