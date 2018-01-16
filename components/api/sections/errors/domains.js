import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import immutable from '../../../../lib/immutable-component'

function Domains() {
  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
These error code could happen when using any ${<InternalLink href="/api#endpoints/domains">domains related endpoints</InternalLink>}.
    `
  ],
  [
    markdown(components)`
### Domain forbidden
    `
  ],
  [
    markdown(components)`
You don't have access to the domain, this usually mean this domains is owned by another account or team.

The domain is specified in the message and the ${<InlineCode>DOMAIN</InlineCode>} key.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "forbidden",
    "message": "You don't have access to \\"DOMAIN\\"",
    "domain": DOMAIN
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Domain not found
    `
  ],
  [
    markdown(components)`
The domain name could not be found in our system. Try to ${<InternalLink href="/api#endpoints/domains/add-a-new-domain">add it first</InternalLink>}
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_found",
    "message": "Domain name not found"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Missing domain name
    `
  ],
  [
    markdown(components)`
The domain name wasn't specified in the URL. This means you tried to use an endpoint which require you to define the domain name in the URL but didn't defined it.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "missing_name",
    "message": "The URL was expected to include the domain name. Example: /domains/google.com"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Conflicting certificates
    `
  ],
  [
    markdown(components)`
You must ${<InternalLink href="/api#endpoints/certificates/delete-a-certificate">remove the certificates</InternalLink>} described in the error before removing the domains.

The certificates are specified in the ${<InlineCode>CERT_CNS</InlineCode>} key.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "conflict_certs",
    "message": "The following certificates must be removed before removing the domain: CERT_CNS",
    "certCNs": CERT_CNS
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Conflicting aliases
    `
  ],
  [
    markdown(components)`
You must ${<InternalLink href="/api#endpoints/aliases/remove-an-alias">remove the aliases</InternalLink>} described in the error before removing the domains.

The aliases are specified in the ${<InlineCode>ALIASES</InlineCode>} key.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "conflict_aliases",
    "message": "The following aliases must be removed before removing the domain: ALIASES",
    aliases: ALIASES
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Not modified
    `
  ],
  [
    markdown(components)`
When trying to modify a domain nothing was required to change.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_modified",
    "message": "Nothing to do"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Missing domain name
    `
  ],
  [
    markdown(components)`
When trying to add a domain the name wasn't present in the request body.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "missing_name",
    "message": "The \`name\` field in the body was expected but is not present in the body payload. Example value: \`zeit.co\`"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Invalid domain name
    `
  ],
  [
    markdown(components)`
The domain name defined in the request body is invalid.

The name is specified in the error as the ${<InlineCode>NAME</InlineCode>} key.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "invalid_name",
    "message": "The \`name\` field contains an invalid domain name ("NAME")",
    "name": NAME
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Custom domain needs a plan upgrade
    `
  ],
  [
    markdown(components)`
In order to add a custom domain to your account or team you need to upgrade to a paid plan.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "custom_domain_needs_upgrade",
    "message": "Domain name creation requires a premium account."
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Domain already exists
    `
  ],
  [
    markdown(components)`
The domain name you're trying to add already exists.

The domain name and his current ID are received in the ${<InlineCode>NAME</InlineCode>} and ${<InlineCode>DOMAIN_ID</InlineCode>} keys.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_modified",
    "message": "The domain "NAME" already exists",
    "name": NAME,
    "uid": DOMAIN_ID
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Can't create the domain
    `
  ],
  [
    markdown(components)`
The domain name can't be created. Most probably it couldn't be verified.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "forbidden",
    "message": "You don't have permission to create a domain"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Failed to add domain after purchase
    `
  ],
  [
    markdown(components)`
We were able to purchase a domain for you but we had an error when trying to add it to your account. Please contact us on [zeit.chat](https://zeit.chat) or via [support@zeit.com](mailto:support@zeit.co).
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "failed_to_add_domain",
    "message": "The domain was bought but couldn't be added. Please contact us on https://zeit.chat"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Unable to determine the domain price
    `
  ],
  [
    markdown(components)`
We're unable to determine the domain price of a domain.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "service_unavailabe",
    "message": "Failed to determine the domain price"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Domain is not available
    `
  ],
  [
    markdown(components)`
The domain name is not available to be purchased.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_available",
    "message": "Domain is not available"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Invalid domain name
    `
  ],
  [
    markdown(components)`
The domain name or TLD is invalid or not supported.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "invalid_domain",
    "message": "Invalid domain or TLD"
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Domain not found
    `
  ],
  [
    markdown(components)`
The domain you're trying to get information about could not be found or doesn't exists.
    `,
    markdown(components)`
${<Code>{`{
  "error": {
    "code": "not_found",
    "message": "The domain was not found"
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
]
      }
    />
  )
}

export default immutable(Domains)
