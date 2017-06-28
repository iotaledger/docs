import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Managing SSL Certificates',
  date: '15 Mar 2017',
  authors: [leo],
})(markdown(components)`

Each time you create a new deployment, you will get a new, unique subdomain. For this address (just like for the custom domains you've added using \`now alias\` or \`now alias\`), we're automatically provisioning an SSL certificate for you.

Our platform seamlessly communicates with [Let's Encrypt](https://letsencrypt.org/) to provide your deployment's domain with a [X.509](https://en.wikipedia.org/wiki/X.509) certificate without any costs. All of this happens in the brackground, without you even noticing it!

You can read more about how exactly the certificate provisioning works [here](https://letsencrypt.org/how-it-works/). If you're interested in knowing which browsers the certificates are compatible with, [this](https://letsencrypt.org/docs/certificate-compatibility/) might also be of interest for you. At last, [this document](https://letsencrypt.org/certificates/) describes how the certificates work per se.

## Using the CLI

Let's take a look at how you can use ${<Now color="#000" />}'s command line interface to manage your existing certificates and even upload new ones. In the following examples, \`zeit.rocks\` represents the domain you'd like to modify.

### now certs ls

Lists all certificates owned and created by the user. All certificate entries ever created will remain there in the list, as long as the user still owns the domain associated with the certificate. The actual certificates may however change over time. For example, we periodically renew all the certificates created with the API.

### now certs create zeit.rocks

Allows you to create a new certificate for any domain you have access to and have registered with now. There shouldn't be much real use for this command and it's mainly provided for symmetry, though you may want to use it for creating a certificate entry for a subdomain in advance, before creating an alias using the domain.

### now certs renew zeit.rocks

Can be used for renewing an existing certificate issued with now. This command can't used for renewing a custom certificate provided by the user.

### now certs replace

That's the core of this update! The command can be used for uploading a certificate issued by a 3rd party Certificate Authority. It requires you to already have an alias with an automatic certificate in place. You can use it like this:

${
  <TerminalInput>
    <b>now certs replace</b>
    {' '}
    --crt domain.crt --key domain.key --ca ca_chain.crt zeit.rocks
  </TerminalInput>
}

**Keep in mind**: \`--ca ca_chain.crt\` is optional but needed if your certificate provider is not considered as a root Certificate Authority by web browsers and operating systems (which is usually the case). This file is usually provided by the Certificate Authority you're using.

## The API Endpoint

Finally, version **0.6.0** of [now-client](https://github.com/zeit/now-client) comes with API wrappers for managing the certificates bound to aliases using a custom domain.

Normally, when a user created an alias with ${<Now color="#000" />} command line utility, we automatically issued a certificate for it (like previously described in ${<InternalLink href="/blog/now-alias">this post</InternalLink>}). So technically, the API endpoint was already there. But until recently, it only supported issuing new certificates. By now, it also supports renewal, removal and replacement.

The endpoint is called \`/now/certs\` and available in our ${<InternalLink href="/api#endpoints">REST API</InternalLink>}.
`)
