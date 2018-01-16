import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { ExternalLink } from '../../../text/link'
import pure from '../../../../lib/pure-component'

function Authentication(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
Provide your API token as part of the \`Authorization\` header.

To act on resources owned by a team add \`teamId\` query string at the end of an API URL and use the teamId as the value.

If the authentication is unsuccessful, the status code **403** is returned.
`,
    markdown(components)`
${<Code>Authorization: Bearer {TOKEN}</Code>}

${<Code>https://api.zeit.co/example?teamId=team_123</Code>}

> **NOTE:** ${props.user ? 'Since you\'re logged in, ' : ['When ', <ExternalLink href="/login" key="loggedin">logged in</ExternalLink>, ',']} the examples in the API will contain your secret token. Don't share them! For example, to get a [list of deployments](/api/endpoints/get-endpoint) try the following:

${<Code syntax="shell">curl -H "Authorization: Bearer {TOKEN}" https://api.zeit.co/v2/now/deployments</Code>}
`
  ]
]
      }
    />
  )
}

export default pure(Authentication)
