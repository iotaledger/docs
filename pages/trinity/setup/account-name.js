import markdown from "markdown-in-js"
import withDoc, { components } from "../../../lib/with-doc"
import { lewi } from "../../../lib/data/team"
import Image from "../../../components/image"

// prettier-ignore
export default withDoc({
  title: 'Account Name',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/setup/account-name.js',
})(markdown(components)`
Trinity has the option to have multiple 'accounts' within
the one application. This allows you to have multiple accounts 
much like a banking app. 

During setup select a name that will let you know what the 
account will be used for:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/trinity/accounts-setup.jpg`}
    width={320}
    height={640}
    caption="Choosing account name on setup."
  />
}

> The standard name is “Main account”

Each account represents a different **seed**. So whenever you create a 
new account be sure to follow the correct backup proceedures.


You can rename each account in the Settings tab. A good description 
here helps you remember the purpose of the account.



`)
