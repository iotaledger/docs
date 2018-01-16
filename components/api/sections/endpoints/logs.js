import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { ExternalLink } from '../../../text/link'
import {
  Table,
  OutputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  FullWidthCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Endpoint from '../../endpoint'
import Request from '../../request'

function Logs(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### Get deployment logs
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v1/now/deployments/:id/logs" />}

Get the logs of a deployment by his ID.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>logs</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of objects representing each log.</Cell>
  </Row>
</OutputTable>}

#### Log
${<OutputTable>
  <Row>
    <BoldCell>object</BoldCell>
    <TypeCell>Map</TypeCell>
    <Cell>The log content as a map.</Cell>
  </Row>
  <Row>
    <BoldCell>text</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The log content as a string.</Cell>
  </Row>
  <Row>
    <BoldCell>deploymentId</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identified of the deployment</Cell>
  </Row>
  <Row>
    <BoldCell>id</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the log</Cell>
  </Row>
  <Row>
    <BoldCell>context</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell></Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the log was created.</Cell>
  </Row>
  <Row>
    <BoldCell>serial</BoldCell>
    <TypeCell>Int</TypeCell>
    <Cell></Cell>
  </Row>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>The type of log, it could be <InlineCode>request</InlineCode>, <InlineCode>response</InlineCode>, <InlineCode>command</InlineCode> or <InlineCode>stdout</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>pid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The process unique identified which created the log.</Cell>
  </Row>
  <Row>
    <BoldCell>appName</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The deployment application name.</Cell>
  </Row>
  <Row>
    <BoldCell>date</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the log was created.</Cell>
  </Row>
  <Row>
    <BoldCell>region</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>The name of the region where the instance was running. It could be <InlineCode>now-sfo</InlineCode>.</Cell>
  </Row>
</OutputTable>}

#### Log object key
This are the usual keys of the key ${<InlineCode>object</InlineCode>} of the logs.

${<OutputTable>
  <Row>
    <BoldCell>method</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A valid HTTP method.</Cell>
  </Row>
  <Row>
    <BoldCell>uri</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The URL which received the request.</Cell>
  </Row>
  <Row>
    <BoldCell>status</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A valid <ExternalLink href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes">HTTP status code</ExternalLink>.</Cell>
  </Row>
  <Row>
    <BoldCell>protocol</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The protocol used for the log.</Cell>
  </Row>
  <Row>
    <BoldCell>bodyBytesSent</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The amount of bytes sent in the body of the response.</Cell>
  </Row>
  <Row>
    <BoldCell>remoteAddr</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The IP address which sent the request.</Cell>
  </Row>
  <Row>
    <BoldCell>userAgent</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The user agent of the device which sent the request.</Cell>
  </Row>
  {/* <Row>
    <BoldCell>referer</BoldCell>
    <TypeCell></TypeCell>
    <Cell></Cell>
  </Row> */}
</OutputTable>}

#### Types
These are the possible types of logs and what they mean.

${<Table head={
  <Row>
    <Cell isHead>Type</Cell>
    <FullWidthCell isHead>Description</FullWidthCell>
  </Row>
}>
  <Row>
    <BoldCell>request</BoldCell>
    <Cell>The log is a HTTP request.</Cell>
  </Row>
  <Row>
    <BoldCell>response</BoldCell>
    <Cell>The log is a HTTP response.</Cell>
  </Row>
  <Row>
    <BoldCell>command</BoldCell>
    <Cell>The log is a terminal command, e.g. <InlineCode>npm start</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>stdout</BoldCell>
    <Cell>The log is anything the application wrote to console.</Cell>
  </Row>
</Table>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v1/now/deployments/Cm6WigEH9EBI4Uzs2WA6qOGe/logs"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "logs": [
    {
      "id": "log_EEQs4oPeDT3mK6qVDCg53xOA",
      "type": "command",
      "text": "npm install",
      "instanceId": "",
      "date": "2017-09-04T17:42:54.129Z",
      "created": "2017-09-04T17:42:54.207Z",
      "pid": "6268645745692858883",
      "serial": "150454697412962686457456928588830000000000000000000",
      "region": "now-sfo",
      "deploymentId": "Cm6WigEH9EBI4Uzs2WA6qOGe",
      "appName": "now-redirect"
    },
    {
      "id": "log_MABiQaH5ZQtsGldYCm2RnFna",
      "type": "command",
      "text": "npm start",
      "instanceId": "",
      "date": "2017-09-04T17:42:56.169Z",
      "created": "2017-09-04T17:42:56.248Z",
      "pid": "4858500117945524255",
      "serial": "150454697616948585001179455242550000000000000000000",
      "region": "now-sfo",
      "deploymentId": "Cm6WigEH9EBI4Uzs2WA6qOGe",
      "appName": "now-redirect"
    },
    {
      "id": "log_vGDj96qvUoG8fEJCjcFleRfk",
      "type": "stdout",
      "text": "\\n> now-redirect@1.0.0 start /home/nowuser/src\\n> node server.js\\n",
      "instanceId": "996f12b74403b51f62310d82",
      "date": "2017-09-04T17:42:57.209Z",
      "created": "2017-09-04T17:42:57.236Z",
      "pid": "4858500117945524255",
      "serial": "150454697720948585001179455242550000000000000000001",
      "region": "now-sfo",
      "deploymentId": "Cm6WigEH9EBI4Uzs2WA6qOGe",
      "appName": "now-redirect"
    },
    {
      "object": {
        "method": "GET",
        "uri": "/",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
        "remoteAddr": "181.67.7.237",
        "protocol": "HTTP/2.0"
      },
      "deploymentId": "Cm6WigEH9EBI4Uzs2WA6qOGe",
      "id": "log_DZlBA1IeSdfezFy962gURCpf",
      "context": "9HrrSAr7bqUz3V7aVcsbyYT3",
      "created": "2017-09-04T17:42:59.212Z",
      "serial": "150454697921258192117963931524070000000000000705393",
      "type": "request",
      "pid": "5819211796393152407",
      "appName": "now-redirect",
      "date": "2017-09-04T17:42:59.212Z"
    },
    {
      "object": {
        "method": "GET",
        "uri": "/",
        "status": "301",
        "protocol": "HTTP/2.0",
        "bodyBytesSent": "79"
      },
      "deploymentId": "Cm6WigEH9EBI4Uzs2WA6qOGe",
      "id": "log_tw8g2Xu2AEVp2H4u7FJc05NB",
      "context": "9HrrSAr7bqUz3V7aVcsbyYT3",
      "created": "2017-09-04T17:42:59.233Z",
      "serial": "150454697923358192117963931524070000000000000705395",
      "type": "response",
      "pid": "5819211796393152407",
      "appName": "now-redirect",
      "date": "2017-09-04T17:42:59.233Z"
    }
  ]
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(Logs)
