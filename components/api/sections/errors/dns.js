import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import immutable from '../../../../lib/immutable-component'

function Domains() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
These error code could happen when using any ${<InternalLink href="/api#endpoints/dns">DNS related endpoint</InternalLink>}.
    `
  ],
  [
    markdown(components)`
### Missing DNS record name
    `
  ],
  [
    markdown(components)`
The DNS record key ${<InlineCode>name</InlineCode>} is required and was not provided. It should be either a subdomain or ${<InlineCode>@</InlineCode>} for the domain itself.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "missing_name",
    "message": "Missing \`name\` parameter"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Missing DNS record name
    `
  ],
  [
    markdown(components)`
The DNS record key ${<InlineCode>name</InlineCode>} is required and was not provided. It could be [any valid DNS record](https://en.wikipedia.org/wiki/List_of_DNS_record_types).
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "missing_type",
    "message": "Missing \`type\` parameter"
  }
}`}</Code>}
    `
  ]
]}
    />
  )
}

export default immutable(Domains)
