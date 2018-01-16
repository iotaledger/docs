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

function Teams(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
### Create a team
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/teams" />}

Create a new team under your account. You need to send a ${<InlineCode>POST</InlineCode>} request with the desired team slug.

#### Input
${<InputTable>
  <Row>
    <BoldCell>slug</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The desired slug for the team.</Cell>
  </Row>
</InputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/teams"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "slug": "a-random-team"
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "id": "team_LLHUOMOoDlqOp8wPE4kFo9pE"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### List all your teams
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/teams" />}

Get a list of all the team you belong to.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>teams</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The list of each team member as described on <InternalLink href="/api#endpoints/teams/get-single-team-information">Get single team information</InternalLink></Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/teams"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "teams": [
    {
      "id": "team_ofwUZockJlL53hINUGCc1ONW",
      "slug": "my-team",
      "name": "My Team",
      "creatorId": "2qDDuGFTWXBLDNnqZfWPDp1A",
      "created": "2017-04-29T17:21:54.514Z",
      "avatar": null
    }/
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get single team information
    `
  ],
  [
    markdown(components)`
${<Endpoint>
  GET /teams/:id<br />
  GET /teams?slug
</Endpoint>}

Get the information of a specific team, it could be used either passing the ${<InlineCode>:id</InlineCode>} in the URL or the team ${<InlineCode>slug</InlineCode>} as a query parameter.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>id</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The team unique identifier. Always prepended by ${<InlineCode>team_</InlineCode>}.</Cell>
  </Row>
  <Row>
    <BoldCell>slug</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The team slug. A slugified version of the ${<InlineCode>name</InlineCode>}</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name of the team.</Cell>
  </Row>
  <Row>
    <BoldCell>creatorId</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The ID of the user who created the team.</Cell>
  </Row>
  <Row>
    <BoldCell>avatar</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell></Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "id": "team_ofwUZockJlL53hINUGCc1ONW",
  "slug": "my-team",
  "name": "My Team",
  "creatorId": "2qDDuGFTWXBLDNnqZfWPDp1A",
  "created": "2017-04-29T17:21:54.514Z",
  "avatar": null
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Update team information
    `
  ],
  [
    markdown(components)`
${<Endpoint method="PATCH" url="/teams/:id" />}

Update the information of the team defined with the id. You need to send a ${<InlineCode>PATCH</InlineCode>} request with a body containing the information you want to change.

> **Note**: You need to be ${<InlineCode>OWNER</InlineCode>} to use it.

#### Input
${<InputTable>
  <Row>
    <BoldCell>slug</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={false} />
    <Cell>The new team slug.</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={false} />
    <Cell>The new team name.</Cell>
  </Row>
</InputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="PATCH"
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "My Cool Team"
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "id": "team_ofwUZockJlL53hINUGCc1ONW",
  "slug": "my-team",
  "name": "My Cool Team",
  "creator_id": "2qDDuGFTWXBLDNnqZfWPDp1A",
  "creatorId": "2qDDuGFTWXBLDNnqZfWPDp1A"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get list of team members
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/teams/:id/members" />}

Get the list of team members of the team defined in the URL. The response is a list of maps with the following format.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The team member unique identifier.</Cell>
  </Row>
  <Row>
    <BoldCell>role</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>The role inside the team, it could be <InlineCode>OWNER</InlineCode> or <InlineCode>MEMBER</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>email</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The email address of the team member.</Cell>
  </Row>
  <Row>
    <BoldCell>username</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The username of the team member</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW/members"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example response:

${<Code syntax="json">{`[
  {
    "uid": "2qDDuGFTWXBLDNnqZfWPDp1A",
    "role": "OWNER",
    "email": "user-emailgmail.com",
    "username": "some-user"
  },
  {
    "uid": "JJHkdv6NaPOTH88pXn8FEuGz",
    "role": "OWNER",
    "email": "another-user@mail.com",
    "username": "another-user"
  }
]`}</Code>}
    `
  ],
  [
    markdown(components)`
### Invite user to team
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/teams/:id/members" />}

Invite a user to join the team specified in the URL. To use it send a ${<InlineCode>POST</InlineCode>} request with the user email in the body.

> **Note**: You need to be ${<InlineCode>OWNER</InlineCode>} to use it.

#### Input
${<InputTable>
  <Row>
    <BoldCell>email</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The email address of the user to invite.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The ID of the invited user.</Cell>
  </Row>
  <Row>
    <BoldCell>username</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The username of the invited user.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW/members"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "email": "user@mail.com"
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "uid": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "username": "an-user"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Change user role
    `
  ],
  [
    markdown(components)`
${<Endpoint method="PATCH" url="/teams/:id/members/:userId" />}

Change the role of an user inside a team member. To change it send a ${<InlineCode>PATCH</InlineCode>} request, if the change is done you will receive a 200 status code with an empty body.

> **Note**: You need to be ${<InlineCode>OWNER</InlineCode>} to use it.

#### Input
${<InputTable>
  <Row>
    <BoldCell>role</BoldCell>
    <TypeCell>Enum</TypeCell>
    <BooleanCell status={true} />
    <Cell>The new role of the team member, it could be <InlineCode>OWNER</InlineCode> or <InlineCode>MEMBER</InlineCode>.</Cell>
  </Row>
</InputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="PATCH"
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW/members/kr1PsOIzqEL5Xg6M4VZcZosf"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "role": "OWNER"
  }}
/>}
    `
  ],
  [
    markdown(components)`
### Remove user to team
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/teams/:id/members/:userId" />}

Remove the specified user from a team.

> **Note**: You need to be ${<InlineCode>OWNER</InlineCode>} to use it and the user **must not** be an owner itself.
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/teams/team_ofwUZockJlL53hINUGCc1ONW/members/kr1PsOIzqEL5Xg6M4VZcZosf"
  headers={{
    Authorization: `Bearer ${TOKEN}'`
  }}
/>}
    `
  ]
]}
    />
  )
}

export default pure(Teams)
