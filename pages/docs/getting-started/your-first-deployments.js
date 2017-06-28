import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg } from '../../../lib/data/team'
import { ExternalLink, AnchorLink } from '../../../components/text/link'
import Image from '../../../components/image'
import { P } from '../../../components/text/paragraph'
import {
  TerminalInput,
  TerminalOutput
} from '../../../components/text/terminal'
import Caption from '../../../components/text/caption'
import { Code } from '../../../components/text/code'

// prettier-ignore
export default withDoc({
  title: 'Your First Deployments',
  date: '07 Nov 2016',
  authors: [rauchg],
})(markdown(components)`

Deploying a website or API from your computer to the cloud as quickly as possible is now's main goal.

This guide will cover:

* Deploying a ${<AnchorLink href="#deploying-a-website">basic HTML / CSS example</AnchorLink>}
* Deploying a ${<AnchorLink href="#deploying-node-apps">JSON API written in Node</AnchorLink>}
* Deploying a ${<AnchorLink href="#deploying-docker-containers">JSON API written in Rust with Dockerfile</AnchorLink>}

This guide should only take a few minutes to complete. After deploying, we'll execute \`now alias\` to give your service a friendly URL.

Before proceeding, make sure you have followed the installation guide and are able to launch a terminal session. Before proceeding, you should be able to execute this command on your terminal:

${<TerminalInput>now --version</TerminalInput>}

And it should report the version of \`now\` that you're running. It reports the following for me:

${<TerminalOutput>4.7.0</TerminalOutput>}
${
  <Caption>
    The expected output of the command
    {' '}
    <Caption.Code>now --version</Caption.Code>
  </Caption>
}

If you're not able to run that command, you won't be able to continue this guide. Please reach out to us for help.

## Deploying a Website

We consider static any deployment that doesn't involve a build process. For example:

* A single file
* A directory with photos, videos or other files
* A website, which is just a directory with some \`.html\` files
* The output directory of a build, with static \`.html\` files

Let's host a simple site with now. Start by creating a directory with two files \`index.html\` and \`style.css\`

${
  <Image
    src={`${ASSETS_URL}/docs/your-first-deployments/my-first-site-folder.png`}
    width="460"
    height="341"
    caption="The contents of the directory we are going to deploy"
  />
}

To create and go to this new directory from the terminal, run:

${
  <TerminalInput>
    {`mkdir get-started-basic\ncd get-started-basic`}
  </TerminalInput>
}

Then populate the files with your favorite text editor. First \`index.html\`:

${
  <Code>
    {`<title>My first now deployment</title>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">

<div>
  <P>▲</P>
</div>
`}
  </Code>
}

and then \`style.css\` as follows:

${
  <Code>{`body {
  background: #000;
  color: #fff;
}

div {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
}

p {
  font-size: 200px;
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: center;
}`}</Code>
}

Let's list the contents of the directory in the terminal to make sure everything is ok.

${<TerminalInput>ls</TerminalInput>}

The result should be as follows:

${<TerminalOutput>index.html   style.css</TerminalOutput>}

To confirm the contents are ok, attempt to open **index.html**. On macOS, you can use the \`open\` command:

${<TerminalInput>open index.html</TerminalInput>}

${
  <Image
    src={`${ASSETS_URL}/docs/your-first-deployments/my-first-site.png`}
    width="520"
    height="488"
  />
}

On Linux, the equivalent command is typically \`xdg-open\`. On Windows or others, navigate to the directory and double-click \`index.html\` to open it in the default browser.

Now it's time to deploy! Just run:

${<TerminalInput>now</TerminalInput>}

The output will look as follows:

${
  <TerminalOutput>
    {`▲  get-started-basic now`}{``}<br />{`
> Deploying ~/Documents/Projects/now-examples/get-started-basic`}{``}<br />{`
> Using Node 7.0.0 (default)`}{``}<br />{`
`}
    <P.B>&gt; Ready!</P.B>
    {` `}
    <ExternalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </ExternalLink>
    {` (copied to clipboard) [1s]`}{``}<br />{`
> Upload [====================] 100% 0.0s`}{``}<br />{`
> Sync complete (675B) [1s]`}{``}<br />{`
> Initializing…`}{``}<br />{`
> Building`}{``}<br />{`
> ▲ npm install`}{``}<br />{`
> ⧗ Installing:`}{``}<br />{`
>  ‣ serve@^2.4.1`}{``}<br />{`
> ✓ Installed 167 modules [3s]`}{``}<br />{`
> ▲ npm start`}{``}<br />{`
> > get-started-basic@ start /home/nowuser/src`}{``}<br />{`
> > serve ./content`}{``}<br />{`
`}<P.B>&gt; Deployment complete!</P.B>{``}
  </TerminalOutput>
}

Tip: under the hood it's just a Node deployment using [serve](https://github.com/zeit/serve)!

You can now open the link (in the example above \`https://get-started-basic-etjnigdrkz.now.sh\`) and you should see your deployment live. Every time you make a change to any of the files, or add new ones you can run \`now\` to deploy again and get a new URL.

Then, by running \`now alias\` you're able to point your deployment URL to a more memorable name, like a custom domain or **.now.sh** shorthand:

${<TerminalInput>now alias YOUR_DEPLOYMENT_URL my-new-name</TerminalInput>}

For this example, I'm going to take the URL I got above and use as my target \`get-started-basic\`:

${<TerminalInput>now alias https://get-started-basic-etjnigdrkz.now.sh get-started-basic</TerminalInput>}

When you use \`alias\`, if the target omits \`.now.sh\` it's automatically added.

${
  <TerminalOutput>
    <P.B>&gt; Success!</P.B>
    {` Alias created `}
    <P.B>(xpvB6GZWMR6Q9Oxe3c64Htgq)</P.B>
    {`:
`}
    <ExternalLink href="https://get-started-basic.now.sh">
      https://get-started-basic.now.sh
    </ExternalLink>
    {` now points to `}
    <ExternalLink href="https://get-started-basic-etjnigdrkz.now.sh">
      https://get-started-basic-etjnigdrkz.now.sh
    </ExternalLink>
    {` `}
    <P.B>(xpvB6GZWMR6Q9Oxe3c64Htgq)</P.B>
    {` [copied to clipboard]`}
  </TerminalOutput>
}

## Deploying Node Apps

Node deployments are exactly like static ones but they contain a package.json file.

In this **package.json** file you define:

* The module dependencies of the project (optionally)
* A build step (optionally)
* The start script, a command that boots up a HTTP server that listens on a port

Node deployments are very fast, easy to configure and give you complete control over the lifecycle of the incomign HTTP request and its eventual response.

The only pre-requisite for this part of the guide is that you [install Node](https://nodejs.org/en/). To verify your installation, run the following:

${<TerminalInput>node --version</TerminalInput>}
${<TerminalInput>npm --version</TerminalInput>}

The result of those two command looks like this on my computer:

${<TerminalOutput>v7.6.0</TerminalOutput>}
${<TerminalOutput>4.1.2</TerminalOutput>}

If you're not getting the version numbers, please make sure Node is properly installed before proceeding.

For this example, we are going to deploy a simple API server that returns a JSON object with the current time. We start by defining our \`package.json\` inside a new empty directory called \`get-started-node\`.

${
  <TerminalInput>
    {`mkdir get-started-node\ncd get-started-node`}
  </TerminalInput>
}

${
  <Code>
    {`{
  "name": "get-started-node",
  "version": "0.1.0",
  "dependencies": {
    "micro": "latest"
  }
}`}
  </Code>
}

For this example, we'll use the \`micro\` framework due to its simplicity. Any other module would work for this purpose, like [express](http://expressjs.com/) or [koa](http://koajs.com/), or even raw Node HTTP APIs!

We proceed by writing an \`index.js\` file:

${
  <Code>
    {`module.exports = () => ({
  date: new Date
})`}
  </Code>
}

This simple function that returns an object with the date can then be exposed on a port by invoking the command \`micro\`. To test that it works, run:

${<TerminalInput>npm install</TerminalInput>}

After everything is installed you should be able to invoke:

${<TerminalInput>./node_modules/.bin/micro</TerminalInput>}

By default \`micro\` looks for \`index.js\` and exposes it in a port. The output will look as follows:

${
  <TerminalOutput>
    &gt; Ready! Listening on <P.B>http://0.0.0.0:3000</P.B>
  </TerminalOutput>
}

Go to the URL returned (\`http://0.0.0.0:3000\`) and you should see something like this:

${
  <Image
    src={`${ASSETS_URL}/docs/your-first-deployments/localhost.png`}
    width="460"
    height="345"
    caption="Our JSON response rendered by Chrome"
  />
}

If you get the current date, it means the API worked!

However, if you tried to deploy this application by running \`now\` in its current state, you would get an error like this:

${
  <TerminalOutput>
    &gt; Deploying ~/Documents/Projects/now-examples/get-started-node
    <br />
    &gt;{' '}
    <span className="error">Error!</span>
    {' '}Missing `start` (or `now-start`) script in `package.json`
  </TerminalOutput>
}

now has a very simple requirement for \`package.json\`-based projects: a \`start\` script must be defined inside \`scripts\` in \`package.json\`. Optionally, you can also supply a \`build\` script that gets executed upon deployment to build or compile your project.

With this in mind, we edit our \`package.json\` to look like this:

${
  <Code>
    {`{
  "name": "get-started-node",
  "version": "0.1.0",
  "dependencies": {
    "micro": "latest"
  },
  "scripts": {
    "start": "micro"
  }
}`}
  </Code>
}

When we retry \`now\`, we should now get something like this:

${
  <TerminalOutput>
    {`▲  get-started-basic now`}<br />{`
> Deploying ~/Documents/Projects/now-examples/get-started-node`}<br />{`
> Using Node 7.0.0 (default)`}<br />{`
`}
    <P.B>&gt; Ready!</P.B>
    {` `}
    <ExternalLink href="https://get-started-node-njitejihxp.now.sh">
      https://get-started-node-njitejihxp.now.sh
    </ExternalLink>
    {` (copied to clipboard) [1s]`}<br />{`
> Upload [====================] 100% 0.0s`}<br />{`
> Sync complete (192B) [1s]`}<br />{`
> Initializing…`}<br />{`
> Building`}<br />{`
> ▲ npm install`}<br />{`
> ⧗ Installing:`}<br />{`
>  ‣ micro@latest`}<br />{`
> ✓ Installed 13 modules [1s]`}<br />{`
> ▲ npm start`}<br />{`
> > get-started-node@0.1.0 start /home/nowuser/src`}<br />{`
> > micro`}<br />{`
> > Ready! Listening on http://0.0.0.0:3000`}<br />{`
`}<P.B>&gt; Deployment complete!</P.B>{``}
  </TerminalOutput>
}

If you visit said URL, which should be copied to your clipboard automatically, your deployment should now be live!

Like we did for our first example, we can give it a friendly URL by invoking \`now alias\`:

${<TerminalInput>now alias https://get-started-node-njitejihxp.now.sh get-started-node</TerminalInput>}

Which should give us output like this:

${
  <TerminalOutput>
    <span className="cyan">&gt; Success!</span>
    {` Alias created `}
    <span className="gray">(kp4B6GZWMR6Q9Oxe3c64Htgq)</span>
    {`:
`}
    <ExternalLink href="https://get-started-node.now.sh">
      https://get-started-node.now.sh
    </ExternalLink>
    {` now points to `}
    <ExternalLink href="https://get-started-node-njitejihxp.now.sh">
      https://get-started-node-njitejihxp.now.sh
    </ExternalLink>
    {` `}
    <span className="gray">(VS9l42cwppzLNqJ203Epg8hv)</span>
    {` [copied to clipboard]`}
  </TerminalOutput>
}

## Deploying Docker Containers

It's possible to deploy any Linux-based program in any programming language by using Docker [containers](https://en.wikipedia.org/wiki/LXC).

Unlike other deployment solutions, now does not require that you build and push images or configure any registries. All we need is the \`Dockerfile\` that acts as a recipe for how to build your project.

In order to test the image locally on your computer, you'll need to [install Docker](https://docs.docker.com/engine/installation/). If you're on macOS, we recommend you install [Docker for Mac](https://docs.docker.com/docker-for-mac/).

To test that it's properly installed, run the following:

${<TerminalInput>docker --version</TerminalInput>}

Which, at the time of writing, gives:

${<TerminalOutput>Docker version 1.13.0-rc7, build 48a9e53</TerminalOutput>}

For this example, we'll write a tiny API server in [Rust](https://www.rust-lang.org/en-US/), a modern open-source systems programming language by Mozilla, in combination with [Rocket](https://rocket.rs/), a lean and expressive web framework.

Since we'll be using the \`docker\` API, your system does not need Rust to actually be installed. During development, however, sometimes it's handy to have it directly available. To install the Nightly version (required by Rocket), run:

${<TerminalInput>curl https://sh.rustup.rs -sSf | sh</TerminalInput>}

For more installation options (and security), visit [rustup.rs](https://rustup.rs/)

Like we did for the other two projects, we'll create a separate directory. But in this case, we can have \`cargo\`, Rust's package manager, do it for us:

${
  <TerminalInput>
    {`cargo new --bin get-started-docker\ncd get-started-docker`}
  </TerminalInput>
}

The output should look as follows:

${
  <TerminalOutput>
    <P.B>Created</P.B>
    {` binary (application) \`get-started-docker\` project`}
  </TerminalOutput>
}

