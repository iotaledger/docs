import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg, leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { P } from '../../../components/text/paragraph'
import { Code } from '../../../components/text/code'

// prettier-ignore
export default withDoc({
  title: 'Configuring now',
  date: '22 Feb 2017',
  authors: [rauchg, leo],
})(markdown(components)`

This guide explains how to use these methods to configure and customize the default behavior of your now deployments.

In addition to the options available in the command line interface (like \`--name\` for setting then name of the deployment), we also support saving certain parameters into a config file of your choice.

## Files

At the moment of writing this, we support for files that can contain the configuration for your project. Both should be located in the root directory of your project and called as mentioned below.

Please note that it's not possible to add both files to a project. You need to choose between the two ones shown below. If both exist in the same directory, you'll be asked to remove one.

For [Node.js](https://nodejs.org/) projects, we recommend using package.json, while now.json can be used for [Docker](https://www.docker.com/) or static deployments.

### package.json

If you have a JavaScript-based project (like a Node.js server or a frontend with a \`build\` script), you are already using \`package.json\`.

As a convenience, we allow for settings to be defined within the \`now\` namespace inside the file. For example, let's say you wanted to always alias a deployment to \`cool.now.sh\` upon deployment. Your \`package.json\` would look as follows:

${
  <Code>
    {`{
  "name": "my-node-project",
  "dependencies": {
    "micro": "latest"
  },`}<P.B>
        {`
  "now": {
    "alias": "cool"
  },`}
      </P.B>{`
  "scripts": {
    "start": "micro"
  }
}`}
  </Code>
}

For a list of all available options, refer to the "Settings" section below.

### now.json

For every type of deployment, including \`package.json\` ones, you can create a \`now.json\` file that contains your deployment's configuration.

For example, consider a static deployment with some \`.html\` files in a directory called \`my-website\`.

Since no configuration is supplied, the deployment's name is obtained from the directory. To customize this, you can create a \`now.json\` file inside it as follows:

${
  <Code>
    {`{
  "name": "my-new-name"
}`}
  </Code>
}

For a list of all available options, refer to the "Settings" section below.

## Settings

All of the properties mentioned below can be used both in the \`package.json\` and inside the \`now.json\` file:

### "name" (string)

The prefix for all new deployment instances. The CLI usually generates this field automatically based on the name of the directory. But if you'd like to define it explicitly, this is the way to go.

${<Code>{`"name": "zeit-chat"`}</Code>}

### "alias" (string|array)

Aliases which will be assigned to the latest deployment when running \`now alias\` (with no arguments).

${
  <Code>
    {`"alias": "zeit.chat"

"alias": [
  "zeit.chat"
]`}
  </Code>
}

### "env" (object)

A list of environment variables to be set on each new deployment instance.

${
  <Code>
    {`"env": {
  "DATABASE_NAME": "test"
}`}
  </Code>
}

### "dotenv" (boolean|string)

Read environment variables from [dotenv](https://github.com/motdotla/dotenv) file.

${
  <Code>
    {`"dotenv": true

"dotenv": ".env.production"`}
  </Code>
}

### "files" (array)

A list of files and directories to be force-uploaded to the deployment (even if they're ignored by \`.gitignore\`).

${
  <Code>
    {`"files": [
  "hello.png",
  "dist"
]`}
  </Code>
}

### "type" (string)

A field for specifying the deployment type ("npm" or "docker") if both \`package.json\` and \`Dockerfile\` exist. This will prevent \`now\` from asking you to choose the type in these cases.

${<Code>{`"type": "npm"`}</Code>}

### "forwardNpm" (boolean)

Automatically forward the npm login information to our servers to install [private npm packages](https://www.npmjs.com/features).

${<Code>{`"forwardNpm": true`}</Code>}

### "public" (boolean)

Controls if \`_src\` should be available or not. By default, this property is set to \`true\` if your account is using the OSS plan and \`false\` if the Premium plan is in use.

${<Code>{`"public": true`}</Code>}

### "engines" (object)

In general, we recommend letting us choose the version, because it ensures that you always take advantage of the latest features, performance improvements and bug fixes.

By default, all new deployments will come with the [latest stable version](https://nodejs.org/en/download/current/) of Node.js

If you need a specific Node.js version we allow you to define the version (semver syntax) of [Node.js](https://nodejs.org/en/) you want to run on the server:

For an example, this is how to use the latest version of Node.js 6 inside ${<Now color="#000" />}.

${
  <Code>
    {`"engines": {
  "node": "^6.0.0"
}`}
  </Code>
}


`)
