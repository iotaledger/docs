import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { arunoda } from '../../../lib/data/team'
import { TerminalInput } from '../../../components/text/terminal'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import Now from '../../../components/now/now'

// prettier-ignore
export default withDoc({
  title: 'Scaling',
  date: '10 August 2017',
  authors: [arunoda],
})(markdown(components)`

Deploying an app is just the start. We need to scale our app as our user base grows. It could be a linear growth or random spikes in certain times. 

Either way, we need to make sure our app is running smoothly as the traffic increases. All the ${<Now color="#000"/>} deployments are backed by "auto scaling ready" infrastructure. So, you are in good hands.

## Basics

Each of your ${<Now color="#000"/>} deployment consists of zero or few instances. An instance is a running version of your deployment. ${<Now color="#000"/>} can clone and run new instances as needed and kill them if they are not needed.

Each deployment has a minimum and maximum amount of instances it can have. Based on that we can scale our app as needed.

## Default Scaling

By default, all of the deployments are configured like this:

* min: 0
* max: 1

This means, when your deployment receives some traffic ${<Now color="#000"/>} will start an instance. If your deployment doesn't receive any traffic for a while, ${<Now color="#000"/>} will kill that instance.

There's a fixed number of concurrent instances you can have based on the [plan](https://zeit.co/account/plan) you've chosen. But with this configuration, you can have as many as deployments you want. 

_Having older deployments which are **not active** cost you nothing._

## Fixed Scaling

As your user base grows, your app could be slower to respond. Because it tries to serve more requests than it could do. 

To resolve this issue, you can scale your app to run a fixed number of instances and they'll run forever.

> You need to have a [paid plan](https://zeit.co/pricing) to do fixed scaling.

Here's how you can do that:

${<TerminalInput>now scale hello-node-lwbxweoqjo.now.sh 3</TerminalInput>}

In this case, ${<Now color="#000"/>} will set the \`min\` and \`max\` instance settings to 3.

${
  <Image
    src={`${ASSETS_URL}/docs/scaling/fixed-scaling.png`}
    width={650}
    height={467}
    caption="The deployment is scaled to 3 instances and you can see the URLs for each of those instances."
  />
}

### With "now alias"

Here, \`hello-node-lwbxweoqjo.now.sh\` is one of our deployment URL. Instead, you can scale a "domain name" you mapped with \`now alias\`.

For an example:

${<TerminalInput>now scale hnode.now.sh 3</TerminalInput>}

Then it'll scale the deployment behind the alias. (in this case, the alias is \`hnode.now.sh\`).

If you run \`now alias\` again, it'll scale the new deployment accordingly and scale down the old deployment to the ${<InternalLink href="/docs/getting-started/scaling#default-scaling">default scaling setup</InternalLink>}.

${
  <Image
    src={`${ASSETS_URL}/docs/scaling/now-alias.png`}
    width={650}
    height={467}
    caption="Aliasing “hello-node-zhlrfgchkd.now.sh” to “hnode” changes it's scaling settings and “hnode”'s previous deployment."
  />
}

## Auto Scaling

Sometimes, your app may receive sudden traffic spikes and it's pretty hard to predict the pattern. Then you need to scale your app based on the traffic. To do that, you can turn on “auto scaling” by using different \`min\` and \`max\` instance values.

> You need to have [the "Pro" plan or a higher plan](https://zeit.co/pricing) to do "auto scaling"

Here's how to auto scale an app with the URL \`hnode.now.sh\`

${<TerminalInput>now scale hnode.now.sh 2 15</TerminalInput>}

Now the deployment behind \`hnode.now.sh\` runs with minimum of 2 instances and it can scale up to 15 instance as the traffic increases.

${<Now color="#000"/>} will automatically start and kill instances based on the traffic \`hnode.now.sh\` receives.

${
  <Image
    src={`${ASSETS_URL}/docs/scaling/auto-scaling.png`}
    width={650}
    height={335}
    caption="Auto scaling in action."
  />
}

## Static Deployments

All the static deployments are infinitely scalable and they are auto scaled by default on all plans.
So, you don't need to invoke \`now scale\` for static deployments.

`)