We then have to add our dependencies to the resulting \`Cargo.toml\` file, which should look as follows:

${
  <Code>
    {`[package]
name = "get-started-docker"
version = "0.1.0"

[dependencies]
rocket = "0.1.5"
rocket_codegen = "0.1.5"
rocket_contrib = { version = "0.1.5", features = ["json"] }
serde = "0.8"
serde_json = "0.8"
serde_derive = "0.8"
chrono = { version = "0.2", features = ["serde"] }
`}
  </Code>
}

By convention, we'll place our main code by over-writing the file \`src/main.rs\` which \`cargo new\` created above:

${
  <Code>
    {`#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate chrono;
extern crate serde_json;

#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use rocket_contrib::JSON;
use chrono::*;

#[derive(Serialize)]
struct TimeStamp {
  date: DateTime<UTC>
}

#[get("/")]
fn index() -> JSON<TimeStamp> {
  JSON(TimeStamp {
    date: UTC::now()
  })
}

fn main() {
  rocket::ignite().mount("/", routes![index]).launch()
}`}
  </Code>
}

To test it out, we can execute:

${<TerminalInput>cargo run</TerminalInput>}

Which will compile and run our program. The (abridged) output should look like this:

${
  <TerminalOutput>
    <P.B>Compiling</P.B>{` rocket v0.1.5`}<br />{`
