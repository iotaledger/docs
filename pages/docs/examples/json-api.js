import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { P } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Building a Basic JSON API',
  date: '20 Feb 2017',
  authors: [leo],
  editUrl: 'pages/docs/examples/json-api.js',
})(markdown(components)`

Nowadays, every properly built application requires at least one API endpoint where it can load data from.

There are various ways to build one of these APIs. But for this example, I'm going to show you the most effective one using a tiny tool named [micro](https://github.com/zeit/micro), which we built specifically for this purpose.

## Setup

Before diving into building the microservice, please make sure that your instance of [Node](https://nodejs.org/) is up-to-date (at least version 6). Assuming that it's the case, continue with creating a directory and switch to it. Run this in your terminal:

${<TerminalInput>{`mkdir json-api\ncd json-api`}</TerminalInput>}

Now let's create the project's files inside that directory. Start over with creating a \`package.json\`:

${
  <Code>
    {`{
  "name": "json-api",
  "scripts": {
    "start": "micro"
  },
  "dependencies": {
    "micro": "latest"
  }
}`}
  </Code>
}

As you can see, this file now contains three properties:

* \`name\` tells ${<Now color="#000" />} the name of the deployment
* \`scripts\` will make the micro command run when starting the deployment
* \`dependencies\` tells Node.js to download the latest version micro

Next, install micro (the only dependency) by running npm's [install command](https://docs.npmjs.com/cli/install):

${<TerminalInput>npm install</TerminalInput>}

## Creating the Service

Once the command has finished running, you'll see a directory named \`node_modules\` containing your dependencies. Now that you've installed everything required, you can populate the source files with code.

By default, \`micro\` will expect a \`index.js\` file to exist in your project's directory. However, if you want to run a different file, that's [also possible](https://github.com/zeit/micro#example). But for this example, we'll go with the default behaviour:

${
  <Code>
    {`module.exports = () => ({
  date: new Date
})`}
  </Code>
}

The exported arrow function shown above simply returns an object with the current date. And thanks to \`micro\` providing the functionality of a web server, you only need to run the \`start\` script contained within your \`package.json\` file:

${
  <TerminalInput>npm start</TerminalInput>
}

BOOM! The service will start running and you'll see a message like this one showing that \`micro\` started exposing the code you wrote on the default port **3000**:

${
  <TerminalOutput>
    &gt; Ready! Listening on <P.B>http://0.0.0.0:3000</P.B>
  </TerminalOutput>
}

Go to the URL returned (\`http://0.0.0.0:3000\`) and you should see something like this:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/json-api/date.png`}
    width="550"
    height="279"
  />
}

## Retrieving and Sending Data

That's great, isn't it? But we're not quite there yet! The next step is to take advantage of **async** and **await** by loading real data once the request comes in (then we'll send it back as the response).

As example, we're going to retrieve the list of public members inside our [GitHub organization](https://github.com/zeit) using their [API](https://developer.github.com/v3/orgs/members/).

In order to get there, the first thing we need to do is install [node-fetch](https://github.com/bitinn/node-fetch), a package that allows us to easily load data from an API endpoint and now that we already have a \`package.json\` in place, this only requires a command:

${<TerminalInput>npm install --save node-fetch</TerminalInput>}

You'll notice that the package got added to your \`dependencies\` list. We achieved this by taking advantage of the \`--save\` option. Now the property should look **similar** to this:

${
  <Code>
    {`"dependencies": {
  "micro": "latest",
  "node-fetch": "^1.6.3"
}`}
  </Code>
}

Done? Perfect! Then let's get over to updating \`index.js\`. First, we need to load [node-fetch](https://github.com/bitinn/node-fetch):

${<Code>{`const fetch = require('node-fetch')`}</Code>}

Next, prepend the new \`async\` keyword (which allows us run asynchronous code inside it) to the exported function, use \`fetch()\` with GitHub's [endpoint URL](https://api.github.com/orgs/zeit/members), assign it to a constant and then parse the JSON in the response using the \`.json()\` method.

Once that's done, you only need to return the parsed JSON data. All in all, it should look like this:

${
  <Code>
    {`module.exports = async () => {
  const request = await fetch('https://api.github.com/orgs/zeit/members')
  const data = await request.json()

  return data
}`}
  </Code>
}

Now save the file and run it the service again (if it's still running, stop it using \`ctrl + c\` before starting it again):

${<TerminalInput>npm start</TerminalInput>}

Assuming that you've followed this post to this point, you should now see able to open \`http://0.0.0.0:3000\` in your browser and see a list of all public members of the [ZEIT organization](https://github.com/zeit) on GitHub:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/json-api/members.png`}
    width="600"
    height="373"
  />
}

## Deploying the Service

Now that the JSON API works locally, we can deploy it by running this command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your API microservice. This means that you can already use this URL in a testing application and load the data into it.

But in the case of a real microservice, you would now have to ${<InternalLink href="/docs/features/aliases">assign an alias</InternalLink>} to it.
`)
