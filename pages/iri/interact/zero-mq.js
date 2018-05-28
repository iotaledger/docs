import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { InternalLink } from '../../../components/text/link'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Zero MQ',
  date: '16 March 2018',
  authors: [lewi],
  editUrl: 'pages/iri/interact/zero-mq.js',
})(markdown(components)`

Connecting to the ZMQ Stream.

## API Reference

See here for the ${<InternalLink href="/iri/api#zero-em-queue">{`ZMQ Reference`}</InternalLink>}

`)
