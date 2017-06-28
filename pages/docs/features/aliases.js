import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink, ExternalLink } from '../../../components/text/link'
import { P } from '../../../components/text/paragraph'
import Image from '../../../components/image'
import { InlineCode } from '../../../components/text/code'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Aliases and Custom Domains',
  date: '21 Feb 2017',
  authors: [rauchg],
})(markdown(components)`

This guide covers how to assign custom names to your ${<Now color="#000" />} deployments

* As custom subdomains under \`.now.sh\` (for example https://hello.now.sh)
* As entirely custom domains (for example https://your-company.com)

## Aliasing Basics

Whenever you deploy to ${<Now color="#000" />}, the URL you get in return looks like something like:

${
  <TerminalOutput>
    https://<P.B>get-started-basic</P.B>-<P.B>etjnigdrkz</P.B>.now.sh
  </TerminalOutput>
}

If we dissect that URL, we can see it's composed of a few parts:

* **https://** -Every single deployment is automatically served under HTTP/2 with SSL. Certificates are provisioned automatically.
* **get-started-basic**	- The application's name. You can customize it upon deployment (for example with the name field in package.json for Node.js deployments or LABEL in Dockerfile for Docker ones.
* **etjnigdrkz** -	A cryptographically-strong random string that makes your URL virtually impossible to guess, while retaining a reasonable length for sharing it with your co-workers or clients.
* **.now.sh2** -	All your deployments end in .now.sh by default. Aliases allow you to point them to custom domains.

These URLs area ideal for development and staging, but not ideal to share with the public.

${<Now color="#000" />} aliases have two purposes:

* Giving your deployment a friendly name that's more memorable.
* Upgrading a certain deployment to production, by supplanting the previous alias with **zero downtime**.

## Creating Aliases

Aliases are managed by invoking the command \`now alias\`, which has the following syntax:

${
  <TerminalInput>
    now alias &lt;SOURCE URL | ID&gt; &lt;TARGET SUBDOMAIN | DOMAIN&gt;
  </TerminalInput>
}

For example, let's say I want \`https://get-started-basic-etjnigdrkz.now.sh\` …

${
  <Image
    src={`${ASSETS_URL}/docs/aliases/alias-source.png`}
    width="682"
    height="467"
  />
}

… to be accessible by the alias \`get-started-basic.now.sh\`. All I have to do is run:

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
    <ExternalLink href="https://get-started-basic.now.sh">
      https://get-started-basic.now.sh
    </ExternalLink>
    {` now points to `}
    <ExternalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </ExternalLink>
    {` `}
    <span className="gray">(xpvB6GZWMR6Q9Oxe3c64Htgq)</span>
    {` [copied to clipboard]`}
  </TerminalOutput>
}

After this successful message, my deployment is instantly available via its original URL and the new alias I gave it:

${
  <Image
    src={`${ASSETS_URL}/docs/aliases/alias-dest.png`}
    width="682"
    height="468"
    caption={
      <span>
        The URL <InlineCode>get-started-now.sh</InlineCode> now works!
      </span>
    }
  />
}

Notice that I omitted \`.now.sh\` at the end of the target subdomain. When one is not given, we default to \`now.sh\`.

As seen in the output, each alias receives a unique identifier. In the example above, it's \`xpvB6GZWMR6Q9Oxe3c64Htgq\`. We'll cover this later in the **Managing Aliases** section.

The output also refers to the deployment ID, which is also accessible when you list your deployments with now ls. It can be used in substition of the URL when running \`now alias\`:

${
  <TerminalInput>
    now alias <P.B>xpvB6GZWMR6Q9Oxe3c64Htgq</P.B> get-started-basic
  </TerminalInput>
}

As a convenience, we parse the URLs you supply as parameters to \`now alias\` to extract the hostname, which means the following are all valid **source URLs**:

* Just the hostname: \`get-started-basic-etjnigdrkz.now.sh\`
* Including http(s): \`http://get-started-basic-etjnigdrkz.now.sh\`
* Including /: \`https://get-started-basic-etjnigdrkz.now.sh/\`

## Custom Domains

The same mechanism we explained above can be used to configure an **external domain**.

The command is almost exactly the same:

${
  <TerminalInput>
    now alias https://get-started-basic-etjnigdrkz.now.sh zeithq.com
  </TerminalInput>
}

I already registered the domain \`zeithq.com\`, so I'll go ahead and run that command.

${
  <TerminalOutput>
    {`> `}
    <P.B>
      <ExternalLink href="https://zeithq.com">
        zeithq.com
      </ExternalLink>
    </P.B>
    {` is a custom domain.`}<br />{`
> Verifying the DNS settings for `}
    <P.B>
      <ExternalLink href="https://zeithq.com">
        zeithq.com
      </ExternalLink>
    </P.B>
    {` (see `}
    <InternalLink href="/world" prefetch>
      https://zeit.world
    </InternalLink>
    {` for help)`}<br />{`
> Resolved IP: none`}<br />{`
> Nameservers: ns-cloud-d1.googledomains.com, ns-cloud-d2.googledomains.com, ns-cloud-d3.googledomains.com, ns-cloud-d4.googledomains.com`}
    <br />
    <span className="red">&gt; Error!</span>
    {` Please make sure that your nameservers point to`}
    {' '}
    <ExternalLink href="https://zeit.world">zeit.world</ExternalLink>
    {`.`}<br />{`
> Examples: (full list at `}
    <ExternalLink href="https://zeit.world">
      https://zeit.world
    </ExternalLink>
    {`)`}<br />{`
> `}
    <span className="gray">-</span>
    {` california.zeit.world    `}
    <span className="gray">173.255.215.107</span>
    {``}<br />{`
> `}
    <span className="gray">-</span>
    {` newark.zeit.world        `}
    <span className="gray">173.255.231.87</span>
    {``}<br />{`
> `}
    <span className="gray">-</span>
    {` london.zeit.world        `}
    <span className="gray">178.62.47.76</span>
    {``}<br />{`
> `}
    <span className="gray">-</span>
    {` singapore.zeit.world     `}
    <span className="gray">119.81.97.170</span>
    {``}<br />{`
> Alternatively, ensure it resolves to alias.zeit.co via `}
    <span className="gray">CNAME</span>
    {' '}/{' '}
    <span className="gray">ALIAS</span>
    {`.`}
  </TerminalOutput>
}

With ${<Now color="#000" />} there's no manual configuration of DNS records and domain zones. The only requirement is that you point your domain's nameservers to any of our ${<InternalLink href="/world">zeit.world</InternalLink>} hostnames.

In this case, my domain is registered with Google Domains, so I edit the nameservers there to look like this:

${
  <Image
    src={`${ASSETS_URL}/docs/aliases/nameservers-edit.png`}
    width="569"
    height="274"
    caption={
      <span>
        If you are using Google Domains, this is found under
        {' '}
        <InlineCode>My domains &gt; DNS</InlineCode>
      </span>
    }
  />
}
Upon re-running the command, we get:

${
  <TerminalOutput>
    {`> `}
    <ExternalLink href="https://zeithq.com">
      <P.B>zeithq.com</P.B>
    </ExternalLink>
    {` is a custom domain.`}<br />{`
> Verifying the DNS settings for `}
    <ExternalLink href="https://zeithq.com">
      <P.B>zeithq.com</P.B>
    </ExternalLink>
    {` (see `}
    <InternalLink href="/world">https://zeit.world</InternalLink>
    {` for help)`}<br />{`
> Detected `}
    <InternalLink href="/world">https://zeit.world</InternalLink>
    {` nameservers! Configuring records.`}<br />{`
> DNS Configured! Verifying propagation…`}<br />{`
> Verification OK!`}<br />{`
> Provisioning certificate for `}
    <ExternalLink href="https://zeithq.com">
      <P.B>zeithq.com</P.B>
    </ExternalLink>
    <br />
    <span className="cyan">&gt; Success!</span>
    {` Alias created `}
    <span className="gray">(04N40HL8XcvOe5cxcgNhomM0)</span>
    {': '}
    <ExternalLink href="https://zeithq.com">
      https://zeithq.com
    </ExternalLink>
    {` now points to `}
    <ExternalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </ExternalLink>
    {' '}
    <span className="gray">(VfsUPntrbhEzccjLU1zAI30Q)</span>
    {` [copied to clipboard]`}
  </TerminalOutput>
}

## Using CNAME and ALIAS

If you want to use a domain that's configured with a third party DNS system, you can still use \`now alias\`.

To do so, just create a **CNAME** or **ALIAS** record that points to \`alias.zeit.co\`.
For this example, I'll configure \`hello.zeit.run\` to point to the same deployment I used above, but using Google's nameservers.
First, I head to the DNS settings and add a \`CNAME\` record for the \`hello\` subdomain as follows:

${
  <Image
    src={`${ASSETS_URL}/docs/aliases/cname-add.png`}
    width="561"
    height="69"
    caption={
      <span>
        I added this record under
        {' '}
        <InlineCode>DNS &gt; Custom resource records</InlineCode>
      </span>
    }
  />
}

Next, I run \`now alias\`:

${
  <TerminalInput>
    now alias get-started-basic-etjnigdrkz.now.sh hello.zeit.run
  </TerminalInput>
}

${
  <TerminalOutput>
    {`> `}
    <a><P.B>hello.zeit.run</P.B></a>
    {` is a custom domain.`}
    <br />
    {`
> Verifying the DNS settings for `}<a><P.B>hello.zeit.run</P.B></a>{` (see `}
    <InternalLink href="/world">https://zeit.world</InternalLink>
    {` for help)`}<br />{`
`}
    <span className="red">&gt; Error!</span>
    {` Verification required: Please add the following TXT record on the external DNS server: _now.zeit.run: ed24d6ddc87ee58332ac358ae`}
  </TerminalOutput>
}

As you can see, as a security measure we require that you validate that you own this domain name. So I add an extra \`TXT\` record accordingly:

${
  <Image
    src={`${ASSETS_URL}/docs/aliases/txt-add.png`}
    width="561"
    height="63"
    caption={
      <span>
        Important! Notice the subdomain
        is
        {' '}
        <InlineCode>_now</InlineCode>
        {' '}
        and the record type
        {' '}
        {' '}
        <InlineCode>TXT</InlineCode>
        !
      </span>
    }
  />
}

${
  <TerminalOutput>
    {`> `}
    <ExternalLink href="https://hello.zeit.run">
      <P.B>hello.zeit.run</P.B>
    </ExternalLink>
    {` is a custom domain.`}<br />{`
> Verifying the DNS settings for `}<a><P.B>hello.zeit.run</P.B></a>{` (see `}
    <InternalLink href="/world">https://zeit.world</InternalLink>
    {` for help)`}<br />{`
> Verification `}<P.B>OK</P.B>{`!`}<br />{`
> Provisioning certificate for `}
    <ExternalLink href="https://hello.zeit.run">
      hello.zeit.run
    </ExternalLink>
    {``}<br />{`
> Success! Alias created (BucgEPj9TI4Pae3HzDQT3LAB):
`}
    <ExternalLink href="https://hello.zeit.run">
      https://hello.zeit.run
    </ExternalLink>
    {' '}now points to
    {' '}
    <ExternalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </ExternalLink>
    {' '}(VfsUPntybhEzccjLU1zAI30Q) [copied to clipboard]
  </TerminalOutput>
}

## Security Considerations

We ensure that **your domains are fully protected and only you can add aliases to them**.

When you add an alias to a certain domain name, we first verify its ownership. If it's not been claimed by anyone, we associate it with your account.

After I executed the \`alias\` above, I can run \`now domains ls\` to see my domains:

${<TerminalInput>now domains ls</TerminalInput>}

${
  <TerminalOutput>
    {`> 2 domains found [214ms]
`}<span className="gray">
      {`
            id  dns         url                       verified  created`}
    </span>{`
zXBxQLQYidDddAb2l6db26Cb  zeit.world  `}
    <ExternalLink href="https://zeithq.com">
      https://zeithq.com
    </ExternalLink>
    {`        true      `}
    <span className="gray">11m ago</span>
    {`
WAZjIaxvaiieNUqJc22PJUKG  external    `}
    <ExternalLink href="https://hyper.is">
      https://zeit.run
    </ExternalLink>
    {`          true      `}
    <span className="gray">20m ago</span>
  </TerminalOutput>
}

As you can see, there are two types of domains:

* **external**: the domain is associated with a third-party nameserver provider like DNSimple.
* **zeit.world**: the domain is hosted with ${<InternalLink href="/world">zeit.world</InternalLink>} and \`now alias\` automatically sets up records.

Once a domain appears under \`now domains ls\`, it means that **only you can point aliases to them**. For **external** domains this requires verification. For **zeit.world**, make sure to add an alias to the domain or run \`now domain add\` as soon as possible.
`)
