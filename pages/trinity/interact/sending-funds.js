import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'
import Image from '../../../components/image'

// prettier-ignore
export default withDoc({
  title: 'Sending Funds',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/interact/sending-funds.js',
})(markdown(components)`

To send funds, enter the receiving address and the amount to send.

> **Important**: On Android devices, any app can read the contents of the keyboard and modify them. Be careful when pasting
> addresses into Trinity and ensure that the address you have pasted is the same one you originally copied.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/send.jpg`}
    width={320}
    height={630}
    caption="Send IOTA to an adress"
  />
}


With multiple accounts in your Trinity wallet, be sure to select the
right account to send from in the dropdown menu. The amount to send
can be entered in IOTA or in the fiat currency of your choice.

Please pay close attention to the IOTA units you are sending (i, Mi, Gi, etc.).

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/sending-value-highlighted.jpg`}
    width={320}
    height={630}
    caption="Send in different values"
  />
}

Press the "IOTA units explained" at the bottom for further information.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/iota-units.jpg`}
    width={320}
    height={630}
    caption="IOTA Units"
  />
}

You can include a message by filling out the highlighted field.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/sending-messege-highlighted.jpg`}
    width={320}
    height={630}
    caption="Include a messege with you transaction"
  />
}

To change the default currency, go to **Settings**.

### Auto Promotion

`)
