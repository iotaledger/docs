import markdown from 'markdown-in-js'
import React from 'react'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import immutable from '../../../../lib/immutable-component'

function Errors() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
The possible \`error_code\` values are documented on a per-endpoint basis in the ${<InternalLink href="/api#errors/generic">Errors</InternalLink>} section.

Since the \`message\` is bound to change over time, we recommend you do not pass it along directly to end-users of your application.

${/*Finally, we provide a help link that will give you information about the specific error you just received to make debugging easier! This link is generic and not exclusive to your application or data.*/''}
    `,
    markdown(components)`
All errors have the following format:

${<Code>{`{
  "error": {
    "code": "error_code",
    "message": "An english description of the error that just occurred"
   }
}`}</Code>}
    `,
  ]
]
      }
    />
  )
}

export default immutable(Errors)
