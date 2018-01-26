import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import Now from '../../../now/now'
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

function Domains(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### List all the domains
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/domains" />}

Retrieves a list of domains registered for the authenticating user.
Each domain entry contains an \`aliases\` array listing every
alias associated with the domain. The field \`isExternal\` is
a boolean value telling wheter an external nameserver is used to
manage DNS records for the domain.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique ID of the domain.</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The domain name</Cell>
  </Row>
  <Row>
    <BoldCell>createdAt</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when it was created the registry.</Cell>
  </Row>
  <Row>
    <BoldCell>boughtAt</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>If it was purchased through {<Now color="#000" />} the date when it was purchased.</Cell>
  </Row>
  <Row>
    <BoldCell>expiresAt</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the domain is going to expire and need to be renewed.</Cell>
  </Row>
  <Row>
    <BoldCell>isExternal</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If is an <InternalLink href="/docs/features/dns#adding-a-domain-using-external-nameservers">externally handled domain</InternalLink></Cell>
  </Row>
  <Row>
    <BoldCell>verified</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the domain has the ownership verified.</Cell>
  </Row>
  <Row>
    <BoldCell>aliases</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of aliases using the domain.</Cell>
  </Row>
  <Row>
    <BoldCell>certs</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list domains or subdomains with a SSL certificated provisioned.</Cell>
  </Row>
</OutputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/domains"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "domains": [
    {
      "uid": "HVXAOskvQK8ILaF8d8gmwdRx",
      "name": "zeit.rocks",
      "created": "2017-09-03T19:48:50.120Z",
      "boughtAt": "2017-09-03T19:48:46.000Z",
      "expiresAt": "2018-09-03T19:48:46.555Z",
      "isExternal": false,
      "verified": true,
      "aliases": [
          "tyyBofjOQzbTS5Q8Orif6YS1"
      ],
      "certs": [
          "zeit.rocks"
      ]
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Add a new domain
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/domains" />}

Register a new domain name with ${<Now color="#000" />} for the authenticating
user. If the field \`isExternal\` is false a zeit.world DNS
is configured for the domain; Otherwise an external nameserver is
expected to point \`CNAME/ALIAS\` towards
\`alias.zeit.co\`

If an external nameserver is used the user must verify the domain name
by creating a TXT record for \`_now\` subdomain containing a
verification token provided as a POST result. After the record has
been created, the user may retry the same POST and the endpoint shall return
\`verified: true\`, if the domain was verified succesfully.

#### Input
${<InputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The domain name you want to add.</Cell>
  </Row>
  <Row>
    <BoldCell>isExternal</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <BooleanCell status={false} />
    <Cell>If is an <InternalLink href="/docs/features/dns#adding-a-domain-using-external-nameservers">externally handled domain</InternalLink></Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the domain.</Cell>
  </Row>
  <Row>
    <BoldCell>verified</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the domain has the ownership verified.</Cell>
  </Row>
  <Row>
    <BoldCell>verifyToken</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The <InternalLink href="/docs/features/dns#adding-a-domain-using-external-nameservers">token</InternalLink> required to verify the ownership of an external domain.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the new domain was created.</Cell>
  </Row>
</OutputTable>}

    `,
    markdown(components)`
Example request adding a zeit.world domain:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/domains"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "zeit.rocks",
    "isExternal": false
  }}
/>}

Successful (**200**) response:

${<Code>{`{
  uid: "V0fra8eEgQwEpFhYG2vTzC3K",
  verified: true,
  created: "2016-09-23T11:53:38.600Z"
}`}</Code>}

Example request adding a unverified external domain:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/domains"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "awesome-now.us",
    "isExternal": false
  }}
/>}

Successful (**200**) response:

${<Code>{`{
  uid: "V0fra8eEgQwEpFhYG2vTzC3K",
  verified: false,
  verifyToken: "3f786850e387550fdab836ed7e6dc881de23001b",
  created: "2016-09-23T11:53:38.600Z"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Remove a domain by name
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/domains/:name" />}

Delete a previously registered domain name from ${<Now color="#000" />}.
Deleting a domain will automatically remove any associated aliases.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique ID of the removed domain.</Cell>
  </Row>
</OutputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/domains/zeit.rocks"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  uid: "V0fra8eEgQwEpFhYG2vTzC3K"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Check a domain availability
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/domains/status?name" />}

Check if a domain name _may_ be available to buy or not. The response is a JSON with the key \`available\` as a boolean.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>status</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>If the domain is available or not.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/domains/status?name=zeit.rocks"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "status": false
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Check the price of a domain
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/domains/price?name" />}

Check the price to purchase a domain and how long a single purchase period is. The response is a JSON with the key \`price\` as a number (always an integer) and a key \`period\` as a number indicating the amount of years the domains could be hold before paying again.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>price</BoldCell>
    <TypeCell>Integer</TypeCell>
    <Cell>The domain price.</Cell>
  </Row>
  <Row>
    <BoldCell>period</BoldCell>
    <TypeCell>Integer</TypeCell>
    <Cell>The time period by which the domain is purchased.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/domains/price?name=zeit.rocks"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "price": 17,
  "period": 1
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Purchase a domain
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/domains/buy" />}

Purchase the specified domain, it receive the domain name as the key \`name\` inside the request body.

In case of a successful purchase the returns with code 200 and an empty body.

#### Input
${<InputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The domain name you want to purchase.</Cell>
  </Row>
</InputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/domains/buy"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "zeit.rocks"
  }}
/>}

Example failed **403** response:

${<Code>{`{
  "error": {
    "code": "not_available",
    "message": "Domain is not available"
  }
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(Domains)
