import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { rauchg, tony } from '../../../lib/data/team'
import { InternalLink } from '../../../components/text/link'
import Now from '../../../components/now/now'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Introduction to now',
  date: '07 Nov 2016',
  authors: [rauchg, tony],
})(markdown(components)`

Throughout our journey building cloud-based applications for companies like **Cloudup** and **WordPress.com**, we found that the single most important contributor to productivity was the quality of the **deployment strategy** involved.

In other words, what does it take for a developer within a team to create, iterate and publish a new product or API? How can they share their ongoing work with others? How can they diagnose problems?

${<Now color="#000" />} is a general solution for hosting and deploying internet services over the HTTP/2 protocol, with a focus on simplicity, speed, security and scale.

These are some examples of applications you can run and scale on our platform:

* API services like [Micro](https://github.com/zeit/micro) or [Express](http://expressjs.com/) (Node.js), Vapor (Swift)
* Chat bots for platforms like [Slack](https://slack.com/) or [Messenger](https://www.messenger.com/)
* Content management software like [WordPress](http://wordpress.com/)
* Sophisticated single page applications with frameworks like [React](http://reactjs.com/), [Ember](http://emberjs.com/) or [Meteor](https://www.meteor.com/)
* Simple HTML websites for marketing or documentation websites

## How Is It Different?

There are several important concepts that make ${<Now color="#000" />} unique. You can read more about it on the ${<InternalLink href="/now">product page</InternalLink>}, but we’ll mention some of the design choices here that are foundational.

## Developer Experience (DX)

We make deployment extremely pleasant for the people who develop products. Programmers and designers find our platform incredibly easy to use without trading off flexibility and scale.

An example is how easy it is to deploy any project in the filesystem. It just takes one command:

${<TerminalInput>now</TerminalInput>}

You can run the above command in your terminal after ${<InternalLink href="/docs/getting-started/installing-now">installing now</InternalLink>}.

The focus on Developer Experience is not merely aesthetic. The goal is to enable greater productivity by reducing the number of skills needed to go to production.

Developers can be **self-sufficient** by not having to learn systems administration and operations from scratch, yet their deployments are secure, enterprise-grade and horizontally scalable.

## Immutable Deployments

Deployment is traditionally encumbered with artificial limitations, such as how many times a day you can push code or how many applications you can run. The UIs and programs that are commonly used are therefore designed around those limitations.

${<Now color="#000" />} has been designed around the idea that cloud resources are completely elastic. Its deployments are immutable, which means that every change you make to an application is simply a **brand new deployment!**

The typical workflow is as follows:

* You make an initial deployment of your application by invoking \`now\`
* ${<Now color="#000" />} returns a unique and random URL that’s only known to the developer
* That URL is a completely new and isolated server within our infrastructure
* If the developer makes a change, they write \`now\` again, getting a new URL server!

Immutable deployment enables teams to **collaborate** better. Developers can share intermediate states (i.e.: in-progress work) with their teams very quickly.

The progress of a project can be examined retrospectively by looking at the history of deployments. In addition, you can rollback an individual service to a former state if a mistake is made.

## API-driven

We recognize that different organizations and businesses will require a wide range of approaches to deployment. For example, certain processes might need to be tested prior to being deployed. Certain users might need to approve changes prior to them reflecting in a production website.

To enable this sort of flexibility, we've taken an API-driven approach to deployment.

* All of the ${<Now color="#000" />} clients are ${<InternalLink href="/oss">open source</InternalLink>}.<br/>
  You can modify them and embed them at will thanks to the use of the liberal **MIT** license.

* We maintain and document an easy-to-use REST API.<br/>
  You can create your own workflows according to different business rules.

* There are no private API calls.<br/>
  There are no capabilities we use in our official clients and applications that is not exposed to the public.

## No Lock-In

We strive to provide effective solutions that don't involve API lock-in. We do this for two reasons:

* Teams can start deploying with ${<Now color="#000"/>} without having to adapt their codebases or techniques.<br/>
  For example, you can deploy any \`package.json\` or \`Dockerfile\` based project without a single change.
* We want our superior user experience and performance to be the lock-in.<br/>
  By providing a standards-compliant solution, we focus on differentiating ourselves simply by a superior service.

We also strive to avoid network lock-in, by only supporting **open protocols** like HTTP/2 and WebSocket.

## Who Is It For?

Our product is designed for anyone who wants to take advantage of cloud computing, from individuals to Fortune 500 companies.

* **Individuals** can deploy products and services easily and scale them automatically.<br/>
  The full power of the cloud at an affordable price.
* **Small teams** can focus on their products without having to hire a dedicated devops team.<br/>
  They can take full advantage of their agility and lower coordination overhead and focus on building great products.
* **Large organizations** can become more agile by deploying alongside legacy systems.<br/>
  Our focus on open standards and protocols makes us completely interoperable and backwards-compatible with legacy systems and existing cloud and on-premise infrastructure.
`)
