import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'The IOTA Token',
  date: '19 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/iota-token/the-iota-token.js',
})(markdown(components)`

The IOTA token is a \`cryptotoken\` built upon the Tangle technology. The
token 

`)
