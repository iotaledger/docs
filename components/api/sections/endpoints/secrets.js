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

function Secrets(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
### List all the secrets
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/secrets" />}

Retrieves all of the active now secrets for the authenticating user.
The body will contain an entry for each secret.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>secrets</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of active secrets.</Cell>
  </Row>
</OutputTable>}

#### Secret
This is the format of each item in the ${<InlineCode>secrets</InlineCode>} list.

${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the secret. Always prepended with <InlineCode>sec_</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name of the secret. This is what you could use in your environment variables after a <InlineCode>@</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the secret was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="https://api.zeit.co/v2/now/secrets"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "secrets": [
    {
      "uid": "sec_T70JHBhR1gqaxXVrLTsHr6B9",
      "name": "guillermo",
      "created": '2016-09-02T01:03:50.000Z'
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Create a new secret
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/now/secrets"/>}

Creates a new secret. The body should contain \`name\` and \`value\` strings.

> **Note**: The name of the secret couldn't be bigger than 100 characters.

#### Input
${<InputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The name of the secret (max 100 characters).</Cell>
  </Row>
  <Row>
    <BoldCell>value</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The value of the new secret.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the secret. Always prepended with <InlineCode>sec_</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name of the secret</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the secret was created.</Cell>
  </Row>
  <Row>
    <BoldCell>userId</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the user who created the secret.</Cell>
  </Row>
  <Row>
    <BoldCell>value</BoldCell>
    <TypeCell>Map</TypeCell>
    <Cell>A map with the value of the secret.</Cell>
  </Row>
</OutputTable>}

#### Secret value
This is the format of the Map received as ${<InlineCode>value</InlineCode>}.

${<OutputTable>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The type of structure used to save the secret value (always <InlineCode>Buffer</InlineCode>).</Cell>
  </Row>
  <Row>
    <BoldCell>data</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>A list of numbers which could be used to recreate the secret value.</Cell>
  </Row>
</OutputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/now/secrets"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "my-api-key",
    "value": "my-value"
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "sec_XCG7t7AIHuO2SBA8667zNUiM",
  "name": "my-api-key",
  "created": "2017-09-22T13:11:49.180Z",
  "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "value": {
    "type": "Buffer",
    "data": [
      109,
      121,
      45,
      118,
      97,
      108,
      117,
      101
    ]
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Change secret name
    `
  ],
  [
    markdown(components)`
${<Endpoint method="PATCH" url="/v2/now/secrets/:name" />}

This endpoint provides an opportunity to edit the \`name\`
of a user's secret. The name has to be unique to that user's secrets.

The body must contain a field \`name\` with the new name to use.

#### Input
${<InputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The new name of the secret.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the secret. Always prepended with <InlineCode>sec_</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The new name of the secret</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the secret was created.</Cell>
  </Row>
  <Row>
    <BoldCell>oldName</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The old name of the secret</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="PATCH"
  url="https://api.zeit.co/v2/now/secrets/my-api-key"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "my-renamed-api-key"
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "sec_XCG7t7AIHuO2SBA8667zNUiM",
  "name": "my-api-key",
  "created": "2017-09-22T13:11:49.180Z",
  "oldName": "my-api-key"
}`}</Code>}

The \`uid\` returned is that of the matched secret.
    `
  ],
  [
    markdown(components)`
### Delete a secret
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/now/secrets/:name" />}:

This deletes the user's secret defined in the URL.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the secret. Always prepended with <InlineCode>sec_</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name of the secret</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the secret was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/now/secrets/my-renamed-api-key"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "sec_XCG7t7AIHuO2SBA8667zNUiM",
  "name": "my-renamed-api-key",
  "created": "2017-09-22T13:11:49.180Z"
}`}</Code>}

The \`uid\` returned is that of the matched secret.
`
  ]
]
      }
    />
  )
}

export default pure(Secrets)
