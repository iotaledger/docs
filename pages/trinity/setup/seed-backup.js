import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Seed Backup',
  date: '3 May 2018',
  authors: [lewi],
  editUrl: 'pages/trinity/setup/seed-generation.js',
})(markdown(components)`
Trinity takes care of safe seed storage on your mobile
device or computer. It offers several options for making offline
seed backups (or "paper wallets") that can be used in the
unfortunate event that you lose access to your current device.

> Your seed is like the key to a safety deposit box. **Anyone who has it can access your funds**, even without
physical access to your device.

Use at least one of these three options to create a seed backup:

### Write your seed on a piece of paper.

Writing down the seed is a great option for most people. All you
need is a pen and paper. You can download and print a blank
seed template from here: [SEED TEMPLATE].

Write down your seed from left to right, top to bottom. **Triple
check that your seed is written down correctly.**

Make sure to write down your seed's 3 digit checksum in the box below the seed.
Be sure to write it separately from your seed if you use a blank piece
of paper. This avoids confusion later on.

### Print your seed.

This option is convenient, but potentially very unsafe. Proceed
with caution if you intend to use a public or Wi-Fi printer. Never
print to a PDF file, make a screenshot, or save it to another digital
file format on your device. Are unsure if printing is safe? Then you
are probably better off using the other options.

### Copy your seed into a password manager.

Create a new entry in your password manager, and store your seed there.
Be sure to label your entry to easily retrieve it later on.

---

After you've followed atleast one of the three steps above you must
do the following:

### Re-enter the full seed

This step might seem tedious, but it is necessary. It ensures you
that you have properly backed up your seed. You need this backup to
recover your wallet, and to install it on another device.

The checksum is displayed after entering the seed. If it doesn’t match
the checksum you wrote down earlier, your seed is not entered correctly.

 Additional security notes:
1. **Do not screenshot your seed**

2. **Think carefully about where you store your paper
seed backup. Anyone who has access to your seed can take your funds.**


`)
