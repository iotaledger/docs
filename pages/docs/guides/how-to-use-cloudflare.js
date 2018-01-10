import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { jamo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'How to Use Cloudflare with now',
  date: '04 Apr 2017 9:42 AM PDT',
  authors: [jamo, rauchg],
})(markdown(components)`

The following example is demonstrating how you can use [Cloudflare](https://www.cloudflare.com/) with ${<Now color="#000"/>}.

* Add the domain to ${<Now color="#000"/>} using the \`--external\` flag:
${
  <TerminalInput>
    now domain add --external awesome-now.us
  </TerminalInput>
}
* Next, you'll see a token which you need to add as a \`TXT\` record to the DNS entries on the platform you're using for DNS management (as mentioned [here](http://localhost:5800/docs/getting-started/assign-a-domain-name#4.-using-a-custom-domain-with-a-cname)):
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
The page rule should no be removed at any time because the verification URL is accessed every time we renew your certificates.
`)
