import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import { AnchorLink, InternalLink } from '../../../components/text/link'
import { P } from '../../../components/text/paragraph'

// prettier-ignore
export default withDoc({
  title: 'Building a Basic GraphQL Application',
  date: '01 March 2017',
  authors: [leo],
  editUrl: 'pages/docs/examples/graphql.js',
})(markdown(components)`

Since Facebook released their [GraphQL](http://graphql.org/) technology back in 2015, it has evolved into a wonderful query language perfectly suited for all kinds of today's API endpoints. Why?

* Comes with a much more definite way of describing the data passed through your API.
* Allows the client to fetch many resources in a single request, rather than forcing it to send multiple ones to different endpoints.
* Built from the ground up so that only data requested by the client is sent back. This makes [GraphQL](http://graphql.org/) apps react quickly even on slow mobile network connections.

Because of these advantages, it's a great alternative to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).

Convinced? Then let's create a application that fetches data from a [GraphQL](http://graphql.org/) endpoint!

## Requirements

Before we get started, please make sure that your instance of Node is up-to-date. You should have the latest "Current" release (compare it with [this](https://nodejs.org/)). If it's not, click on the download button on the site and get yourself the newest version.

You can use this command to check the version tag of your local instance:

${<TerminalInput>node -v</TerminalInput>}

Once the output of the command matches the latest version on the site, go on to the next section.

## Building the API

Let's start with creating a new empty directory and moving into it:

${
  <TerminalInput>
    {`mkdir graphql-api\ncd graphql-api`}
  </TerminalInput>
}

Now let's create the project's \`package.json\` file inside that directory:

${
  <Code>
    {`{
  "name": "graphql-api",
  "scripts": {
    "start": "micro index.js"
  }
}`}
  </Code>
}

The code above tells ${<Now color="#000" />} the name of the project ("graphql-api") and also to execute the \`index.js\` file (using [micro](https://github.com/zeit/micro), which we'll install in the next paragraph) when the \`npm start\` command is run in your terminal or on the server.

Next, we need to install a few packages:

* [micro](https://github.com/zeit/micro) (a library of ours - makes building a [microservice](https://zeit.co/docs/examples/json-api) a breeze)
* [express-graphql](https://github.com/graphql/express-graphql) and [graphql](https://www.npmjs.com/package/graphql) (add support for the query language)
* [micro-cors](https://www.npmjs.com/package/micro-cors) (responsible for setting the correct CORS headers for every response)

Run this command in your terminal to install them using [npm](https://www.npmjs.com/):

${
  <TerminalInput>
    npm install --save graphql micro micro-cors express-graphql
  </TerminalInput>
}

Now we need to create the \`index.js\` file and populate it with content. As the first step, load the packages:

${
  <Code>
    {`const {buildSchema} = require('graphql')
const server = require('express-graphql')
const CORS = require('micro-cors')()`}
  </Code>
}

Then define the type of data provided by the API. In our case, we'll only respond with a single key named \`hello\`, holding a "Hello world" message. In turn, it will be of type \`String\`:

${
  <Code>
    {`const schema = buildSchema(\`
  type Query {
    hello: String
  }
\`)`}
  </Code>
}

And now the value for each key of the response:

${
  <Code>
    {`const rootValue = {
  hello: () => 'Hello world'
}`}
  </Code>
}

As the last line of code in the file, you need to call \`express-graphql\`, wrap it with \`micro-cors\` and export it:

${
  <Code>
    {`module.exports = CORS(server({ schema, rootValue }))`}
  </Code>
}

Now you should be able to run \`npm start\` inside the directory containing the API and you should be handed a URL which will show the following when opened in a browser window:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/graphql/api.png`}
    width="550"
    height="307"
  />
}

On the first glance, it looks like an error. Well... It actually is one.

