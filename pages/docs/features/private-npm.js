import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rase, leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'

// prettier-ignore
export default withDoc({
  title: 'Using Private npm Dependencies',
  date: '12 Mar 2017',
  authors: [rase, leo],
})(markdown(components)`

If your application is using projects with dependencies hosted in private npm scopes, you can deploy such with - true to our style - just one command (and a flag):

${<TerminalInput>now --forward-npm</TerminalInput>}

This command will forward your npm credentials during the build process to fetch the required modules. Here's a little video of this feature in action, using a scoped private module in \`package.json\`:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/private-npm/example.gif`}
    width="658"
    height="483"
  />
}

## Config Property

If want to forward your [npm](https://npmjs.com/) credentials every time you create a new deployment using now, you can set the \`forwardNpm\` property inside your global \`~/.now.json\` file to \`true\`:

${
  <Code>
    {`{
  "forwardNpm": true
}`}
  </Code>
}

You can read more about how to configure ${<Now color="#000" />} to your needs ${<InternalLink href="/docs/features/configuration">here</InternalLink>}.

## Why?

[npm](https://npmjs.com/) makes it so radically easy to manage your organization's code. Sharing lots of small modules that do one thing well can make your team vastly more productive and your code easier to maintain and iterate on.

To find out more about their plans visit [their website](https://npmjs.com/features).

We're committed to giving you the best experience when deploying as an individual or in a team, and we hope this feature enhances that.

## Enterprise Support

Neither the \`--forward-npm\` flag, nor the \`forwardNpm\` config property support npm's [enterprise plans](https://www.npmjs.com/enterprise) or packages hosted on a custom infrastructure at the moment. But don't worry, we're already working on it!
`)
