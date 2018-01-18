import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { ExternalLink, InternalLink } from '../../../text/link'
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

function Authentication() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
### Request a login
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/now/registration" />}

Request a new login for an user to get a token.

#### Input
${<InputTable>
  <Row>
    <BoldCell>email</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The user email.</Cell>
  </Row>
  <Row>
    <BoldCell>tokenName</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The desired name for the token. It will be displayed on the <ExternalLink href="https://zeit.co/account/tokens">user account details</ExternalLink>.</Cell>
  </Row>
</InputTable>}

### Output
${<OutputTable>
  <Row>
    <BoldCell>token</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The token used to verify the user accepted the login request.</Cell>
  </Row>
  <Row>
    <BoldCell>securityCode</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The code the user is going to receive on the email. <strong>Must</strong> be displayed to the user so he can verify the request is the correct.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/now/registration"
  headers={{
    'Content-Type': 'application/json'
  }}
  body={{
    "email": "user@mail.com",
    "tokenName": "Your Client App Name"
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "token": "T1dmvPu36nmyYisXAs7IRzcR",
  "securityCode": "Practical Saola"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Verify login
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/now/registration/verify?email&token" />}

Verify the user accepted the login request and get a authentication token. The user email address and the token received after ${<InternalLink href="/api#endpoints/authentication/request-a-login">requesting the login</InternalLink>} must be added to the URL as a query string with the names ${<InlineCode>email</InlineCode>} and ${<InlineCode>token</InlineCode>}.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>token</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The user authentication token you can use as described in <InternalLink href="/api#api-basics/authentication">API Basics - Authentication</InternalLink>.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/now/registration/verify?email=user@mail.com&token=T1dmvPu36nmyYisXAs7IRzcR"  
/>}

Example response:

${<Code syntax="json">{`{
  "token": "sGkHhSH98wtJB0lyODZJ2bRe"
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default pure(Authentication)
