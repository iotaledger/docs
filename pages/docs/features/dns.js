import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { hbp, leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'DNS Management',
  date: '15 Mar 2017',
  authors: [hbp, leo],
})(markdown(components)`


Thanks to the \`now dns\` CLI command, managing existing DNS records with ${<Now color="#000" />} is simple.

> However, this only applies to domains you bought via ${<Now color="#000" />} or domains configured with our [global DNS service](/world).

In the examples shown below, the placeholder \`zeit.rocks\` represents a domain of your choice that was registered with \`now domains\` or \`now alias\`. Here are the main sub-commands you can use:

### now dns ls

Lists all the DNS records available for this domain. The list doesn't include records generated automatically by the nameserver (like a default \`SOA\` record or \`A / AAAA\` records created automatically for \`ALIAS\` records).

### now dns add

Adds a DNS record to a domain of your choice. The following record types are currently supported:

* A
* AAAA
* ALIAS
* CAA
* CNAME
* MX
* SRV
* TXT

This is the syntax for the \`now dns\` command.

${
  <TerminalInput>
    now dns add &lt;domain&gt; &lt;name&gt; &lt;record type&gt; &lt;value&gt; [mx_priority]
  </TerminalInput>
}

* \`<domain>\` is the domain name
* \`<name>\` is the subdomain that will be prefixed to \`<domain>\` (value \`@\` refers to a domain without any prefix)
* \`<record type>\` contains one of the supported record types shown above
* \`<value>\` indicates the value for the record (like an IP address or a hostname)
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

Removes a record by ID, which is shown in the \`now dns ls\` listing. Note that it may take a couple of hours before the change is fully propagated across our infrastructure.

## The API Endpoint

As of [now-client](https://github.com/zeit/now-client) version **0.7.0**, it comes with API wrappers for managing the DNS records within your own application.

The endpoint is called \`/domains/:domain/records\` and is available in our ${<InternalLink href="/api#get-domain-records">REST API</InternalLink>}.

`)
