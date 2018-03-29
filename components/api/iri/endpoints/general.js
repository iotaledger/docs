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

function General() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
## getNodeInfo
    `
  ],
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
  ],
  [
    markdown(components)`
## getNeighbors
    `
  ],
  [
    markdown(components)`

Returns a list of neighbours that the node is connected to. 
Includes statistics relating to the connection.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getNeighbors</InlineCode> </Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>address</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The IP address or URL of your peer</Cell>
  </Row>
  <Row>
    <BoldCell>numberOfAllTransactions</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Number of all transactions sent (invalid, valid, already-seen)</Cell>
  </Row>
  <Row>
    <BoldCell>numberOfInvalidTransactions</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Invalid transactions your peer has sent you. These are transactions with invalid signatures or overall schema.</Cell>
  </Row>
  <Row>
    <BoldCell>numberOfNewTransactions</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>New transactions which were transmitted.</Cell>
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
    body={'{"command": "getNeighbors"}'}
  />}
  

Example successful (**200**) response:

${<Code>{`{
    "duration": 37,
    "neighbors": [
        {
            "address": "/8.8.8.8:14265",
            "numberOfAllTransactions": 922,
            "numberOfInvalidTransactions": 0,
            "numberOfNewTransactions": 92
        },
        {
            "address": "/8.8.8.8:5000",
            "numberOfAllTransactions": 925,
            "numberOfInvalidTransactions": 0,
            "numberOfNewTransactions": 20
        }
    ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
## addNeighbors
    `
  ],
  [
    markdown(components)`
Add a list of neighbors to your node. 

>It should be noted that this is 
>only temporary, and the added neighbors will be removed from your 
>set of neighbors after you relaunch IRI.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>addNeighbors</InlineCode> </Cell>
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
    <BoldCell>addedNeighbors</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell>Number of neighbours that were added as a result of this API call.</Cell>
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
    body={'{"command": "addNeighbors", "uris": ["udp://8.8.8.8:14265", "udp://8.8.8.5:14265"]}'}
/>}
  

Example successful (**200**) response:

${<Code>{`{
    "addedNeighbors": 2, 
    "duration": 2
}`}</Code>}
    `
  ],[
    markdown(components)`
## removeNeighbors
    `
  ],
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

export default pure(General)
