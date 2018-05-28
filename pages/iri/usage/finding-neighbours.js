import markdown from 'markdown-in-js'
import { ExternalLink } from '../../../components/text/link'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Finding Neighbors',
  date: '12 March 2018',
  authors: [lewi],
  editUrl: 'pages/iri/usage/finding-neighbors.js',
})(markdown(components)`

In order to run IRI and sync with the network, you need to 
have neighbors which want to pair with you. The easiest and 
fastest way to get neighbors is through our ${<ExternalLink href="https://discord.gg/7Gu2mG5" key="">Discord</ExternalLink>}, where you 
can join the \`#nodesharing\` channel to find neighbors.

It should be noted that you have to share your own IP/URL and 
port with your neighbors as well, because IOTA relies on 
mutual tethering for the data exchange. If you need help 
simply ask on Discord in the \`#help\` channel.
`)
