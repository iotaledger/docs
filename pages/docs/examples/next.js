import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink, AnchorLink } from '../../../components/text/link'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Building a Super Basic Next.js Application',
  date: '24 Feb 2017',
  authors: [leo],
})(markdown(components)`

When it comes to complex, dynamic applications which need to serve a lot of purposes, we were always driven by finding the easiest and most efficient way of handling the process of creating such a new app.

That's the reason why we combined all of our experiences and created [Next.js](https://zeit.co/blog/next), a tiny toolbet made out of commands which abstracts away all of the complicated machinery required for creating a [React](http://reactjs.com/) application.

For the exact details, read [this post](https://zeit.co/blog/next).

## Requirements

Before we get started, please make sure that your instance of Node is up-to-date. You should have the latest "Current" release (compare it with [this](https://nodejs.org/)). If it's not, click on the download button on the site and get yourself the newest version.

You can use this command to check the version tag of your local instance:

${<TerminalInput>node -v</TerminalInput>}

Once the output of the command matches the latest version on the site, go on to the next section.

## Setup

Let's start with creating a new empty directory and moving into it:

${<TerminalInput>{`mkdir next-app\ncd next-app`}</TerminalInput>}

Next, create the project's \`package.json\` in that directory:

${
  <Code>
    {`{
  "name": "next-app",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}`}
  </Code>
}

The JSON code shown above tells [npm](https://www.npmjs.com/) to prepare three commands:

* \`npm run dev\` – Runs \`next\` in the development mode and creates a server for testing the application locally.
* \`npm run build\` – This command will be run by now on the server (you can also enter it in your terminal to try out how the application will look in production) and prepare it to be served to the visitor.
* \`npm start\` – Once \`next\` has built the app with \`npm run build\`, this command will serve the code to the end user. As long as it runs, your app will be accessible!

Got it? Pretty straight-forward, isn't it?

Now that we've told \`next\` what to do, we still need to install it. In order to make it work, we also need to install [react](https://facebook.github.io/react/) and [react-dom](https://facebook.github.io/react/docs/react-dom.html):

${
  <TerminalInput>
    npm install next react react-dom --save
  </TerminalInput>
}

The command shown above installs all three dependencies and adds them to your \`package.json\` file, so that you can install them again by just running \`npm install\` later.

## Adding Content

Now that the project's meta files are in place, we can start adding the code that will be rendered when a visitor accesses the site.

With most frameworks, you would now have to set up a router and tell it about the page you'd like to add. But with [Next.js](https://zeit.co/blog/next), the only thing you need to do is create a page and the framework will automatically handle the rest.

In turn, the next step will be to just add a directory named "pages". As the name indicates, this is where all pages of your application will be located. Based on the directory structure, each file will be mounted to a specific path.

As an example, you can now add a \`index.js\` file inside that folder, which will be served when the / path is accessed on your app. Into this file, put this code:

${
  <Code>
    {`export default () => (
  <P>Welcome to Next.js!</P>
)`}
  </Code>
}

As you can see, we're exporting [JSX code](https://facebook.github.io/react/docs/jsx-in-depth.html) which renders a paragraph with some random content in it.

## Trying out the Code

[Next.js](https://zeit.co/blog/next) comes with a awesome development toolchain built-in. We've defined one of these commands ${<AnchorLink href="#setup">earlier</AnchorLink>} in the \`package.json\` file we've created: The \`dev\` script (linked to the \`next\` command), which can be can run like this:

${<TerminalInput>npm run dev</TerminalInput>}

When running the command, \`next\` will build the code and serve it on the address shown in the terminal. In addition, it will watch for changes on the files inside your project. If you make changes to the code, the app will be built again.

This is how it should look:

${
  <Image
    src={`${ASSETS_URL}/docs/next/running.png`}
    width="550"
    height="309"
  />
}

You can now go to <http://localhost:3000> in your browser and see the rendered markup:

${
  <Image
    src={`${ASSETS_URL}/docs/next/output.png`}
    width="550"
    height="307"
  />
}

That's all! Now the application is **ready to be deployed** (we'll discuss this in the next section). But if you want to learn more about the intention behind Next.js, you can read [this](https://zeit.co/blog/next) or check out the [documentation](https://zeit.co/blog/next). Have fun with it!

## Deploying the App

Once the application works as expected, you can **deploy it** by running this command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created application. This means that you can already share the URL with other people across the globe and have them enjoy it.

But in the case of a real service (not used for testing purposes), you would now have to assign an ${<InternalLink href="/docs/features/aliases">alias</InternalLink>} to it.
`)