But in our case, it's a sign that you've managed to set up the code for the GraphQL API properly. Why? Because it indicates that the endpoint is able to accept data (the error comes directly from \`express-graphql\`).

## Deploying the API

After we've finished building the API endpoint, we need to deploy it. Simply run this command in your terminal:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created API. We'll use this address later in the application and load some data from it.

But in the case of a real API (not used for testing purposes), you would now have to ${<InternalLink href="/docs/features/aliases">assign an alias</InternalLink>} to it.

## Building the Client

Now that we have the deployment for the API endpoint in place, we need to build an application that loads the data from there and shows it to the visitor. As a framework, we'll use [create-react-app](https://github.com/facebookincubator/create-react-app), a neat way of building [React](http://reactjs.com/) apps.

Creating the project's file structure is as easy as running this command (the directory will be called "graphql-client"):

${<TerminalInput>create-react-app graphql-client</TerminalInput>}

Then you can start the development server by running this command:

${<TerminalInput>npm start</TerminalInput>}

This works because inside the \`package.json\` file, there's a script property named \`start\` defined that executes the \`react-scripts\` start command when run in the terminal or on the server.

### Installing "react-apollo"

In order to make the application capable of loading data using [GraphQL](http://graphql.org/), we need to firstly install [react-apollo](https://www.npmjs.com/package/react-apollo), a package that provides all of the tools necessary for interacting with a [GraphQL](http://graphql.org/) API using [React](http://reactjs.com/).

To install it, run this [command](https://docs.npmjs.com/cli/install) in a separate terminal tab (please ensure that you're inside the "graphq-client" directory):

${
  <TerminalInput>
    npm install --save react-apollo
  </TerminalInput>
}

### Adding the Communicating Interface

Once all of them have finished installing, open the \`index.js\` file inside the \`src\` directory. Now remove all the code and start fresh with loading all packages (including React) and the built-in \`<App/>\` component:

${
  <Code>
    {`import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

import App from './App'`}
  </Code>
}

Continue with creating an instance of \`ApolloClient\` and pointing it to your GraphQL server created earlier:

${
  <Code>
    {`const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: `}
    <P.B>'REPLACE_THIS_WITH_YOUR_API_URL'</P.B>
    {` })
})`}
  </Code>
}

As the next step, we need to connect your client instance to the component tree. This can be done using the \`ApolloProvider\` component. Generally, it should be placed somewhere high in your view hierarchy, above all places where you need to access data.

In our case, we only have one existing component (\`<App/>\`, which was already there when we generated the application). In turn, we only need to wrap this one with the \`ApolloProvider\` component:

${
  <Code>
    {`ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
)`}
  </Code>
}

### Loading Data from the GraphQL Server

Now that the interface for communicating with the API endpoint is in place, the only thing left for displaying the "Hello World" example is telling the client exactly which data to request.

Open the \`App.js\` file inside the \`src\` directory, remove its content and start with loading all packages required:

${
  <Code>
    {`import React from 'react'
import { gql, graphql } from 'react-apollo'
`}
  </Code>
}

Next, use \`gql\` to create the data query and assign it to a constant. This will tell \`react-apollo\` to only load the \`hello\` property (which we've defined earlier while [writing the GraphQL API](https://zeit.co/docs/examples/graphql#building-the-api)):

${
  <Code>
    {'const myQuery = gql`{ hello }`'}
  </Code>
}

Now we only need to create the \`<App/>\` component. Let's just render a heading with the data from the API inside it:

${
  <Code>
    {`class App extends React.Component {
  render() {
    return <h1>{this.props.data.hello}</h1>
  }
}`}
  </Code>
}

Because we want to use it inside the \`index.js\` file (we already loaded it there), we need to export it now. But to receive the data using the \`react-apollo\` package, we also need to wrap the component into the \`graphql()\` helper and pass the query to it:

${
  <Code>
    {`export default graphql(myQuery)(App)`}
  </Code>
}

That's all for building the client!

You should now be able to access the app on the address you saw in the terminal while running the \`npm start\` command ${<AnchorLink href="#building-the-client">earlier</AnchorLink>}. By default, it should be the following one: <http://localhost:3000>.

In the browser, the client should look like this:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/graphql/client.png`}
    width="550"
    height="307"
  />
}

## Deploying the Client

Pat yourself on the shoulder! You've managed to build your first GraphQL API, deploy it and even create a client that pulls data from it. Isn't that cool? Absolutely!

So guess what's next! Now we'll make the client accessible from all over the world as well.

But before we can do that, we need to prepare it by installing a tiny tool of ours (named [serve](https://github.com/zeit/serve)). Because \`create-react-app\` doesn't come with a built-in webserver that can be used in production, you need to provide your own. So let's install [serve](https://github.com/zeit/serve) by running this command in the terminal (inside the "graphql-client" directory):

${<TerminalInput>npm install --save serve</TerminalInput>}

Then you need to add the \`now-start\` property to your \`package.json\` file. The command specified inside it will be run on now when the deployment is about to start.

${
  <Code>
    {`"scripts": {
  ...
  "now-start": "serve -s ./build"
}`}
  </Code>
}

Now you can do the same you did for the API. Deploy the client by running this command:

${<TerminalInput>now</TerminalInput>}

Open the URL provided by ${<Now color="#000" />} and you should see the "Hello world!" example again. This means that you did everything right and your first GraphQL application is online. Well done!
`)
