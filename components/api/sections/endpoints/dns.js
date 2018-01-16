import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { ExternalLink } from '../../../text/link'
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

function DNS(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
### List all the DNS records of a domain
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/domains/:domain/records" />}

Get a list of DNS records created for a domain name specified in the URL.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>id</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique ID of the DNS record. Always prepended with <InlineCode>rec_</InlineCode>.</Cell>
  </Row>
  {/* <Row>
    <BoldCell>slug</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>[MISSING]</Cell>
  </Row> */}
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>The type of record, it could be <ExternalLink href="https://en.wikipedia.org/wiki/List_of_DNS_record_types">any valid DNS record</ExternalLink>.</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The subdomain which we're configuring or <InlineCode>@</InlineCode> for the domain itself.</Cell>
  </Row>
  <Row>
    <BoldCell>value</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The record value.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A timestamp with the date when the record was created.</Cell>
  </Row>
  <Row>
    <BoldCell>updated</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A timestamp with the date when we created the deployment.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/domains/zeit.rocks/records"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "records": [
    {
      "id": "rec_38OtX1f51szRA03atCybBuZ3",
      "slug": "zeit.rocks.-address",
      "type": "ALIAS",
      "name": "",
      "value": "alias.zeit.co",
      "created": "1474631621542",
      "updated": null
    },
    {
      "id": "rec_Pxo2HEfutmlIYECtTE4SpDzY",
      "slug": "*.zeit.rocks.-address",
      "type": "CNAME",
      "name": "*",
      "value": "alias.zeit.co",
      "created": "1474631619960",
      "updated": null
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Create a new DNS record
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/domains/:domain/records" />}

Create a DNS record for a domain specified in the URL. \`mxPriority\`
field should be set for MX records and left out otherwise.

#### Input
${<InputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The subdomain which we're configuring or <InlineCode>@</InlineCode> for the domain itself.</Cell>
  </Row>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <BooleanCell status={true} />
    <Cell>The type of record, it could be <ExternalLink href="https://en.wikipedia.org/wiki/List_of_DNS_record_types">any valid DNS record</ExternalLink>.</Cell>
  </Row>
  <Row>
    <BoldCell>value</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The record value.</Cell>
  </Row>
  <Row>
    <BoldCell>mxPriority</BoldCell>
    <TypeCell>Integer</TypeCell>
    <BooleanCell status={false} />
    <Cell>The priority for MX records, is only required if the record <InlineCode>type</InlineCode> is <InlineCode>MX</InlineCode>.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique ID of the DNS record. Always prepended with <InlineCode>rec_</InlineCode>.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/domains/zeit.rocks/records"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "subdomain",
    "type": "MX",
    "value": "mail.zeit.rocks",
    "mxPriority": 10
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  uid: "rec_V0fra8eEgQwEpFhYG2vTzC3K"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Remove a DNS record
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/domains/:domain/records/:recId" />}

Delete a DNS record created for a domain name, where both the domain
and the record ID are specified in the URL. If the record was removed
succesfully the endpoint returns with code 200 and an empty body.
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/domains/zeit.rocks/records/rec_V0fra8eEgQwEpFhYG2vTzC3K"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}
    `
  ]
]
      }
    />
  )
}

export default pure(DNS)
