import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { InternalLink } from '../../../text/link'
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

function Aliases(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### List all the aliases
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/aliases" />}

Retrieves all of the active now aliases for the authenticating user.
The body will contain an entry for each alias.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the alias.</Cell>
  </Row>
  <Row>
    <BoldCell>alias</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The alias name, it could be a <InlineCode>.now.sh</InlineCode> subdomain or a custom domain.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the alias was created.</Cell>
  </Row>
  <Row>
    <BoldCell>deployment</BoldCell>
    <TypeCell>Map</TypeCell>
    <Cell>A map with the deployment ID and url.</Cell>
  </Row>
  <Row>
    <BoldCell>deploymentId</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The deployment ID.</Cell>
  </Row>
  <Row>
    <BoldCell>rules</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The configured rules for <InternalLink href="/docs/features/path-aliases">path alias</InternalLink></Cell>
  </Row>
</OutputTable>}

#### Deployment
This is the format of the ${<InlineCode>deployment</InlineCode>} above described above.

${<OutputTable>
  <Row>
    <BoldCell>id</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The deployment unique identifier.</Cell>
  </Row>
  <Row>
    <BoldCell>url</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The deployment unique URL.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/aliases"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "aliases": [
    {
      "uid": "2WjyKQmM8ZnGcJsPWMrHRHrE",
      "alias": "my-alias",
      "created": "2016-06-02T21:01:40.950Z",
      "deployment": {
        "id": "c9MrOWGzdJSfPxqyTDYhdEGN",
        "url": "my-app-fjvngszyiq.now.sh"
      },
      "deploymentId": "c9MrOWGzdJSfPxqyTDYhdEGN"
    },
    {
      "uid": "CR3bdJZkiaAuh9yr0OHXJJPG",
      "alias": "my-alias-2",
      "created": "2016-06-01T21:03:10.420Z",
      "rules": [
          {
              "pathname": "/",
              "dest": "my-app-fjvngszyiq.now.sh"
          },
          {
              "dest": "my-api-ibzcpajvlo.now.sh"
          }
      ]
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Remove an alias
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/now/aliases/:id" />}

The API allows you to delete an alias by supplying the alias \`:id\` in the url.
You can obtain this id from the list of aliases.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>status</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>If the alias was successfully removed.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/now/aliases/2WjyKQmM8ZnGcJsPWMrHRHrE"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "status": "SUCCESS"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### List aliases by deployment
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/deployments/:id/aliases" />}

Retrieves all of the aliases for the deployment with the given \`:id\`.
The authenticating user must own this deployment.
The body will contain an entry for each alias.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>aliases</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>A list of the aliases asigned to the deployment.</Cell>
  </Row>
</OutputTable>}

#### Alias
This is the format of each item in the ${<InlineCode>aliases</InlineCode>} list.

${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the alias.</Cell>
  </Row>
  <Row>
    <BoldCell>alias</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The alias name, it could be a <InlineCode>.now.sh</InlineCode> subdomain or a custom domain.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the alias was created.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/deployments/7Npest0z1zW5QVFfNDBId4BW/aliases"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "aliases": [
    {
      "uid": "2WjyKQmM8ZnGcJsPWMrHRHrE",
      "alias": "my-alias",
      "created": "2016-06-02T21:01:40.950Z",
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Assign an alias to a deployment
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/now/deployments/:id/aliases" />}

Creates a new alias for the deployment with the given \`:id\`. The authenticated user must own this deployment.

The JSON body of the POST should contain an \`alias\` key with the desired alias (hostname or custom url).

If the desired alias was used before it will be removed from the old deployment and assigned to the new one.

#### Input
${<InputTable>
  <Row>
    <BoldCell>alias</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The alias we want to assign to the deploymed defined in the URL.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>oldID</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the previously aliased deployment, only received when the alias was used before.</Cell>
  </Row>
  <Row>
    <BoldCell>ui</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique identifier of the alias.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The date when the alias was created.</Cell>
  </Row>
</OutputTable>}

    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/now/deployments/7Npest0z1zW5QVFfNDBId4BW/aliases"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    alias: 'my-alias.now.sh'
  }}
/>}

Example successful (**200**) response for new alias:

${<Code>{`{
  "uid": "2WjyKQmM8ZnGcJsPWMrHRHrE",
  "created": "2016-06-02T21:01:40.950Z"
}`}</Code>}


Example successful (**200**) response for alias with existing deployment
(\`oldId\` is the id of the previous deployment):

${<Code>{`{
  "oldId": "c9MrOWGzdJSfPxqyTDYhdEGN",
  "uid": "2WjyKQmM8ZnGcJsPWMrHRHrE",
  "created": "2016-06-02T21:01:40.950Z"
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(Aliases)