`}<P.B>Compiling</P.B>{` rocket_contrib v0.1.5`}<br />{`
`}<P.B>Compiling</P.B>{` get-started-docker v0.1.0 (…)`}<br />{`
`}
    <P.B>Finished</P.B>
    {` debug [unoptimized + debuginfo] target(s) in 79.21 secs`}
    <br />
    {`
`}<P.B>Running</P.B>{` \`target/debug/get-started-docker\``}<br />{`
🔧 `}
    <span className="blue"> Configured for development.</span>
    {``}
    <br />
    {`
=> `}
    <span className="blue">listening:</span>
    {` localhost:8000`}
    <br />
    {`
=> `}<span className="blue">logging:</span>{` Normal`}<br />{`
🛰  Mounting `}<span className="blue">'/':</span>{``}<br />{`
=> GET `}<span className="blue">/</span>{`
🚀  Rocket has launched from`}
    <P.B> http://localhost:8000</P.B>
    <span className="blue">...</span>
    {``}
  </TerminalOutput>
}

If we now go to \`http://localhost:8000\`, we should see something remarkably similar to our Node example!

In order to deploy it, we have to specify a \`Dockerfile\` that builds our application and then executes the resulting program.

${
  <Code>
    {`FROM zeithq/rust-nightly
EXPOSE 80
CMD ROCKET_ENV=production cargo run --release`}
  </Code>
}

The only requirements for your \`Dockerfile\` deployments are the last two lines, which indicate:

* What port the app will listen on (\`EXPOSE\`). In this case \`80\` since we're runnning Rocket in production mode.

To deploy, as usual, we run:

${<TerminalInput>now</TerminalInput>}

The output will look like this:

${
  <TerminalOutput>
    {`> Deploying ~/Documents/Projects/now-examples/get-started-docker`}
    <br />
    {`
