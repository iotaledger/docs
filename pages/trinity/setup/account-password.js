import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'
import Image from '../../../components/image'

// prettier-ignore
export default withDoc({
  title: 'Account Password',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/setup/account-password.js',
})(markdown(components)`

You will need this password every time you login to your Trinity wallet.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/setup-password.jpg`}
    width={320}
    height={630}
    caption="Choose your password"
  />
}

`)
