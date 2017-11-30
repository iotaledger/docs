import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Support Channels',
  date: '21 Jul 2017',
  authors: [sergio],
})(markdown(components)`
We have a few support channels you can use to clarify doubts and solve issues.

## Platform Status
Check our [Twitter status account](https://twitter.com/zeit_status) to verify if the platform have some issue at the moment.

## Documentation
Check the [documentation](/docs), here we have a lot of information about how you can use the CLI and the platform, and we have project examples and integration with third-party services

## GitHub
We have many [GitHub repositories](https://github.com/zeit) for almost every service or product we have. You can create issues in that repositories and the team and the community will help you as soon as possible. Some repositories you can access are [now-cloud](https://github.com/zeit/now-cloud), [now-cli](https://github.com/zeit/now-cli), [now-desktop](https://github.com/zeit/now-desktop), [now-client](https://github.com/zeit/now-client), [next.js](https://github.com/zeit/next.js), [hyper](https://github.com/zeit/hyper), [pkg](https://github.com/zeit/pkg), [micro](https://github.com/zeit/micro) and more.

## zeit.chat
Our community's Slack, there you can ask for help and either the community and the ZEIT Team will answer and help you solve any doubt you could have. You can access to it going to [zeit.chat](https://zeit.chat).

## Twitter
You can use Twitter to send us a DM or mention to [@zeithq](https://twitter.com/zeithq) and a team member will contact you and help you with anything.

## Email
The last but not least support channel is our [support@zeit.co](mailto:support@zeit.co) email. If you have very custom questions or related to private information (eg. billing issues) you don't want to share in Slack or you like more to use email you can contact us and we happily will help you as far as we could.
`)
