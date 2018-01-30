// Packages
import markdown from 'markdown-in-js'

// Components
import { InlineCode } from '../../../components/text/code'

// Utilities
import withDoc, { components } from '../../../lib/with-doc'
import { leo } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Billing',
  date: '21 Jul 2017',
  authors: [leo],
  editUrl: 'pages/docs/guides/billing.js',
})(markdown(components)`
  This page describes the part of our platform
  that is responsible for payments, subscriptions and
  billing as specified in your plan.

  ## Failed Payments

  In the cases in which our system isn't able to charge
  your supplied payment method in the specified cycle (see
  our [Pricing](/pricing) page), it will firstly
  notify you about what happened and how you can fix it.

  This means that you'll receive a few emails containg
  details about how to update your billing information
  and why you couldn't be charged. The last email
  will be especially outstanding in terms of attracting
  your attention.

  In the case that you don't react to any of those
  emails, your subscription and
  associated resources will be suspended and you'll
  receive another email containg exactly that information
  and what you can do to activate
  your subscription again.

  At this point, if you haven't taken any action, you
  won't be able to access any platform features (like
  deployments, domains or certificates) anymore:

  - Deployments will return the status code ${<InlineCode>402</InlineCode>} and
  a page letting you know about the failed payment. This message
  can be seen by anyone trying to access the deloyment.

  - In addition to returning the error message, deployments
  will be scaled to 0 running instances. No code will
  be executed anymore.

  - API requests using a token issued by the account whose
  subscription was suspended will result in a JSON response
  with the ${<InlineCode>error.code</InlineCode>} property
  set to ${<InlineCode>payment_required</InlineCode>}.

  To prevent all of this from happening, please ensure
  that your specified payment method is always ready to be
  charged.

  In addition to that, it would also be a
  great advantage to ensure that emails from our platform
  don't land in your spam folder or get filtered out
  as junk (they're being sent by an address
  ending with ${<InlineCode>@zeit.co</InlineCode>}).
`)
