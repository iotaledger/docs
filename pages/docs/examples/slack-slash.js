import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import { InternalLink } from '../../../components/text/link'

// prettier-ignore
export default withDoc({
  title: 'Building a Slash Command for Slack',
  date: '28 Feb 2017',
  authors: [leo],
  editUrl: 'pages/docs/examples/chat.js',
})(markdown(components)`

For most people in the web community, [Slack](https://slack.com/) has become an essential part of their everyday life. It has turned into a wonderful tool for sharing text, sending files around and building a community (a great example for this is [our public Slack team](https://zeit.chat/)).

To support this wide range of use cases and empower people who use the service to gather people together for a great cause, I thought it would be a great idea to set up a detailed documentation about building a slash command on top of ${<Now color="#000" />}.

The idea is to allow your team members to retrieve weather information of a specific location by running a command like \`/weather\` inside Slack. This creates a nice base for building a more complex command of your choice!
Ready? Let's start over with what's needed for this:

## Requirements

Before we can go on, please ensure that you have a team account signed up on Slack's platform. If you still need to create one, you can do that directly on their [front page](https://slack.com/).

Next, make sure that your instance of Node is up-to-date. You should have the latest "Current" release (compare it with [this](https://nodejs.org/)). If it's not, click on the download button on the site and get yourself the newest version.

You can use this command to check the version tag of your local instance:

${<TerminalInput>node -v</TerminalInput>}

Once the output of the command matches the latest version on the site, go on to the next section.

## Setup

Now that Slack knows where to send requests to when the command is run, we can start building the service that responds to these requests. So let's create a new empty directory and move into it:

${
  <TerminalInput>
    {`mkdir slash-command\ncd slash-command`}
  </TerminalInput>
}

Next, create the project's \`package.json\` file in that directory:

${
  <Code>
    {`{
  "name": "slash-command",
  "scripts": {
    "start": "micro index.js"
  }
}`}
  </Code>
}

The code above tells ${<Now color="#000" />} the name of the project ("slack-cmd") and also to execute the \`index.js\` file (using micro, which we'll install in the next paragraph) when the \`npm start\` command is run in your terminal or on the server.

Next, you need to install [micro](https://github.com/zeit/micro), a library of ours that makes building a [microservice](https://zeit.co/docs/examples/json-api) a breeze. In addition, we'll need [yahoo-weather](https://www.npmjs.com/package/yahoo-weather), which will provide us with the weather data.

Run this command in your terminal to install both using [npm](https://www.npmjs.com/):

${
  <TerminalInput>
    npm install --save micro yahoo-weather
  </TerminalInput>
}

Now create the \`index.js\` file and populate it with code. Load [yahoo-weather](https://www.npmjs.com/package/yahoo-weather) and [url](https://nodejs.org/api/url.html) (a native module for parsing URLs):

${
  <Code>
    {`const weather = require('yahoo-weather')
const url = require('url')`}
  </Code>
}

Then you need to export the code which specifies the output rendered when the service is accessed by Slack. In our case, it's a function that retrieves the current weather and returns a message containing the condition in degrees celsius:

${
  <Code>
    {`module.exports = async request => {
  const query = url.parse(request.url, true).query

  if (!query.text) {
    return 'No location defined!'
  }

  const weatherInfo = await weather(query.text.toLowerCase())
  const temperature = weatherInfo.item.condition.temp

  return 'It is ' + temperature + ' degrees celsius in ' + query.text + ' right now!'
}`}
  </Code>
}

## Deploying

Now that we've covered the project's files, you can **deploy it** by running this command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created slash command service. Now we're ready to tell the Slack platform about the service, so that it can send requests there.

But in the case of a real service (not used for testing purposes), you would now have to ${<InternalLink href="/docs/features/aliases">assign an alias</InternalLink>} to it.

## Registering the Command

Telling Slack about the command is pretty easy. As the first step, you need to search [this page](https://slack.com/apps) for the "Slash Commands" application. Once you've found it, click on "Add Configuration" in the sidebar:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/slack-slash/add-configuration.png`}
    width="500"
    height="321"
  />
}

You'll be forwarded to another page where you need to enter the name of your slash command. In our case, it should be \`/weather\`. Enter it and click on the green button at the bottom!

Now you should see a section named **Integration Settings**. In there, we need to add the address of our deployment to the **URL** field, select **GET** as the **Method** and enter "weather" in the **Customize Name** input.

Optionally, you can also make the command show up in the autocomplete help in the **Autocomplete help text** section:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/slack-slash/auto-complete.png`}
    width="600"
    height="214"
  />
}

Hit **"Save Integration"** once you're done!

You should now be able to run the \`/weather\` command from within Slack.
`)
