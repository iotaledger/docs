import React from 'react'
import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import Deprecated from '../../deprecated'
import pure from '../../../../lib/pure-component'

const H2 = components.h2
const H3 = components.h3

function V2(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      title="Changelog"
      contents={
        // prettier-ignore
        [
  [
    <Container key="container1">{
    markdown(components)`
${<Heading>Version 2.0</Heading>}
${<ReleaseDate>RELEASED 31, OCTOBER 2017</ReleaseDate>}
${<Deprecated><H3>Create a new deployment</H3></Deprecated>}
  `}</Container>
  ],
  [
    <Container key="container2">{
    markdown(components)`
This endpoint has been deprecated. Use ${<InternalLink href="/api#endpoints/deployments/create-a-new-deployment">v2 endpoint</InternalLink>} instead.

Create a new deployment on the fly by supplying an **:id** in the URL and the necessary file data in the body.

The body contains a special key \`package\` that has the \`package.json\` JSON structure. Other keys will represent a file path, with their respective values containing the file contents.

> **NOTE:** The code and logs under the OSS plan will be public.

    `}</Container>,
    markdown(components)`
Endpoint:

${<Code>POST /now/deployments</Code>}

Example request:

${<Code syntax="shell">{`curl -X POST https://api.zeit.co/now/deployments \\
  -H 'Authorization: Bearer ${TOKEN}' \\
  -H 'Content-Type: application/json' \\
  -d '{
  "package": {
    "name": "my-instant-deployment",
    "dependencies": {
      "sign-bunny": "1.0.0"
    },
    "scripts": {
      "start": "node index"
    }
  },
  "server/index.js": "require(\\"http\\").Server((req, res) => {\nres.setHeader(\\"Content-Type\\", \\"text/plain; charset=utf-8\\");\nres.end(require(\\"sign-bunny\\")(\\"Hi there!\\"));\n}).listen();"
}'
`}</Code>}

Example request with a successful (**200**) response:

${<Code>{`{
  "uid": "ChbZiZe84CKtod6rmCIRRvYR",
  "host": "my-instant-deployment-rrucptrbft.now.sh",
  "state": "BOOTED"
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default pure(V2)

class Container extends React.PureComponent {
  render() {
    return (
      <main>
        <div className="line" />
        {this.props.children}
        <style jsx>{`
          main {
            display: flex;
            flex: 1;
          }
          .line {
            border-left: 1px solid #eaeaea;
            padding-left: 30px;
          }
        `}</style>
      </main>
    )
  }
}

class Heading extends React.PureComponent {
  render() {
    return (
      <main>
        <H2>{this.props.children}</H2>
        <style jsx>{`
          main {
            align-items: center;
            display: flex;
            margin-bottom: -20px;
          }
          main::before {
            background: #000;
            border-radius: 100%;
            content: '';
            display: inline-block;
            height: 10px;
            margin-left: -35px;
            margin-right: 25px;
            width: 10px;
          }
        `}</style>
      </main>
    )
  }
}

class ReleaseDate extends React.PureComponent {
  render() {
    return (
      <div className="release-date">
        {this.props.children}
        <style jsx>{`
          .release-date {
            color: #999;
            font-size: 12px;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    )
  }
}
