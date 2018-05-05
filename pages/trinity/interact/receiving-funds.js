import markdown from "markdown-in-js"
import withDoc, { components } from "../../../lib/with-doc"
import { lewi } from "../../../lib/data/team"
import Image from "../../../components/image"

// prettier-ignore
export default withDoc({
  title: 'Receiving Funds',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/interact/receiving-funds.js',
})(markdown(components)`

Padd out

[Image]

You can now copy and paste the address, or share it with the QR code.

`)
