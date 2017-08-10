import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'

// prettier-ignore
export default withDoc({
  title: 'Logs',
  date: '4 August 2017',
  authors: [arunoda],
})(markdown(components)`

Logs are important because it allows you to see what's happening inside the app, especially when a crisis happens. ▲now keeps logs of all of your deployments and allows you to search them.

Let's have a look at how you can access logs.

## Via CLI

Accessing logs via the \`now\` CLI is simple as invoking this command:

${<TerminalInput>now logs [deployment-url]</TerminalInput>}

You can also use the domain name of your app to search logs:

${<TerminalInput>now logs my-web-app.com</TerminalInput>}

For more information on \`now logs\`, run the help command with:

${<TerminalInput>now logs --help</TerminalInput>}

${
  <Image
    src={`${ASSETS_URL}/docs/logs/help.png`}
    width={650}
    height={470}
    caption="Help of 'now logs'"
  />
}

Here's an advance \`now logs\` command to let you inspect the last 10 HTTP GET requests.

${<TerminalInput>now logs -a -q "GET" -n 10 my-web-app.com</TerminalInput>}

${
  <Image
    src={`${ASSETS_URL}/docs/logs/last-10-get-requests.png`}
    width={650}
    height={470}
    caption="Last 10 HTTP GET requests."
  />
}

## Via Dashboard

You can also access and search logs via your web dashboard at [https://zeit.co/dashboard](https://zeit.co/dashboard).<br/>
Click any of your deployment URLs inside the dashboard and start searching logs.

> You may need to click the "Logs" link on the header (top right) to see logs.

${
  <Image
    src={`${ASSETS_URL}/docs/logs/now-dashboard-logs.png`}
    width={650}
    height={445}
    caption="Searching logs inside the web dashboard."
  />
}

`)
