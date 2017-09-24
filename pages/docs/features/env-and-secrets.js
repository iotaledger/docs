import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { P } from '../../../components/text/paragraph'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Environment Variables and Secrets',
  date: '21 Feb 2017',
  authors: [leo],
})(markdown(components)`


If there's information or certain behaviour of your project that needs to differ depending on if it's running locally or on now, environment variables are the perfect solution.

Not only do they avoid having to hardcode these settings (which is very important for sensitive information, which can't just be version-controlled), but they also allow you to access information about the current environment your code is running in.

There are various ways to define environment variables. Now you'll learn what's the right one for you.

## \`e\` Option

The first one is simply specifying them using the \`-e\` option. Assuming that you'd like to add an environment variable named "DATABASE_NAME" and give it a value of "test", this is how the command should look like:

${<TerminalInput>now -e DATABASE_NAME="test"</TerminalInput>}

This will deploy the project within the current directory and assign the environment variable. In the code, you can then access it like this:

${<Code>process.env.<P.B>DATABASE_NAME</P.B></Code>}

And just like defined before, the content of this global variable will be "test".

## Config Files

The second way of defining environment variables is made specifically for the cases in which the content of the variables you'd like to define will stay the same for every new deployment.

If that fits your project, simply add the ${<InternalLink href="/docs/features/configuration#`env`-(object)">env property</InternalLink>} to your \`now.json\` file or to the \`now\` property inside \`package.json\`:

${
  <Code>
    {`"env": {
  "DATABASE_NAME": "test"
}`}
  </Code>
}

As you may have already noticed it, this property holds an object which can contain as many environment variables as you want it to. And again, this will assign an environment variable called "DATABASE_NAME" with a value of "test" to your deployments.

## \`--dotenv\` Option

This option will allow you to use a [dotenv](https://github.com/motdotla/dotenv) environment config file. It will be parsed and turned into -e automatically. Here's an example .env file:

${
  <Code>
    MY_VARIABLE=example
  </Code>
}

Optionally you can provide a file to read. \`--dotenv=.env.production\` will read the \`.env.production\` file instead of \`.env\`. You can configure this option using \`now.json\` too. By adding the "dotenv" key with a value of \`true\` or the file name to use. An example is provided ${<InternalLink href="/docs/features/configuration#`dotenv`-(boolean|string)">here</InternalLink>}.

## Securing Env Variables Using Secrets

Sometimes you need to store sensitive information on the deployment that should only be accessible by the code that's running in it. This can be accomplished using \`now secret\`, which allows you to store such data needed by your apps to function (such as API tokens or passwords) in a secure way.

Once you store a secret, its contents are no longer accessible directly by anyone. They can only be exposed to deployments as environment variables, which we'll show below.
Let's create a secret with an API key:

${
  <TerminalInput>
    <P.B>now secret add</P.B> acme-api-key my-value-here
  </TerminalInput>
}

Once it's created, you can rename it with \`now secret rename\` or delete it completely with \`now secret rm\`. For more examples and the full list of options and commands, run \`now help secret\`.

Afterwards, you can assign the secret to an environment variable. Here's an example of doing this using a command:

${
  <TerminalInput>
    now -e <P.B>MY_VARIABLE=@acme-api-key</P.B>
  </TerminalInput>
}

And here's how it should look when using the \`env\` configuration property:

${
  <Code>
    {`"env": {
  "MY_VARIABLE": "@acme-api-key"
}`}
  </Code>
}

Both of the solutions mentioned above will create an environment variable called "MY_VARIABLE" and assign the content of the "acme-api-key" secret to it (which is "my-value-here").

## Tips & Tricks

We implemented some sweet functionalities into the command line interface and the platform, which make adding environment variables and secrets to your deployment even easier.

For example, you can also include \`-e\` multiple times:

${
  <TerminalInput>
    now
    {' '}
    <P.B>-e</P.B>
    {' '}
    API_KEY=@my-key
    {' '}
    <P.B>-e</P.B>
    {' '}
    APP_NAME="ZEIT, Inc"
  </TerminalInput>
}

And we also have the capability to inherit from your shell's environment. To do so, just skip the \`=value\` part:

${
  <TerminalInput>now -e <P.B>MY_SHELL_VAR</P.B></TerminalInput>
}

How about other programming languages? The same mechanism applies to any project with a \`Dockerfile\`. The variables you include will be available to your \`RUN\` and \`CMD\` instructions.

You can even prevent ${<InternalLink href="/docs/deployment-types/node#ignoring-[object-object]">prevent</InternalLink>} \`devDependencies\` from being installed using a environment variable!

Finally, our ${<InternalLink href="/api">API</InternalLink>} users will find the new /now/secrets REST endpoints useful.

## Default Variables

By default, all deployments expose these environment variables:

* **NOW**: Set to \`true\`, for detecting ${<Now color="#000"/>}.
* **NOW_URL**: Contains the unique URL of your deployment. Even if you deployment was aliased, this variable will always contain the URL with the \`.now.sh\` suffix.
`)
