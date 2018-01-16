import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import immutable from '../../../../lib/immutable-component'

function OAuth2() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
These error code could happen when using any ${<InternalLink href="/api#endpoints/oauth2">OAuth2 related endpoint</InternalLink>}.
    `
  ],
  [
    markdown(components)`
### Client not found
    `
  ],
  [
    markdown(components)`
The OAuth2 client ID could not be found or doesn't exists.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_found",
    "message": "OAuth client doesn't not found: CLIENT_ID"
  }
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default immutable(OAuth2)
