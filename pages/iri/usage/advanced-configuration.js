import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Advanced Configuration',
  date: '12 March 2018',
  authors: [lewi],
  editUrl: 'pages/iri/usage/advanced-configuration.js',
})(markdown(components)`

Advanced Configuration

`)
