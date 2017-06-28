import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg, leo } from '../../../lib/data/team'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Installing Now',
  date: '07 Nov 2016',
  authors: [rauchg, leo],
})(markdown(components)`


This guide will cover how to install and verify that Now is working properly. Our app is distributed in two forms:

* A desktop application that sits on the menubar
* A command line program that you can install from binaries or \`npm\`

If you choose to install the desktop app, you don't need to manually install the command line program. The app will offer you to install it and maintain it up-to-date automatically.

In general, we recommend you install the desktop app if your system is compatible. It stays out of the way and makes deploying, logging in and even sharing files a snap!

## Installing the App

To install **Now Desktop**, start by downloading the package from the ${<InternalLink href="/download">download section</InternalLink>}.

We distribute the app version as a zip file. Double click to extract it and then drag and drop **Now** into "Applications".

${<Image
  src={`${ASSETS_URL}/docs/installing-now/guide-drag-drop-now.gif`}
  width={650}
  height={417}
  caption="A video showing the entire installation process"
/>}

Please note that once the app is running, it will stay up-to-date automatically. This is the last time you have to manually download it and install it.

Locate it in under "Applications" and double click it. The first time you launch it you'll be greeted by an onboarding tutorial:

${<Image
  src={`${ASSETS_URL}/docs/installing-now/tutorial-1.png`}
  width={746}
  height={530}
  caption="To re-run the tutorial later on, click ▲ > About Now > Tutorial (bottom part of the screen)"
/>}

You'll also notice that we placed a ▲ icon on the menubar. This is your main point of interaction with the app.

${<Image
  src={`${ASSETS_URL}/docs/installing-now/menubar.png`}
  width={400}
  height={130}
  caption="The menubar icon for Now"
/>}

The third step will prompt you to install the CLI program. It's **highly recommended** that you do so, in order to access the more advanced parts of the system.

${<Image
  src={`${ASSETS_URL}/docs/installing-now/tutorial-2.png`}
  width={746}
  height={531}
  caption={`After clicking "Install Now", you might be asked about your admin password in order to modify the filesystem`}
/>}

The last and final step is to **log in** or **sign up** for your account. Just enter your email and follow the confirmation link.

${<Image
  src={`${ASSETS_URL}/docs/installing-now/tutorial-3.png`}
  width={746}
  height={531}
  caption="The same form is used for both logging in and signing up"
/>}

Once you're logged in, the menubar will reveal itself and you're ready to use now. Now I suggest going to the ${<InternalLink href="/docs/getting-started/your-first-deployments">Your First Deployments</InternalLink>} guide to learn more about how to interact with the platform.

## Installing Binaries Without npm

On the ${<InternalLink href="/download">Download</InternalLink>} page, we offer a third installation mechanism: Pre-built binaries. These can be run from anywhere in the filesystem, but we typically recommend exposing them in \`$PATH\`.

## Installing From npm

Additionally, we distribute the command line version of now on [npm](https://www.npmjs.com/package/now). If you don't have npm installed, you get it by installing [Node.js](https://nodejs.org).

To verify npm is installed correctly, run the following command in your terminal:

${<TerminalInput>npm --version</TerminalInput>}

Which on my computer outputs:

${<TerminalOutput>4.1.2</TerminalOutput>}

Under certain configurations, the command above might fail because of insufficient permissions. In these cases, please [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions). After you're done, try running the command again.

To verify now was installed correctly, run the following command:

${<TerminalInput>now --version</TerminalInput>}

`)
