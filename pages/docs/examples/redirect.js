import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { sergio } from '../../../lib/data/team'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Setting up a Redirect with Now',
  date: '5 Nov 2017',
  authors: [sergio],
  editUrl: 'pages/docs/examples/redirect.js',
})(markdown(components)`
You usually want your users to access your site with or without \`www\`. The best way to achieve this is to redirect all the traffic coming to the \`www\` domain to your app's naked domain.

Here are a few example redirects:

${<Code>{`* https://www.mycompany.com -> https://mycompany.com
* https://www.mycompany.com/about -> https://mycompany.com/about
`}</Code>}

You can also add two aliases to your app like below:

${<Code>{`now alias my-deployment-url.now.sh mycompany.com
now alias my-deployment-url.now.sh www.mycompany.com
`}</Code>}

It will do the job, but search engines consider them as **duplicate** content. This is not good for SEO and it might confuse users as well.

Therefore, \`www\` redirect is the best option. There are two ways to achieve that for your app.

## 1. Using now-examples/redirect

Now we are going to deploy a [simple web app](https://github.com/now-examples/redirect) which receives all the \`www\` traffic and redirect them to your naked domain.

To deploy this, run the following command:<br/>
(Make sure to add a trailing slash to the redirect url as shown below.)

${<TerminalInput>now -e REDIRECT_URL=http://mycompany.com/ now-examples/redirect</TerminalInput>}

Then, you will get a deployment url like this: \`https://now-redirect-otytioldup.now.sh\`.

Now, alias that into your \`www\` domain like this:

${<TerminalInput>now alias https://now-redirect-otytioldup.now.sh www.mycompany.com</TerminalInput>}

Now, all the \`www\` traffic will be forwarded to your naked domain (in this case \`mycompany.com\`). 

> You only need deploy this app once. 


## 2. Redirect Inside Your App

In this case, your app accepts \`www\` traffic and it will redirect them from your app. If you are using [Express](https://expressjs.com/) for your app, you can do something like this:


${<Code>{`function redirect(req, res, next) {
  // if the request doesn't come from mycompany.com or from the deployment URL
  if (req.hostname !== 'mycompany.com' || req.hostname !== process.env.NOW_URL) {
    // redirect to mycompany.com keeping the pathname and querystring
    return res.redirect(\`https://mycompany.com/\${req.originalUrl}\`);
  }
  return next(); // call the next middleware (or route)
}

// make Express use our redirect middleware
app.use(redirect);
`}</Code>}

If you are using some other language or a different web server, you can implement a similar logic as shown above.

### Set up Aliases

Now, add an additional [alias](/docs/getting-started/assign-a-domain-name) to receive \`www\` traffic into your app. If you are using [now.json](/docs/features/configuration), you can add two aliases like this:

${<Code>{`{
  "aliases": [
    "www.mycompany.com",
    "mycompany.com"
  ]
}`}</Code>}

Then, every time you run \`now alias\`, it will alias your app into both of your aliases.
`)
