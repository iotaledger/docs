import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Installation',
  date: '31 July 2017',
  authors: [arunoda],
})(markdown(components)`

In order to deploy to ${<Now color="#000"/>}, you need to install a small utility app. Let's see how you can do that.

## Now CLI

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/installation/now-cli.png`}
    width={650}
    height={330}
  />
}

This is the command line interface for ${<Now color="#000"/>}. It's a pre-built binary [available](https://zeit.co/download#command-line) for all major operating systems and works without any dependencies.

## Now via NPM

This is exactly Now CLI but distributed via [NPM](https://www.npmjs.com/). This method is ideal if your operating system already has NPM support.

${
  <TerminalInput>npm install -g now</TerminalInput>
}

## Now Desktop

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/installation/now-desktop.png`}
    width={550}
    height={380}
    caption="Now Desktop on Mac OS"
  />
}

This is a desktop app which is [available](https://zeit.co/download) for Mac and Windows. It comes as an operation system status bar app.

You can deploy apps, see notifications, and manage your account using an easy-to-use interface.
It will update new versions automatically behind the scenes and you can always use the latest version of [Now Desktop](https://zeit.co/download).

## Open Source

All of these apps are available under the open source MIT license. So, you can always check the source code and modify it as needed.
You are always welcome to suggest new features and submit issues. Use following repositories:

* Now CLI - <https://github.com/zeit/now-cli>
* Now Desktop - <https://github.com/zeit/now-desktop>
* Now Client - <https://github.com/zeit/now-client>

`)
