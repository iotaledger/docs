import markdown from "markdown-in-js"
import withDoc, { components } from "../../lib/with-doc"
import { lewi } from "../../lib/data/team"

// prettier-ignore
export default withDoc({
  title: 'What is Trinity',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/what-is-trinity.js',
})(markdown(components)`
This explainer will walk you through the Trinity wallet setup & 
use, and answer some frequently asked questions. To learn more about 
IOTA, please see the IOTA FAQs.

`)
