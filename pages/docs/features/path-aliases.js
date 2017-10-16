import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, jamo } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Simplyfing Microservices with Path Alias',
  date: '15 Mar 2017',
  authors: [leo, jamo],
})(markdown(components)`
With the microservices architecture, we break down the whole app into multiple independent programs: microservices. This architecture gives us a lot of benefits including:

- **Parallelize** workload by distributing ownership and responsibility across different teams.
- **Mix up** different languages, frameworks and even varied versions of those.
- **Scale** easily by adding more resources to independent microservices as needed.

With this architecture, now we have to deal with a lot of microservices. However, exposing them to the public is not a good idea. If we can hide these microservices under a single domain name, that will give us better results.

For example, let's say our app has two microservices as shown below:

${<Code>{`- ui.our-domain.com
- api.our-domain.com
`}</Code>}

As it is not a good idea to expose these urls to the public, we can map these services into our main domain like this:

${<Code>{`- our-domain.com/api/** -> api.our-domain.com
- our-domain.com/** -> ui.our-domain.com
`}</Code>}

As our app evolves, we need to split the \`ui\` microservice into two: \`frontend\` and \`admin\`. We also need to add a new microservice for \`/api/register\` to handle the increasing load.

We can do a new mapping like this:

${<Code>{`- our-domain.com/api/register -> api-register.our-domain.com
- our-domain.com/api/** -> api.our-domain.com
- our-domain.com/admin/** -> admin.our-domain.com
- our-domain.com/** -> frontend.our-domain.com
`}</Code>}

After this, we will have whole new microservices set up. However, our end users do not need to know about these changes.

> Hence, with this setup we can manage the architecture of our microservices and change them at will without downtime or having to notify users.

## Path Alias

If you [manage](/docs/getting-started/assign-a-domain-name#2.-using-a-custom-domain,-managed-by-now) your domain inside ZEIT or [point it](/docs/getting-started/assign-a-domain-name#4.-using-a-custom-domain-with-a-cname) to \`alias.zeit.co\`, you can hide microservices under a domain as shown above with our "Path Alias" feature.

Here's how to do it.

Create a file called \`rules.json\` and add the following content:

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "api-register-wcepelgodl.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" },
    { "dest": "ui-dbuyejqwio.now.sh" }
  ]
}
`}</Code>}

Then run the following command:

${<TerminalInput>now alias our-domain.com -r rules.json</TerminalInput>}

Every time you run the above command, the rules for \`our-domain.com\` will be updated without any downtime.

## API

As you have seen in the above example, you can define a set of rules. These rules are executed **in order**. An incoming HTTP request will be sent to the destination mentioned in the first matching rule.

A rule should contain the \`dest\` field and one or many optional fields including \`pathname\` and \`method\`. Here's a detailed definition of each of these fields.

#### dest

The destination of each rule should be one of the following:

- The unique now deployment url like \`mysite-wcepelgodl.now.sh\`
- An alias like \`our-app-ui.now.sh\`
- An external hostname that may not point to a \`now.sh\` deployment.

> You can get the original hostname from the \`x-forwarded-host\` header.

### pathname (optional)

Incoming HTTP requests will be matched with the pathname format defined in the rule. The \`pathname\` field could have one of the following formats:

* **/api/register** - A strict path match
* **/user/*/profile** - A wildcard rule matches pathnames like \`/user/rauchg/profile\`
* **/api/**** - A wildcard rule matches pathnames with multiple segments like \`/api/user/email\` or \`/api/login\`

If there is no \`pathname\` field, all the requests will be a candidate for the rule (it is similar to having \`/**\` as the value for \`pathname\`).

Additionally the pathname will be forwarded to the destination as is. Here are some examples:

${<Code>{`- /api/register -> my-api-register.now.sh/api/register
- /user/rauchg/profile -> my-ui.now.sh/user/rauchg/profile
- /api/v2/user/info -> my-api.now.sh/api/v2/user/info
`}</Code>}

### methods (optional)

This is a list of HTTP method types that the rule supports. It can have one or many methods like this:

${<Code>{`{ "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" }
`}</Code>}

If there is no \`methods\` field, requests with any HTTP method will be a candidate for the rule.

## Managing Rules

Have a look at the rules we have introduced previously:

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "api-register-wcepelgodl.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "api-tuhpdtgoja-now.sh" },
    { "dest": "ui-dbuyejqwio.now.sh" }
  ]
}
`}</Code>}

Destinations of these rules are unique ${<Now color="#000" />} deployment urls. They will be changed every time you deploy a new version. Therefore, you need to update the rules again and again.

It works, but there is a better way to do this.

Have a look at the following set of rules.

${<Code>{`{
  "rules": [
    { "pathname": "/api/register", "methods": ["POST"], "dest": "my-api-register.now.sh" },
    { "pathname": "/api/**", "methods": ["GET", "POST"], "dest": "my-api.now.sh" },
    { "dest": "my-ui.now.sh" }
  ]
}
`}</Code>}

Now for the \`dest\` field, instead of the deployment url (\`api-tuhpdtgoja-now.sh\`), we now have an alias (\`my-api.now.sh\`).

Then we only need to set these rules once, unless you change the microservices setup.

With this setup, let's say you've deployed a new version of the "api microservice" and its deployment url is \`api-iewodtfalq-now.sh\`.

Now simply map it to the alias like this:

${<TerminalInput>now alias api-iewodtfalq-now.sh my-api.now.sh</TerminalInput>}

You don't need to update path alias rules since \`my-api.now.sh\` points to the latest deployment.
`)
