import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { ExternalLink } from '../../../components/text/link'
import { jakubcech } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Troubleshooting',
  date: '02 July 2018',
  authors: [jakubcech],
  editUrl: 'pages/iri/usage/troubleshooting-iri.js',
})(markdown(components)`

Common and known issues that you run across when installing, configuring, and running IRI. Please feel free to propose new additions to the topic by creating a PR in the ${<ExternalLink href="https://github.com/iotaledger/docs" key="">docs repo</ExternalLink>}.

## Error - trustAnchors parameter must be non-empty
When compiling IRI on Ubuntu 18, you can run across the following errror: \`java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty\`. 

See details on the error and the resolution on ${<ExternalLink href="https://stackoverflow.com/a/50103533" key="">StackOverflow</ExternalLink>}

## IRI Node is not synchronizing

1. Make sure you have enough neighbors. 6-7 neighbors at the very least. See [Finding neighbors](/iri/usage/finding-neighbours). After adding enough neighbors, make sure there is traffic flowing and give the node some time to sync. Use \`getNeighbors\` to see both incoming \`numberOfAllTransactions\` and outgoing \`numberOfSentTransactions\`. Full command example: \`curl http://localhost:14265 -X POST -H 'Content-Type: application/json' -H 'X-IOTA-API-Version: 1' -d '{"command": "getNeighbors"}'\` 
2. Update to the ${<ExternalLink href="https://github.com/iotaledger/iri/releases" key="">latest version</ExternalLink>}  of IRI.
3. Get more support by joining our ${<ExternalLink href="https://bit.ly/iota-invite" key="">discord</ExternalLink>} #fullnodes channel.

`)
