import markdown from 'markdown-in-js'
import React from 'react'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { HeadersTable, Row, Cell, BoldCell } from '../../table'
import immutable from '../../../../lib/immutable-component'

function RateLimits() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
We limit the number of calls you can make over a certain period of time.
Rate limits vary and are specified by the following header in all responses:

${<HeadersTable>
  <Row>
    <BoldCell>X-Rate-Limit-Limit</BoldCell>
    <Cell>The maximum number of requests that the consumer is permitted to
    make per minute.</Cell>
  </Row>
  <Row>
    <BoldCell>X-Rate-Limit-Remaining</BoldCell>
    <Cell>The number of requests remaining in the current rate limit window.</Cell>
  </Row>
  <Row>
    <BoldCell>X-Rate-Limit-Reset</BoldCell>
    <Cell>The time at which the current rate limit window resets in UTC
    epoch seconds.</Cell>
  </Row>
</HeadersTable>}

When the rate limit is **exceeded** an error is returned with the status **429 Too Many Requests**:
    `,
    markdown(components)`
${<Code key="code">{`{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded",
  }
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default immutable(RateLimits)
