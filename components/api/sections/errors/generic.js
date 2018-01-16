import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import immutable from '../../../../lib/immutable-component'

function Generic() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
These error codes are consistent for all endpoints.
    `
  ],
  [
    markdown(components)`
### Forbidden
    `
  ],
  [
    markdown(components)`
You're not authorized to use the endpoint. This usually happends due to missing an user token.

> Is similar to the HTTP 403 Forbidden error.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "forbidden",
    "message": "Not authorized"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Rate Limited
  `
  ],
  [
    markdown(components)`
You exceeded the maximum alloted requests.

The limit of request is per endpoint basis so you could continue using another endpoints even if some of them give you this error.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded",
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Bad Request
  `
  ],
  [
    markdown(components)`
There was an error with the request, the ${<InlineCode>error.message</InlineCode>} would contain information about the issue.

    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "bad_request",
    "message": "An english description of the error that just occurred",
   }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Internal Server Error
  `
  ],
  [
    markdown(components)`
This errors is similar to the HTTP 500 Internal Server Error error code.

    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "internal_server_error",
    "message": "An unexpected internal error occurred"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Resource not found
  `
  ],
  [
    markdown(components)`
The endpoint you're requesting doens't handle the method you defined. The error message will contain the methods the endpoint responds to.

    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "method_unknown",
    "message": "This endpoint only responds to METHOD"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Method unknown
  `
  ],
  [
    markdown(components)`
The endpoint you're requesting doens't handle the method you defined. The error message will contain the methods the endpoint responds to.

    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "method_unknown",
    "message": "This endpoint only responds to METHOD"
  }
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default immutable(Generic)
