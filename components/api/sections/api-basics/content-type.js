import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import immutable from '../../../../lib/immutable-component'

function ContentType() {
  return (
    <Section
      title="API Basics"
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
Our API is exposed as an HTTP/1 and HTTP/2 service over SSL.
All endpoints live under the URL \`https://api.zeit.co\` and then generally follow the REST architecture.

### Content Type

All requests must be encoded as JSON with the \`Content-Type: application/json\` header.
Most responses, including errors, are encoded exclusively as JSON as well.
    `
  ]
]
      }
    />
  )
}

export default immutable(ContentType)
