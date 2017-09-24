import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { hbp, leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'
import Image from '../../../components/image'

// prettier-ignore
export default withDoc({
  title: 'Using Custom Domains & DNS Setup',
  date: '15 Mar 2017',
  authors: [hbp, leo],
})(markdown(components)`

When deploying a project to ${<Now color="#000" />} you'll always get a unique subdomain provisioned for your deployment. This makes it very easy to iterate on code and share the changes made with other people quickly.

This is how such a URL could look like:

${<TerminalOutput>https://my-app-qbncycxjue.now.sh</TerminalOutput>}

Each time you deploy again, you will get a new one. This is perfectly suitable for staging your project until it's ready for production. Once that moment has come, however, you need to provide your users with a definite domain for accessing it.

## Adding a Domain Using Our Nameservers

With the release of ${<Now color="#000" />}, also introduced a DNS service called ${<InternalLink href="/world">zeit.world</InternalLink>}, which makes the process I've mentioned above very easy:

The only thing you need to do if you want to add a custom domain using this method is ${<InternalLink href="/world#1.-point-your-domains-to-our-nameservers">point your domains to our nameservers</InternalLink>} and then alias a deployment by running this command after deploying:

${
  <TerminalInput>
    {`now alias <the-unique-url> <the-domain>`}
  </TerminalInput>
}

As an example, adding an the alias "domain.com" to the URL I've shown above, would work like this:

${
  <TerminalInput>
    now alias https://my-app-qbncycxjue.now.sh domain.com
  </TerminalInput>
}

After you've run the command, ${<Now color="#000" />} will check if your domain points to a at least four namservers of ours, automatically provision an SSL certificate and assign the new domain to your deployment as an alias.

In turn, your deployment would then be reachable at "domain.com" on the web.

## Adding a Domain Using External Nameservers

Previously, you've been able to use external nameservers by simply creating a \`CNAME\` record with a value of \`alias.zeit.co\` and adding an alias using the \`now alias\` command.

From now on, this will be slightly different: You need to create a \`TXT\` record containing a token for authorization in addition to any CNAME or ALIAS records.

The following example is demonstrating how you can use [Cloudflare](https://www.cloudflare.com/) with ${<Now color="#000" />}. However, this workflow just works the same for any other external DNS service:

* Firstly, add the domain to now using the \`--external\` flag:

${
  <TerminalInput>
    now domain add --external awesome-now.us
  </TerminalInput>
}

* Next, you'll see a token which you need to add as a \`TXT\` record to the DNS entries on the platform you're using for DNS management (like mentioned above):

${
  <Image
    src={`${IMAGE_ASSETS_URL}/blog/domain-verification/cloudflare.png`}
    width="700"
    height="190"
  />
}

* Enable Full (strict) encryption. Without this step your deployments can't communicate with Cloudflare.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/blog/domain-verification/ssl.png`}
    width="700"
    height="314"
  />
}

* Finally, repeat the first step and your domain will be added (you won't see another token this time). Now you can use the domain for one of your deployments!

* On some occasions \`now alias\` fails to issue a certificate for a deployment when using Cloudflare. In such a case you should try adding a page rule that enforces CloudFlare to use HTTP for the certificate request validation URL. The URL in question is formatted as follows: \`sub.yourdomain.com/.well-known/acme-challenge/*.\`<br/>
In the following screenshot we have a page rule that turns off encryption when accessing a certificate request validation URL of any subdomain of \`awesome-now.us\`.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/blog/domain-verification/rules.png`}
    width="700"
    height="386"
  />
}

The page rule should no be removed at any time because the verification URL is accessed every time we renew your certificates. In case the rule is removed and the verification URL is inaccessible, we may not be able to renew your certificates successfully, which in turn may make your website or service inaccessible.

## Managing DNS Records When Using Our Nameservers

Thanks to the \`now dns\` sub command within our command line interface, managing existing DNS records on our namservers is as easy as pie. However, don't forget that this only applies to domains you've added using our ${<InternalLink href="/world">zeit.world</InternalLink>} service. In order to modify the records of an externally hosted domain, you need to interact with your DNS provider.

In the examples shown below, the placeholder \`zeit.rocks\` represents a domain of your choice that was registered with \`now domains\` or \`now alias\`. Here are the sub commands you can take advantage of today:

### now dns ls

Lists all the DNS records created for domains using ${<InternalLink href="/world">zeit.world</InternalLink>}. The list doesn't include records generated automatically by the nameserver (like a default \`SOA\` record, \`A / AAAA\` records created automatically for \`ALIAS\` records, and so on).

### now dns add

Adds a DNS record to a domain of your choice (registered with \`now domains\` or \`now alias\`). The following record types are currently being supported:

* A
* AAAA
* ALIAS
* CNAME
* MX

This is how the command input needs to look like:

${
  <TerminalInput>
    now dns add &lt;domain&gt; &lt;name&gt; &lt;record type&gt; &lt;value&gt; [mx_priority]
  </TerminalInput>
}

* \`<domain>\` is the address owned by the user and previously registered with ${<InternalLink href="/world">zeit.world</InternalLink>} by using the commands \`now domain add zeit.rocks\` or \`now alias\`
* \`<name>\` is the subdomain that will be prefixed to \`<domain>\` (\`@\` as a \`<name>\` refers to the domain without any prefix)
* \`<record type>\` contains one of the supported record types shown above
* \`<value>\` indicates the target of the record (like an IP address or a hostname)
* \`[mx_priority]\` sets the priority of a certain MX record and can therefore only be used in conjunction with this record type
<br/>

**Examples**

${
  <TerminalInput>
    now <b>dns add zeit.rocks ext A 127.0.0.1</b>
  </TerminalInput>
}

Creates an A record that makes the subdomain \`ext.zeit.rocks\` resolve to the server located at the IP address \`127.0.0.1.\`

${
  <TerminalInput>
    now <b>dns add zeit.rocks @ MX mail.awesome-now.us 10</b>
  </TerminalInput>
}

Creates an MX record which makes the mail server located at \`mail.awesome-now.us\` responsible for handling emails sent to an address suffixed with \`@zeit.rocks\`.

### now dns rm &lt;ID&gt;

Removes a record by its ID shown in the \`now dns ls\` listing. Note that it may take up to a couple of hours before the change is fully propagated across our infrastructure.

## The API Endpoint

As of version **0.7.0** of [now-client](https://github.com/zeit/now-client), it comes with API wrappers for managing the DNS records within your own application.

The endpoint is called \`/domains/:domain/records\` and available in our ${<InternalLink href="/api#get-domain-records">REST API</InternalLink>}.

`)
