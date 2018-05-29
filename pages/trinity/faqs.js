import markdown from 'markdown-in-js'
import withDoc, { components } from '../../lib/with-doc'
import { lewi } from '../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'FAQs',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/faqs.js',
})(markdown(components)`

#### Can I make a mistake with Trinity Wallet?
Trinity wallet is "user-proof". This means that as long 
as you keep your account password and seed backup secure, 
your funds are secure. The only mistake you can make, is to 
send funds to an incorrect address. Please ensure that the 
send address is correct on the send confirmation screen. A 
transaction that is sent cannot be retracted or reimbursed.

#### I have lost access to my device! How do I recover my wallet?
In the unfortunate event that you lose access to your device 
(you lost your phone, your computer crashed, etc.), you can recover 
your wallet and restore your full balance by using your backup "paper 
wallet" or password manager entry. 

To restore your wallet, simply select "Yes" when the Wallet Setup 
asks if you already have a seed. Then enter the seed. Ensure the 
checksum matches your backup checksum. After choosing a new password, 
Trinity will automatically restore your account balance.

#### Why doesn't Trinity support fingerprint authentication?
Trinity puts the security of your funds above all else. Current limitations in the Android OS pose a tough question for developers. We have to choose between permittingpermiting users the convenience of using fingerprints scanners, vs. the risk of offering a less secure wallet. As always, IOTA leans toward security. We are constantly evaluating options to retain maximum security and improve the user experience. 

#### I logged in but I cannot see my balance.
Don't panic! Please read the section above on performing a [snapshot transition](#zerobalance) to restore your balance. Also note that future developments in IOTA will eliminate the need to perform snapshot transitions.

`)
