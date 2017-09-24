import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, jamo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import Image from '../../../components/image'
import { Code } from '../../../components/text/code'
import Caption from '../../../components/text/caption'

// prettier-ignore
export default withDoc({
  title: 'Making Microservices Look Like a Monolith',
  date: '15 Mar 2017',
  authors: [leo, jamo],
})(markdown(components)`

The microservice API architecture has a lot of undisputed benefits. By breaking down your program into smaller independent pieces, teams find it easier to…

* **Parallelize** their work.<br/>
  Ownership and responsibility are more naturally distributed.
* **Mix up** different programming languages, frameworks and even run them at different versions.<br/>
  It's much easier to evolve when no migrations of large codebases are involved.
* **Scale**, detect performance bottlenecks and isolate failures.<br/>
  The overall system tends to be more resilient and easier to analyze.

Yet two big challenges commonly follow: **coordination** and **simulation**.

To solve this problem, we added a new feature to \`now alias\`, which makes composing and coordinating services a breeze. We will also explain how developers can effectively simulate and iterate on a cluster of microservices with the ${<Now color="#000" />} architecture.

## Build with Microservices. Serve as a Monolith.

Before we introduced path aliases, it was commonplace to launch services with \`now\` and later assign them a new, usually more accesible, URL via \`now alias\`.

For example, if you deploy our [Node.js microservice](https://github.com/now-examples/get-started-node) you get a URL that looks like this: \`api-auth-ybqnmnovxg.now.sh\`. It's immutable and unique to that point-in-time.

${
  <Image
    src={`${IMAGE_ASSETS_URL}/docs/path-aliases/deployment.png`}
    width={533}
    height={380}
    caption="An example of a simple Node.js deployment, live at api-auth-ybqnmnovxg.now.sh."
  />
}

After that, you could run \`now alias api-auth-ybqnmnovxg.now.sh auth.api.my-company.com\`. That would point your new microservice to a more friendly sub-domain.

This model works remarkably well for development and staging. It allows me to maintain an unlimited number of copies of my service online, and I can test them in a real environment.

But, how do I go from that to, for example, exposing it as \`my-company.com/api/auth?\` After all, the end-users of our applications or consumer of our APIs don't care about our underlying software architecture.

In fact, pointing clients to different domains and sub-domains can be downright expensive:

* Extra DNS lookups and TCP connections will be required when starting up.
* Browsers will require [CORS headers](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing), which will increase the complexity of your codebase and the length of the responses.
* In some cases, User Agents will [pre-flight requests](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Preflight_example) to different origins. If \`company.com\` talks to \`api.company.com\`, you might incur in extra roundtrips for every request!

From the perspective of a consumer, the best possible interface is a **monolith**.

## Alias Rules

If you're using our ${<InternalLink href="/download#command-line">command line interface</InternalLink>}, you're able to pass a very simple [JSON](https://en.wikipedia.org/wiki/JSON) file to the \`now alias\` command with a list of forwarding rules for your domains or sub-domains:

${<Code>{`$ now alias company.com -r rules.json`}</Code>}
${
  <Caption>
    Every time your run this command, the rules for
    {' '}
    <Caption.Code>company.com</Caption.Code>
    {' '}
    are updated without any downtime.
  </Caption>
}

The file looks like this:

${
  <Code>
    {`{
  "rules": [
    { "pathname": "/api/auth", "dest": "auth.api.company.com" },
    { "pathname": "/api/users", "dest": "users.api.company.com" },
    { "pathname": "/u/**", "dest": "profiles.company.com" },
    { "dest": "www.company.com" }
  ]
}`}
  </Code>
}

${
  <Caption>
    An example of
    {' '}
    <Caption.Code>rules.json</Caption.Code>
    {' '}
    with 4 custom forwarding rules.
  </Caption>
}

This means if an user goes to \`company.com/api/auth\` he's going to see that URL in the browser but internally the request will go to \`auth.api.company.com/api/auth\` (yes the \`pathname\` is appended to the \`dest\` URL).

Here are some of the main characteristics of the system we're excited about.

### 1. Atomic
Not a single request is dropped while or after the rules are loaded. You can run the command with confidence adding, subtracting or modifying rules.

### 2. Idempotent
If any of the rules remain the same, the system's performance is not impacted and no errors occur.

### 3. Versionable
You can check in your rules to source control (e.g.: [GitHub](https://github.com/)) and keep track of the evolution of your architecture. Your team can review and discuss changes in pull requests. You can even automate synchronizing the rules in [CI](https://en.wikipedia.org/wiki/Continuous_integration)!

### 4. Flexible
Rules can include glob like wildcards (\`*\` and \`**\`) to enable very flexible matching. You can specify a particular method (\`"method": "GET"\`) or a set of them (\`["POST", "GET"]\`). The rules are matched in the order they are specified.

### 5. Universal
If the \`dest\` field of a given rule resolves to a now deployment or alias URL, we detect it and turn on intra-cluster optimizations.

If it's an **external URL**, we act as a proxy, in line with our mission of gluing the cloud together through incremental changes and **avoiding expensive migrations**.

### 6. Unlimited
As said above, one of the remaining challenges with microservices is **simulation**. For example, if you are a developer tasked with improving the company's login experience, you might need to make changes to both the auth microservice and the frontend app.

With ${<Now color="#000" />}, you can push out your modified endpoint, modify the rules and clone them into a new location. For example, \`staging.company.com\` can be exactly the same as \`company.com\`, with the \`/api/auth\` rule pointing to the new microservice and the last (fallback) rule pointing to the modified website.

There are no limits to the number of times you can deploy or how many aliases you can create!
`)