> No \`name\` LABEL in \`Dockerfile\`, using get-started-docker`}<br />{`
`}
    <span className="cyan">&gt; Ready!</span>
    {` `}
    <ExternalLink href="https://get-started-basic-jcetfercku.now.sh">
      https://get-started-basic-jcetfercku.now.sh
    </ExternalLink>
    {` (copied to clipboard) [1s]`}<br />{`
> Upload [====================] 100% 0.0s
> Sync complete (81B) [1s]`}<br />{`
> Initializing…`}<br />{`
> Building`}<br />{`
> ▲ docker build`}<br />{`
> Step 2 : EXPOSE 80`}<br />{`
> Removing intermediate container 8a2b780aaa6b`}<br />{`
>  ---> Running in 6c9008866835`}<br />{`
>  ---> f6b51fbccc99`}<br />{`
> Step 3 : CMD ROCKET_ENV=production cargo run --release`}<br />{`
> Removing intermediate container 6c9008866835`}<br />{`
>  ---> Running in a42325428f74`}<br />{`
>  ---> 3726617d01c0`}<br />{`
> Removing intermediate container a42325428f74`}<br />{`
> Successfully built 3726617d01c0`}<br />{`
> ▲ Storing image`}<br />{`
> ▲ Deploying image`}<br />{`
> ▲ Container started`}<br />{`
>      Running \`target/release/get-started-docker\``}<br />{`
>     Finished release [optimized] target(s) in 0.7 secs`}<br />{`
`}<span className="cyan">&gt; Deployment complete!</span>{``}
  </TerminalOutput>
}

Your deployment is now ready! To wrap it up, we give it a friendly name using \`alias\`:

${
  <TerminalInput>
    now alias https://get-started-docker-jcetfercku.now.sh get-started-docker
  </TerminalInput>
}

With this, our deployment is immediately accessible via  \`https://get-started-docker.now.sh\`

${
  <TerminalOutput>
    <span className="cyan">&gt; Success!</span>
    {` Alias created `}
    <span className="gray">(kp4B6Gu24hf29Oxe3c64Htgq)</span>
    {`:
`}
    <ExternalLink href="https://get-started-docker.now.sh">
      https://get-started-docker.now.sh
    </ExternalLink>
    {` now points to `}
    <ExternalLink href="https://get-started-docker-jcetfercku.now.sh">
      https://get-started-docker-jcetfercku.now.sh
    </ExternalLink>
    {` `}
    <span className="gray">(ViheH3d25jhLNqJ203Epg8hv)</span>
    {` [copied to clipboard]`}
  </TerminalOutput>
}
`)
