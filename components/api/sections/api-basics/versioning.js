import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import immutable from '../../../../lib/immutable-component'

function Versioning() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
We try to avoid breaking backwards-compatibility as much as possible.

In the rare event that we would need to change an endpoint in a very substantial way, we simply will introduce an alternative way of accessing the resource, under a different path.

Some API endpoints, however, are flagged as **EXPERIMENTAL**. If this is the case, we might deprecate or change the shape of the response over time by appending a version prefix. For example, \`/create\` might evolve into \`/v2/create\`. When the experimental status is removed, so is the prefix.
    `
  ]
]
      }
    />
  )
}

export default immutable(Versioning)
