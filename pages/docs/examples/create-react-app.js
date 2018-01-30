import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Building a Single Page Application with Create React App',
  date: '23 Feb 2017',
  authors: [sergio],
  editUrl: 'pages/docs/examples/create-react-app.js',
})(markdown(components)`

[Create React App](https://github.com/facebookincubator/create-react-app) is a boilerplate tool used to create Single Page Applications with React.js without build configuration. Facebook created CRA and made it the official way to start a new React application.

In this page we're going to focus on how to deploy a Single Page Application made with Create React App to ${<Now color="#000"/>}. If you want to learn how to use this boilerplate tool we recommend you to read their [repository's README](https://github.com/facebookincubator/create-react-app/blob/master/README.md).

## Type of deployment

${<Now color="#000"/>} let us deploy a simple ${<InternalLink href="/docs/examples/static">static site</InternalLink>} without any configuration, and even if a Single Page Application could be considered a static site (since we don't need server side code) is not exactly one and has one special requirement, the routing is handled client side. That means every URL which doesn't resolve to a static file should return the \`index.html\` file so the application can decide if it's a handled URL or not.

Because of this special requirement we can't just do a ${<InternalLink href="/docs/getting-started/deployment#static-deployment">static deployment</InternalLink>} and we need to rely into the ${<InternalLink href="/docs/getting-started/deployment#node.js-deployment">Node.js</InternalLink>} or ${<InternalLink href="/docs/getting-started/deployment#docker-deployment">Docker</InternalLink>} deployment. In this case we're going to use a Node.js one.

## Setup

We're going to need a HTTP server for our application, there are many possible ones including Apache, NGINX, express-static, etc. But in our case we're going to use [serve](https://github.com/zeit/serve) and install it as a dependency in our project.

${<TerminalInput>npm install --save serve</TerminalInput>}

Then we need to add a script to run this server, because Create React App use \`start\` to run the development server we can decide between changing the default \`start\` script to \`dev\` and run **serve** using \`start\` or we can define a new script called \`now-start\`.

This new script is going to be used by ${<Now color="#000"/>} to run our Node.js application instead of the usual \`start\` script, that way we can continue with the usual workflow of Create React App. And our \`now-start\` script can run the following line.

${<TerminalInput>serve --single ./build</TerminalInput>}

The \`--single\` (or just \`-s\`) option is going to tell **serve** to run the HTTP server to support a Single Page Application, this means every request which can't be resolved to a static file is going to resolve with the \`index.html\` so we can handle routing client side.

The \`./build\` path is going to define which directory we want our HTTP server to actually serve.

After this the \`package.json\` must looks like this (for a default Create React App project):

${
  <Code>{`{
  "name": "project-name",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-scripts": "1.0.13",
    "serve": "^6.0.6"
  },
  "scripts": {
    "start": "react-scripts start",
    "now-start": "serve --single ./build",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}`}</Code>
}

## Deploying the application
Once we did that we can deploy our application with the following command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created Single Page Application then is going to run \`npm run build\` to build our application code (_we don't need to do build in our local machine_) and after that start our HTTP server with \`npm run now-start\`.

But in the case of a real application (not used for testing purposes), you would now have to ${<InternalLink href="/docs/features/aliases">assign an alias</InternalLink>} to it.
`)
