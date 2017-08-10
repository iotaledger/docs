import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import { InternalLink } from '../../../components/text/link'

// prettier-ignore
export default withDoc({
  title: 'Deployment',
  date: '1 August 2017',
  authors: [arunoda],
})(markdown(components)`

With ▲now, you can deploy any kind of web app by using a single command. ▲now supports three types of deployments:

* ${<InternalLink href="#static-deployment">Static</InternalLink>} - for static web apps
* ${<InternalLink href="#node.js-deployment">Node.js</InternalLink>} - for Node.js apps
* ${<InternalLink href="#docker-deployment">Docker</InternalLink>} - for all other apps

We have special categories for static and Node.js deployments because they are the most common among the deployments we handle. But you can also use Docker to deploy static and Node.js apps.

Here is how each of these deployments work:

## Static Deployment

With static deployment, you can deploy a static web app or a set of assets to ▲now. Visit the directory you want to deploy and run this command:

${<TerminalInput>now</TerminalInput>}

If that directory contains an \`index.html\` file, that file will be served. Otherwise, ▲now will show all the files in that directory.

${
  <Image
    src={`${ASSETS_URL}/docs/deployment/static-dir-listing.png`}
    width={600}
    height={325}
    caption="Directory listing of a static deployment"
  />
}

> For all static deployments, you will be charged only for the bandwidth. You [do not pay](https://zeit.co/blog/unlimited-static) for computing resources and storage.

To learn more about static deployments, read ${<InternalLink href="/docs/deployment-types/static">this guide</InternalLink>}.

## Node.js Deployment

If you have a \`package.json\` file in your app directory, ▲now considers that a valid Node.js deployment. Here is a simple Node.js deployment with the help of [micro](https://github.com/zeit/micro).

We have two files in our app directory. They are:

### index.js

${
  <Code>{`module.exports = () => ({
  date: new Date
})`}</Code>
}

### package.json

${
  <Code>{`{
  "name": "get-started-node",
  "version": "0.1.0",
  "dependencies": {
    "micro": "latest"
  },
  "scripts": {
    "start": "micro"
  }
}`}</Code>
}

To deploy this app, visit the app directory and run this command:

${<TerminalInput>now</TerminalInput>}

▲now will install dependencies and run the \`start\` NPM script, as mentioned in the above \`package.json\` file.

You can also specify a separate build command, select the Node.js runtime and control dependency installation, and do more. To learn about those, read ${<InternalLink href="/docs/deployment-types/node">this guide</InternalLink>}.

## Docker Deployment

If your app directory contains a \`Dockerfile\`, ▲now considers that a valid [Docker](https://www.docker.com/) deployment. It will build a docker image based on the \`Dockerfile\` and start container(s) based on that.

To deploy a simple [Go](https://golang.org/) HTTP server, create a directory and add these two files:

### hello.go

${
  <Code>{`package main

import (
    "io"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        io.WriteString(w, "Hello world!")
    })

    err := http.ListenAndServe(":8000", nil)
    if err != nil {
        panic(err)
    }
}`}</Code>
}

### Dockerfile

${
  <Code>{`FROM golang:alpine
ADD . /go/src/zeit/hello
RUN go install zeit/hello
CMD ["/go/bin/hello"]
EXPOSE 8000`}</Code>
}

Now run this command inside that directory:

${<TerminalInput>now</TerminalInput>}

That's it. You'll get a URL like this: <https://now-go-bkbjirexiu.now.sh>

To learn more about Docker deployments on ▲now, read ${<InternalLink href="/docs/deployment-types/docker">this guide</InternalLink>}.
`)
