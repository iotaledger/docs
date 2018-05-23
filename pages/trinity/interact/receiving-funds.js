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

[Image]

In the Receive tab, you can generate addresses. Tap the "New Address" button to generate an address. Once it is generated,
you can tap the address to copy it to the clipboard. You can also take a screenshot of the QR code and send it to a friend.

> **Important**: On Android devices, any app can read the contents of the keyboard and modify them. Be careful when pasting
> addresses into another app and ensure that the address you have pasted is the same one you originally copied.

`)
