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
import Endpoint from '../../endpoint'
import Request from '../../request'

function Certificates(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### List all the certificates
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/certs" />}

Retrieves a list of certificates issued for the authenticating user or
information about the certificate issued for the common name specified in the URL.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>certs</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of issued certificates.</Cell>
  </Row>
</OutputTable>}

#### Certificate
This is the format of each item in the ${<InlineCode>certs</InlineCode>} list.

${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>cn</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name for which domain the certificate was issued.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
  <Row>
    <BoldCell>expiration</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate is going to expire.</Cell>
  </Row>
  <Row>
    <BoldCell>autoRenew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the certificate is going to be automatically renewed.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "certs": [
    {
      "cn": "testing.zeit.co",
      "uid": "oAjf6y9pxZgCJyQfrclN",
      "created": "2016-08-23T18:13:09.773Z",
      "expiration": "2016-12-16T16:00:00.000Z",
      "autoRenew": true
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get a single certificate
`
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/certs/:cn"/>}

Retrieves the information about the certificate issued for the common name specified in the URL.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>cn</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name for which domain the certificate was issued.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
  <Row>
    <BoldCell>expiration</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate is going to expire.</Cell>
  </Row>
  <Row>
    <BoldCell>autoRenew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the certificate is going to be automatically renewed.</Cell>
  </Row>
</OutputTable>}
`,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/certs/testing.zeit.co"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (200) response:

${<Code>{`{
  "cn": "testing.zeit.co",
  "uid": "oAjf6y9pxZgCJyQfrclN",
  "created": "2016-08-23T18:13:09.773Z",
  "expiration": "2016-12-16T16:00:00.000Z",
  "autoRenew": true
}`}</Code>}`
  ],
  [
    markdown(components)`
### Create a new certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/now/certs"/>}

Issue a new certificate for the common names given in body.
The body should contain \`domains\` array and it may contain \`renew\` field to renew an existing certificate.

#### Input
${<InputTable>
  <Row>
    <BoldCell>domains</BoldCell>
    <TypeCell>List</TypeCell>
    <BooleanCell status={true} />
    <Cell>A list of domains for whose the ceritifcate is being provisioned.</Cell>
  </Row>
  <Row>
    <BoldCell>renew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <BooleanCell status={true} />
    <Cell>If the certificate is going to be automatically renewed.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the issued certificate.</Cell>
  </Row>
  <Row>
    <BoldCell>created_at</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "domains": ["testing.zeit.co"],
    "renew": true
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "zWsFytQUFlkUWaR7nWdwS7xR"
  "created_at": 2016-06-01T21:03:10.420Z"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Replace a certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="PUT" url="/v2/now/certs" />}

Replace an existing or create a new certificate entry with a user-supplied certificate.

The body should contain \`domains\` field containing all the domains the new certificate will be used for, and \`cert\`, private \`key\`, and \`ca\` chain fields in PEM format.

#### Input
${<InputTable>
  <Row>
    <BoldCell>domains</BoldCell>
    <TypeCell>List</TypeCell>
    <BooleanCell status={true} />
    <Cell>A list of domains for whose the ceritifcate is being provisioned.</Cell>
  </Row>
  <Row>
    <BoldCell>ca</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted CA chain</Cell>
  </Row>
  <Row>
    <BoldCell>cert</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted certificate</Cell>
  </Row>
  <Row>
    <BoldCell>key</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>PEM formatted private key</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>created_at</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the certificate was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="PUT"
  url="https://api.zeit.co/v2/now/certs"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "domains": ["testing.zeit.co"],
    "ca": "PEM formatted CA chain",
    "cert": "PEM formatted certificate",
    "key": "PEM formatted private key"
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "created_at": 2016-06-01T21:03:10.420Z"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Delete a certificate
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/now/certs/:cn" />}

Delete an existing certificate entry. If the certificate entry was
removed successfully the endpoint will return with code **200** and
an empty body; Otherwise an error object is returned.
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/now/certs/testing.zeit.co"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}
    `
  ]
]}
    />
  )
}

export default pure(Certificates)
