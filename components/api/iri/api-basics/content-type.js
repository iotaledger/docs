import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import immutable from '../../../../lib/immutable-component'

function ContentType() {
  return (
    <Section
      title="API Basics"
      contents={// prettier-ignore
      [
  [
    markdown(components)`

### Content Type

All requests must be encoded as JSON with the \`Content-Type: application/json\` header.
Most responses, including errors, are encoded exclusively as JSON as well.
    `
  ]
]}
    />
  )
}

export default immutable(ContentType)
