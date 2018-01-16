import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { AnchorLink } from '../../../text/link'
import { InternalLink } from '../../../text/link'
import { Table, Row, Cell } from '../../table'
import immutable from '../../../../lib/immutable-component'

function OAuth2() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
OAuth2 lets your app request authorization to private details in a user's ZEIT account.
When using OAuth Apps, all actions are performed as the user who granted access to the OAuth App.

You'll need to register your app before getting started. For registration, please ${<AnchorLink href="mailto:team@zeit.co">contact us</AnchorLink>}.

You can reference an OAuth2 example application [here](https://github.com/zeit/zeit-oauth2-example).
`
  ],
  [
    markdown(components)`
## Authorization
  `
  ],
  [
    markdown(components)`
Your app should redirect users to the following URL:

${<Code>https://zeit.co/oauth/authorize</Code>}

You will pass the following values as query paremeters.

${<Table head={
  <Row>
    <Cell isHead>Key</Cell>
    <Cell isHead>Required</Cell>
    <Cell isHead>Description</Cell>
  </Row>
}>
  <Row>
    <Cell><b>client_id</b></Cell>
    <Cell>Yes</Cell>
    <Cell>ID of your application.</Cell>
  </Row>
  <Row>
    <Cell><b>redirect_uri</b></Cell>
    <Cell>No</Cell>
    <Cell>URL to redirect back.</Cell>
  </Row>
  <Row>
    <Cell><b>state</b></Cell>
    <Cell>No</Cell>
    <Cell>Random string to be passed back upon completion. It is used to protect against CSRF attacks.</Cell>
  </Row>
</Table>}

If the user grants your request, we redirects back to your site with a \`code\` paremeter and with a \`state\` parameter if you provided one in previous step.

The process should be aborted if the states don't match.
    `,
    markdown(components)`
Example request url:

${<Code>https://zeit.co/oauth/authorize?client_id=oac_s4cllbR9Ao8307IDSkluOQBS</Code>}

Example successful redirect url:

${<Code>https://example.com/oauth/callback?code=jMIukZ1DBCKXHje3X14BCkU0&state=t2eh4KHwNyGbo5g65VNvoFhl</Code>}
    `
  ],
  [
    markdown(components)`
## Exchanging code for an access token
  `
  ],
  [
    markdown(components)`
If all goes well, exchange the authorization code for an access token using the following API.

${<Code>POST https://api.zeit.co/v2/oauth/access_token</Code>}

You will pass the following values to request body in the form of \`application/x-www-form-urlencoded\`.

${<Table head={
  <Row>
    <Cell isHead>Key</Cell>
    <Cell isHead>Required</Cell>
    <Cell isHead>Description</Cell>
  </Row>
}>
  <Row>
    <Cell><b>client_id</b></Cell>
    <Cell>Yes</Cell>
    <Cell>ID of your application.</Cell>
  </Row>
  <Row>
    <Cell><b>client_secret</b></Cell>
    <Cell>Yes</Cell>
    <Cell>Secret of your application.</Cell>
  </Row>
  <Row>
    <Cell><b>code</b></Cell>
    <Cell>Yes</Cell>
    <Cell>The code you received.</Cell>
  </Row>
</Table>}

You'll receive a JSON response containing an \`access_token\`.
  `,
    markdown(components)`
Example access token exchange request.

${<Code>{`POST https://api.zeit.co/v2/oauth/access_token

client_id=oac_s4cllbR9Ao8307IDSkluOQBS&client_secret=EOBPvZuBYAtb3SbYo8H1iWFP&code=jMIukZ1DBCKXHje3X14BCkU0
`}</Code>}

Example successful (**200**) response:

${<Code>{`{
  access_token: 'xEbuzM1ZAJ46afITQlYqH605'
}`}</Code>}
    `
  ],
  [
    markdown(components)`
## Using access token

The access token allows you to make requests to the API on a behalf of a user,
by ${<InternalLink href="/api#api-basics/authentication">providing the token in the Authorization header</InternalLink>}.
  `
  ],
]
      }
    />
  )
}

export default immutable(OAuth2)
