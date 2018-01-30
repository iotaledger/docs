import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, jamo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { Code, InlineCode } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'

// prettier-ignore
export default withDoc({
  title: 'Deploying Static Apps',
  date: '09 March 2017',
  authors: [leo, jamo, rauchg],
  editUrl: 'pages/docs/deployment-types/static.js',
})(markdown(components)`

${<Now color="#000"/>} comes with a native support for static deployments. It considers all projects that don't have a \`Dockerfile\`, nor a \`package.json\` as a static deployment.

Deploying such a static project is still as easy as running a single command:

${<TerminalInput>now</TerminalInput>}

## Under the Hood

The technology behind our servers is a Node.js module called [serve](https://github.com/zeit/serve), which you can download, fork, extend and even operate locally during development.

What does this mean for your team and your business? Great user experience with zero lock-in.

If you can’t wait for us to add a certain capability to our static deployments support, you can just create a \`package.json\` like this:

${
  <Code>{`{
  "name": "extensible",
  "scripts": {
    "start": "serve ."
  },
  "dependencies": {
    "serve": "latest"
  }
}`}</Code>
}

Then run \`now\`, and we will detect the presence of \`package.json\` and deploy it as a \`npm\` deployment.

## Behavior

- If a ${<InlineCode>index.html</InlineCode>} file exists, it will be rendered
- If only a single file was uploaded, the deployment URL will respond with it directly (you can
still access it under its original path  - e.g.: ${<InlineCode>/image.png</InlineCode>})
- When uploading multiple files, a directory listing will be displayed

### Deployment Inactivity

Old deployments always stay around forever if you don't remove them using \`now remove\`.

However, the new static deployments, without the \`package.json\` are **never** put to sleep but are always quickly accessible.
`)
