import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { arunoda } from '../../../lib/data/team'
import { InternalLink } from '../../../components/text/link'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'What\'s Next',
  date: '10 August 2017',
  authors: [arunoda],
})(markdown(components)`

As you've gone through the getting started guide, you are ready to do production deployments with ${<Now color="#000"/>}.

For additional information, follow these links:

* ${<InternalLink href="/docs/deployment-types/lifecycle">Discover more with guides</InternalLink>}
* ${<InternalLink href="/docs/examples/json-api">Try example apps</InternalLink>}
* ${<InternalLink href="/docs/support/channels">Connect with our support channels</InternalLink>}
`)
