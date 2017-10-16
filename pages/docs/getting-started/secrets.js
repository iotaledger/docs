import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Secrets',
  date: '6 August 2017',
  authors: [arunoda],
})(markdown(components)`

If multiple people deploy your app or utilize a CI service, it's a better idea to use ${<InternalLink href="/docs/getting-started/environment-variables#via-“now.json”">now.json</InternalLink>} to expose environment variables. 

However, adding that file to [Git](https://en.wikipedia.org/wiki/Git) could cause potential issues. Secrets like API tokens and DB information are visible to anyone who has access to the source code. That's bad.

## Now Secrets

That's where ${<Now color="#000"/>} Secrets can help you. It's a configuration store that works across your account. Let's see how to use it:

First, add some secrets:

${<TerminalInput>{`now secrets add my-app-mongo-url "user:password@mydb.com"
now secrets add my-app-my-api-token "XXXXX"`}</TerminalInput>}

Then, you can get these values inside environment variables.<br/>
Here's how to do that with \`now.json\`:

${<Code>{`{
  "env": {
    "MONGO_URL": "@my-app-mongo-url",
    "MY_API_TOKEN": "@my-app-my-api-token"
  }
}`}</Code>}

That's it.

This \`now.json\` file no longer contains secret information and it's safe to add that to Git and share with anyone. Only the people who can deploy the app has access to these secrets.

## Operations

You can perform a few sets of operations with ${<Now color="#000"/>} Secrets, including adding, renaming and removing secrets. But you can't read secrets from the terminal.

> **WARNING**:
> <br/>
>Anyone who can deploy to ${<Now color="#000"/>} has access to these secrets. Disabling the ability to read secrets in the terminal is simply a barrier.
> <br/>
>A user can still deploy a simple app to dump these secrets.


You can get more information about ${<Now color="#000"/>} Secrets by running the following Help command:

${<TerminalInput>{`now secrets --help`}</TerminalInput>}

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/now-secrets/help.png`}
    width={650}
    height={509}
    caption="Help output of `now secrets`"
  />
}

## Secrets with New Lines

Sometimes, you need to add secrets which has new lines (or any other special characters) in them (eg: certificates). But you won't be able to add them by simply using \`now secrets add\`.

Instead, you can encode the secret into [Base64](https://en.wikipedia.org/wiki/Base64) before adding it. Here's how you could do that on Mac/Linux with a single command:

${<TerminalInput>{`now secrets add my-cert $(cat /path/to/cert | base64)`}</TerminalInput>}

Before you use the secret inside your app, you need to decode it. Here's how you could do it in a Node.js app.

${<Code>{`const cert = Buffer.from(certFromtheSecret, 'base64').toString()`}</Code>}

>Base64 is a simple encoding algorithm which is available everywhere.<br/>
> That's why we've used it. But it's okay to choose any text based encoding algorithm.

`)
