import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'
import { P } from '../../../components/text/paragraph'

// prettier-ignore
export default withDoc({
  title: 'Deploying Git Repositories',
  date: '12 Mar 2017',
  authors: [leo],
  editUrl: 'pages/docs/features/repositories.js',
})(markdown(components)`

If you're developing a project that requires local changes before it can be deployed (like a regular application), running just now is the right way to move your code into the cloud.

However, if you'd like to provide a pre-built application or tool which only needs to be configured slightly to fit the needs of the end user, we have another great feature for you:

${<TerminalInput>{'now <username>/<repository>'}</TerminalInput>}

When running this command for a certain [Git](https://git-scm.com/) repository of your choice (make sure to replace \`<username>\` and \`<repository>\`), the repository will be looked up on [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/) and [BitBucket](https://bitbucket.org/). When found, ${<Now color="#000" />} will automatically clone it, set any custom properties you've defined and deploy it.

From there on, it will work just like any other deployment: You'll get a unique URL once the files have started uploading, your deployment will be initialized and then started up as usual.

## Configuring Such a Deployment

Thanks to the process I've explained earlier, configuring the deployment of a Git repository is just as easy as doing the same for one that's not being handled automatically by ${<Now color="#000" />} in the hidden.

If you want, you can either use \`now.json\` or the \`now\` property inside \`package.json\` within your repository for customizing the deployments. But please note that these settings can't be interfered with by the user. They're fixed.

For the cases in which the user needs to specify his own settings, ${<InternalLink href="/docs/features/env-and-secrets">environment variables</InternalLink>} can be used.

When deploying [rauchg](https://twitter.com/rauchg)'s [slackin](https://github.com/now-examples/slackin) project, for example, you somehow need to define the API token and subdomain of your Slack team. And that's exactly where ${<InternalLink href="/docs/features/env-and-secrets">environment variables</InternalLink>} come in really nicely:

${
  <TerminalInput>
    {
      'now -e SLACK_API_TOKEN="23uhc87" -e SLACK_SUBDOMAIN="socketio" now-examples/slackin'
    }
  </TerminalInput>
}

This will deploy the [now-examples/slackin](https://github.com/now-examples/slackin) repository and set the environment variables \`SLACK_API_TOKEN\` (containing the API token) and \`SLACK_SUBDOMAIN\` (holding the subdomain of your team).

That's it!

Once ${<Now color="#000" />} fetches the repository, you'll see just what you're used to: A link to the deployment, the repository will be deployed and the logs will be printed out. Once the repo has finished uploading, you'll see the invitation page:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/git-repositories/slackin.png`}
    width="550"
    height="420"
  />
}

## Selecting a Git Reference

Since there might be cases in which you'd like to choose a certain branch or commit containing a special change you'd like to share with other people (or see how it works in production mode), we've made it very easy to select a git reference of your choice.

Simply append a \`#\` followed by the name of the branch or the commit. Assuming that you'd like to deploy the branch "v2", this is how the command will look like:

${<TerminalInput>now rauchg/slackin<P.B>#v2</P.B></TerminalInput>}

And it works just as easy for commits. Just append the SHA:

${<TerminalInput>now rauchg/slackin<P.B>#e0f09a5</P.B></TerminalInput>}

By default, ${<Now color="#000" />} will select the master branch. However, as you can see, it only requires a single statement to change this!

## Using URLs

All of the things mentioned above can also be achieved by simply telling ${<Now color="#000" />} the URL of the repository which you'd like to deploy (also supports GitLab and BitBucket):

${
  <TerminalInput>
    now <P.B>https://github.com/rauchg/slackin</P.B>
  </TerminalInput>
}

This also means that you can easily point to commits:

${
  <TerminalInput>
    now <P.B>https://github.com/rauchg/slackin/commit/20ae6d3</P.B>
  </TerminalInput>
}

...or even branches:

${
  <TerminalInput>
    now <P.B>https://github.com/rauchg/slackin/tree/master</P.B>
  </TerminalInput>
}

## How It Works

* Behind the curtains, the command line interface (now) will firstly clone the repository to your local device (in a hidden directory).<br/><br/>
This ensures that even private repositories (or such that require a special form of authentication) will get cloned automatically without you having to specify any credentials. In addition, it's much more secure than cloning the code on the platform, because our system doesn't need to move any of your sensible authentication data to our servers.

* Afterwards, the regular mechanism for handling the upload of your files will be applied to the local directory that contains a clone of the repository you've defined before.
`)
