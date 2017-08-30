import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Building a Static Website',
  date: '23 Feb 2017',
  authors: [leo],
})(markdown(components)`

With just a single command, even complex Node applications or Docker containers can be deployed with now.

But in some cases, there isn't the need for running code on the server. Sometimes you just want to share files or make a static website accessible for other people.

Thankfully, our tools make deploying such a project just as easy as it is with a full-blown application.

## Setup

Because basic static websites don't require any special tools in order to work, there's not much you need to do in order to prepare your own one. For the beginning, just create a directory and switch to it by running these commands in your terminal:

${<TerminalInput>{`mkdir static-site\ncd static-site`}</TerminalInput>}

Inside that directory, use your favorite editor to create a \`index.html\` file with this content:

${
  <Code>
    {`<img src="https://cdn.zeit.co/logos/black-bg-logo.svg">

<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #000;
    margin: 0;
  }

  img {
    max-height: 100vh;
    max-width: 300px;
  }
</style>`}
  </Code>
}

The code basically loads ZEIT's logo from our content delivery network and shows it to the user. In addition, I sprinkled some cute CSS styles on top to position the image in the exact center of the page.

This is how it will look in the browser when opening the file:

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/static/browser.png`}
    width="550"
    height="319"
  />
}

## Testing across Devices

When developing a static project, you should always make sure that it works on various devices, not just on your own one. This can be solved by simply skipping to ${<InternalLink href="/docs/examples/static#deploying-the-site">Deploying</InternalLink>}, sending the link to somewhere else and then testing it from there.

This is a very good idea when working with people across the whole globe and having them try out your project for you. But if you only want to open it on a different device in your own home network, there's a specialized solution: [serve](https://github.com/zeit/serve).

Want to see what it does exactly? Easy! Simply start with installing it:

${<TerminalInput>npm install -g serve</TerminalInput>}

Afterwards, move into the directory containing your static site:

${<TerminalInput>cd static-site</TerminalInput>}

And then, finally, run it using this command:

${<TerminalInput>serve</TerminalInput>}

Now you'll see a message containing two addresses:

* **"Local"**: The URL which you can open in the browser on the device where serve is running.
* **"On Your Network"**: That's the address that you can open on different devices on the same network to see your project.

That easy! Now you can test the site on other platforms (like your phone) as well.

You can stop \`serve\` by hitting \`CTRL + C\`.

## Deploying the Site

Once the static website works on all devices, we can deploy it by running this command:

${<TerminalInput>now</TerminalInput>}

Once ${<Now color="#000" />} has finished uploading the files, you'll see a URL that points to your freshly created website. This means that you can already share the URL with other people across the globe and have them enjoy your site.

But in the case of a real website (not used for testing purposes), you would now have to [assign an alias](https://zeit.co/docs/features/aliases) to it.
`)
