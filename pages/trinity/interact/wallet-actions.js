import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Wallet Actions',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/interact/wallet-actions.js',
})(markdown(components)`

At the moment Trinity **does not** support background processes.
Anything you do in the wallet – including logging in, sending transactions,
and refreshing your balance – require the wallet to be in the foreground.

If you navigate to another app while an
action is ongoing, that action will be **not** be completed.

> Leave Trinity open while it completes an action


Future builds of Trinity will enable background processes.


`)
