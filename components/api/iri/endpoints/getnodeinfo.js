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

function getNodeInfo() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`

Returns general information about the Node.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getNodeInfo</InlineCode></Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>appName</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>Name of the IOTA software you're currently using (IRI stands for Initial Reference Implementation)..</Cell>
  </Row>
  <Row>
    <BoldCell>appVersion</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The version of the IOTA software you're currently running.</Cell>
  </Row>
  <Row>
    <BoldCell>jreAvailableProcesses</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Available cores on your machine for JRE.</Cell>
  </Row>
  <Row>
    <BoldCell>jreFreeMemory</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Returns the amount of free memory in the Java Virtual Machine</Cell>
  </Row>
  <Row>
    <BoldCell>jreMaxMemory</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Returns the maximum amount of memory that the Java virtual machine will attempt to use.</Cell>
  </Row>
  <Row>
    <BoldCell>jreTotalMemory</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Returns the total amount of memory in the Java virtual machine.</Cell>
  </Row>
  <Row>
    <BoldCell>latestMilestone</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>Latest milestone that was signed off by the coordinator.</Cell>
  </Row>
  <Row>
    <BoldCell>latestSolidSubtangleMilestone</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The latest milestone which is solid and is used for sending transactions. For a milestone to become solid your local node must basically approve the subtangle of coordinator-approved transactions, and have a consistent view of all referenced transactions.</Cell>
  </Row>
  <Row>
    <BoldCell>latestSolidSubtangleMilestoneIndex</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Index of the latest solid subtangle.</Cell>
  </Row>
  <Row>
    <BoldCell>neighbors</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Number of neighbors you are directly connected with.</Cell>
  </Row>
  <Row>
    <BoldCell>packetsQueueSize</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Packets which are currently queued up.</Cell>
  </Row>
  <Row>
    <BoldCell>time</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Current UNIX timestamp.</Cell>
  </Row>
  <Row>
    <BoldCell>tips</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Number of tips in the network.</Cell>
  </Row>
  <Row>
    <BoldCell>transactionsToRequest</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Transactions to request during syncing process.</Cell>
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
  body={'{"command": "getNodeInfo"}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "appName": "IRI",
    "appVersion": "1.0.8.nu",
    "duration": 1,
    "jreAvailableProcessors": 4,
    "jreFreeMemory": 91707424,
    "jreMaxMemory": 1908932608,
    "jreTotalMemory": 122683392,
    "latestMilestone": "VBVEUQYE99LFWHDZRFKTGFHYGDFEAMAEBGUBTTJRFKHCFBRTXFAJQ9XIUEZQCJOQTZNOOHKUQIKOY9999",
    "latestMilestoneIndex": 107,
    "latestSolidSubtangleMilestone": "VBVEUQYE99LFWHDZRFKTGFHYGDFEAMAEBGUBTTJRFKHCFBRTXFAJQ9XIUEZQCJOQTZNOOHKUQIKOY9999",
    "latestSolidSubtangleMilestoneIndex": 107,
    "neighbors": 2,
    "packetsQueueSize": 0,
    "time": 1477037811737,
    "tips": 3,
    "transactionsToRequest": 0
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(getNodeInfo)
