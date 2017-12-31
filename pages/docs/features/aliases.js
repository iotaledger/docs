import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { P } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import { InlineCode } from '../../../components/text/code'
import {
  TerminalInput,
  TerminalOutput,
  TerminalLink
} from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Aliases and Domains',
  date: '21 Feb 2017',
  authors: [rauchg],
})(markdown(components)`

This guide covers how to assign two types of domains to your ${<Now color="#000" />} deployments.

1. Subdomains under \`.now.sh\` (for example https://hello.now.sh)
2. Entirely custom domains (for example https://your-company.com)

## Aliasing Basics

Whenever you deploy to ${<Now color="#000" />}, the URL you get in return looks something like:

${
  <TerminalOutput>
    https://<P.B>get-started-basic</P.B>-<P.B>etjnigdrkz</P.B>.now.sh
  </TerminalOutput>
}

We can split the above URL into few parts:

* **https://** -Every single deployment is automatically served under HTTP/2 with SSL. Certificates are automatically provisioned.
* **get-started-basic**	- The application's name. You can customize it upon deployment (for example with the name field in package.json for Node.js deployments or LABEL in Dockerfile for Docker ones.
* **etjnigdrkz** -	A cryptographically-strong random string that makes your URL virtually impossible to guess, while retaining a reasonable length for sharing it with your co-workers or clients.
* **.now.sh** -	All your deployments end in .now.sh by default. Aliases allow you to point them to custom domains.

These URLs are ideal for development and staging, but not ideal for end users.

${<Now color="#000" />} aliases have two purposes:

1. Giving your deployment a friendly and memorable name.
2. Updating deployments with **zero downtime**.

## Creating Aliases

Aliases are managed by invoking the command \`now alias\`, which has the following syntax:

${
  <TerminalInput>
    now alias &lt;SOURCE URL | ID&gt; &lt;TARGET SUBDOMAIN | DOMAIN&gt;
  </TerminalInput>
}

For example, let's say you want \`https://get-started-basic-etjnigdrkz.now.sh\` to be accessible by the alias \`get-started-basic.now.sh\`.

All you have to do is run:

${
  <TerminalInput>
    now alias https://get-started-basic-etjnigdrkz.now.sh{' '}
    <P.B>get-started-basic</P.B>
  </TerminalInput>
}

${
  <TerminalOutput>
    <span className="cyan">&gt; Success!</span>
    {` Alias created `}
    <span className="gray">(CIyk6IKL8MIHzAqrmcxbM8kf)</span>
    {`:
`}
    <TerminalLink href="https://get-started-basic.now.sh">
      https://get-started-basic.now.sh
    </TerminalLink>
    {` now points to `}
    <TerminalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </TerminalLink>
    {` `}
    <span className="gray">(xpvB6GZWMR6Q9Oxe3c64Htgq)</span>
    {` [copied to clipboard]`}
  </TerminalOutput>
}

After this successful message, your deployment is instantly available via its original URL and the new alias you gave it:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/aliases/alias-dest.png`}
    width="682"
    height="468"
    caption={
      <span>
        The URL <InlineCode>get-started-basic.now.sh</InlineCode> now works!
      </span>
    }
  />
}

Notice that we omitted \`.now.sh\` at the end of the target subdomain. When one is not given, we default to \`now.sh\`.

As seen in the output, each alias receives a unique identifier. In the example above, it's \`xpvB6GZWMR6Q9Oxe3c64Htgq\`.

It's usually known as the **deployment ID**, which is also accessible when you list your deployments with \`now ls\`. It can be used in substitution of the URL when running \`now alias\`:

${
  <TerminalInput>
    now alias <P.B>xpvB6GZWMR6Q9Oxe3c64Htgq</P.B> get-started-basic
  </TerminalInput>
}

For convenience, we parse the URLs you supply as parameters to \`now alias\` to extract the hostname, which means the following are all valid **source URLs**:

* Just the hostname: \`get-started-basic-etjnigdrkz.now.sh\`
* Including http(s): \`http://get-started-basic-etjnigdrkz.now.sh\`
* Including /: \`https://get-started-basic-etjnigdrkz.now.sh/\`

## Custom Domains

The same mechanism we explained above can be used to configure an **custom domain**.

The command is almost exactly the same:

${
  <TerminalInput>
    now alias https://get-started-basic-etjnigdrkz.now.sh your-company.com
  </TerminalInput>
}

If \`your-company.com\` is available to buy, ${<Now color="#000" />} will allow you to buy it directly from the command line, which is the only step you need to do. ${<Now color="#000" />} will take care of all the domain configuration.

Otherwise, you need to [configure](/docs/getting-started/assign-a-domain-name) the domain name for ${<Now color="#000" />}. You can either use our [global DNS service](/world) or add an \`ALIAS/CNAME\` record on your existing DNS solution.

Refer to this [guide](/docs/getting-started/assign-a-domain-name) for more information on domain configuration.

## Security Considerations

We ensure that **your domains are fully protected and only you can alias to them**.

When you add an alias to a certain domain name, we first verify its ownership. If it's not been claimed by anyone, we associate it with your account.

After executing the \`alias\` above, just run \`now domains ls\` to see all the domains in your account:

${<TerminalInput>now domains ls</TerminalInput>}

${
  <TerminalOutput>
    {`> 2 domains found [214ms]
`}<span className="gray">
      {`
            id  dns         url                       verified  created`}
    </span>{`
zXBxQLQYidDddAb2l6db26Cb  zeit.world  `}
    <TerminalLink href="https://your-company.com">
      https://your-company.com
    </TerminalLink>
    {`        true      `}
    <span className="gray">11m ago</span>
    {`
WAZjIaxvaiieNUqJc22PJUKG  external    `}
    <TerminalLink href="https://hyper.is">
      https://zeit.run
    </TerminalLink>
    {`          true      `}
    <span className="gray">20m ago</span>
  </TerminalOutput>
}

As you can see, there are two types of domains:

* **external**: the domain is associated with a third-party nameserver provider like DNSimple.
* **zeit.world**: the domain is hosted with ${<InternalLink href="/world">zeit.world</InternalLink>} and \`now alias\` automatically sets up records.

Once a domain appears under \`now domains ls\`, **only you can point aliases to it** until you remove it from your account.
`)
