import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import { HR } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Five Minute Guide',
  date: '30 July 2017',
  authors: [leo, arunoda],
})(markdown(components)`

With Now's help, you can deploy and publish any kind of web application (or service) in
under five minutes.

This guide will show you how to deploy such an app, connect it to a
domain name of your choice and configure an SSL certificate.

## Installing Now Desktop

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/installation/now-desktop.png`}
    width={550}
    height={380}
  />
}

The best way to get started with Now on your device
is [Now Desktop](/download), a minimal application
that runs in your menubar and comes with the following features:

- Installs [Now CLI](/download#command-line) and keeps it
up to date automatically (the command line interface for interacting with Now).
- Provides a realtime feed of the activity
on your account and teams that you've joined.
- Let's you deploy any kind of application or file by
simply dragging and dropping it onto its menubar icon or selecting
it using a file picker.

## Signing Up

Once you've downloaded [Now Desktop](/download) open it and follow the
instructions.

After you've completed the signup process (you can also use the form
to log in), a window should open with your account's event feed inside.

## Deployment

Now that we're logged in, let's beging with deploying a
simple static web site.

Firstly, create a directory called \`my-web-app\` and add the following content to a file called \`index.html\`.

${<Code>{`<!DOCTYPE html>
<html>
  <body>
    This is a static web app.
  </body>
</html>`}</Code>}

> You can also use a [Node.js app](https://github.com/zeit/nextgram) or an [app with a Dockerfile](https://github.com/now-examples/cobol-hello-world) instead of this simple static app.

After you have added the content, visit the \`my-web-app\` directory using a terminal and run this command:

${<TerminalInput>now</TerminalInput>}

${<Now color="#000"/>} will deploy the app and give you a URL as shown below.

${<Image
  src={`${IMAGE_ASSETS_URL}/docs/five-minute-guide-to-now/deploy.png`}
  width={650}
  height={255}
  caption="Getting a unique URL after the deployment."
/>}

This is a URL for the current deployment of the app. You can access this version of the app anytime with this URL.

## Domain Name

Now you have a unique URL(<https://my-web-app-avvuiuuwto.now.sh>) for your app. But you probably want a nicer-sounding URL before directing your users there. The next step is to map the "now.sh" URL to a domain name that you prefer.

Let's assume the domain name is \`my-web-app.com\`, and you haven't bought it yet. <br/>
To map this domain name to the app's unique URL, run this command:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com</TerminalInput>}

Since you haven't bought the domain name yet, you will be asked to enter your credit card information to buy it.
You can do that by running this command:

${<TerminalInput>now cc add</TerminalInput>}

You may choose to upgrade your account to the "Premium" plan by running this command:

${<TerminalInput>now upgrade</TerminalInput>}

Now, run the domain mapping command again and follow these instructions:

${<TerminalInput>now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com</TerminalInput>}

Once you've done that, you'll be able to access your app using <https://my-web-app.com>.
It is automatically configured with a [Let's Encrypt](https://letsencrypt.org/) SSL certificate and served with HTTPS.

${<Image
  src={`${IMAGE_ASSETS_URL}/docs/five-minute-guide-to-now/domain-setup.png`}
  width={650}
  height={412}
  caption="After mapping a domain name to a deployment."
/>}

## Updates

If you've made any changes to your app, you will need to deploy the latest version of your app. To do that, run this command:

${<TerminalInput>now</TerminalInput>}

You will receive a unique URL for this deployment. Let's assume that the new URL is <https://my-web-app-ttfxzqwbwz.now.sh>.

You can map this new URL to your domain name by running this command:

${<TerminalInput>now alias https://my-web-app-ttfxzqwbwz.now.sh my-web-app.com</TerminalInput>}

Now everything is ready.<br/>
Your users can access the updated web app at <https://my-web-app.com>.

${<HR />}

These are just a few things you can do with ${<Now color="#000"/>}. To learn more about ${<Now color="#000"/>}, simply follow the rest of the docs.
`)
