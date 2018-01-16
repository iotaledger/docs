import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import { InternalLink } from '../../../text/link'
import {
  OutputTable,
  InputTable,
  HeadersTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  BooleanCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Endpoint from '../../endpoint'
import Request from '../../request'

function Deployments(props) {
  const TOKEN = props.testingToken ? props.testingToken.token : '$TOKEN'

  return (
    <Section
      contents={
        // prettier-ignore
        [
  [
    markdown(components)`
### Create a new deployment
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/now/deployments" />}

Create a new deployment on the fly by supplying all the required data.

Before you create the deployment you need to ${<InternalLink href="/api#endpoints/deployments/upload-deployment-files">upload any required files</InternalLink>} when they cannot be posted at once.

> **NOTE:** The code and logs under the OSS plan will be public.

#### Input
${<InputTable>
  <Row>
    <BoldCell>env</BoldCell>
    <TypeCell>Map</TypeCell>
    <BooleanCell status={false} />
    <Cell>An object containing all the environment variables and his values. <i>It could includes secret keys as values</i>.</Cell>
  </Row>
  <Row>
    <BoldCell>public</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <BooleanCell status={false} />
    <Cell>A boolean indicating if the deployment is public. Every deployment done under the OSS plan will be public.</Cell>
  </Row>
  <Row>
    <BoldCell>forceNew</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <BooleanCell status={false} />
    <Cell>A boolean indicating if a new deployment should be forced (this create a new deployment even if the files are the same as the latest one).</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>A string with the project name used in the deployment URL.</Cell>
  </Row>
  <Row>
    <BoldCell>deploymentType</BoldCell>
    <TypeCell>Enum</TypeCell>
    <BooleanCell status={true} />
    <Cell>A string indicating the type of deployment, it could be <InlineCode>NPM</InlineCode>, <InlineCode>DOCKER</InlineCode> or <InlineCode>STATIC</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>registryAuthToken</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={false} />
    <Cell>A string with the authorization token for private npm modules.</Cell>
  </Row>
  <Row>
    <BoldCell>files</BoldCell>
    <TypeCell>List</TypeCell>
    <BooleanCell status={true} />
    <Cell>A list of maps with the files you want in the deploy.</Cell>
  </Row>
  <Row>
    <BoldCell>engines</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={false} />
    <Cell>A string with the desired Node.js version (<i>only for NPM deployments</i>).</Cell>
  </Row>
  <Row>
    <BoldCell>sessionAffinity</BoldCell>
    <TypeCell>Enum</TypeCell>
    <BooleanCell status={false} />
    <Cell>A string indicating the session affinity algorithm. It could be <InlineCode>ip</InlineCode> or <InlineCode>random</InlineCode>.</Cell>
  </Row>
</InputTable>}

#### File
Each item in the files array could be either a list of inlined files or a list of SHA1 strings used to match with ${<InternalLink href="/api#endpoints/deployments/upload-deployment-files">already uploaded files</InternalLink>}.

##### Inlined files
In the case you want to inline each file inside the create deployment request each item in the ${<InlineCode>files</InlineCode>} key should have the following format:

> **Note**: Inline file either as plain or base64 strings is useful when a deployment have only a few small files you can upload in a single request.

${<InputTable>
  <Row>
    <BoldCell>file</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The file name including the whole path, eg. <InlineCode>folder/file.js</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>data</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The file content, it could be either a base64 (useful for images, etc.) of the files or the plain content for source code.</Cell>
  </Row>
  <Row>
    <BoldCell>encoding</BoldCell>
    <TypeCell>Enum</TypeCell>
    <BooleanCell status={false} />
    <Cell>The file encoding, it must be ${<InlineCode>base64</InlineCode>} or ${<InlineCode>utf-8</InlineCode>}. Defaults to ${<InlineCode>utf-8</InlineCode>}</Cell>
  </Row>
</InputTable>}

##### SHA1 files
In the case you want to first ${<InternalLink href="/api#endpoints/deployments/upload-deployment-files">upload each file</InternalLink>
} and then create a deployment you need to pass the file name and the file content SHA1 which is going to be used to check the integrity and match the requests with the file.

> **Note**: ${<InternalLink href="/api#endpoints/deployments/upload-deployment-files">Upload each file</InternalLink>} and then create the deployment with the SHA1 string is specially useful when you have to either upload many or big files. That allow you to retry file uploads in case of a network error.

${<InputTable>
  <Row>
    <BoldCell>file</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The file name including the whole path, eg. <InlineCode>folder/file.js</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>sha</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The file SHA1 used to check integrity</Cell>
  </Row>
  <Row>
    <BoldCell>size</BoldCell>
    <TypeCell>Integer</TypeCell>
    <BooleanCell status={true} />
    <Cell>The file size in bytes</Cell>
  </Row>
</InputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/deployments"
  method="GET"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "name": "my-instant-deployment",
    "env": {
      "NODE_ENV": "production"
    },
    "public": false,
    "forceNew": true,
    "files": [
      {
        "file": "package.json",
        "sha": "514b5ffa5ef016df7f5f42370157d49f97526a42",
        "size": 145
      },
      {
        "file": "server/index.js",
        "sha": "9d8b952309b28f468919f4a585e18b63a14457f2",
        "size": 161
      }
    ],
    "deploymentType": "NPM",
    "registryAuthToken": "this-is-my-npm-token",
    "engines": "^8.0.0",
    "sessionAffinity": "ip"
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "totalSize": 0,
  "missing": [],
  "deploymentId": "o0kamOwnoWccUDCJCiC5ryLP",
  "url": "my-instant-deployment-vofohcltlm.now.sh",
  "warnings": [],
  "nodeVersion": "8.4.0"
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Upload deployment files
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v2/now/files" />}

Before you create a deployment you need to upload the required files for that deployment. To do it you need to POST each file to this endpoint, after that's completed you'll need to POST to ${<InternalLink href="/api#endpoints/deployments/create-a-new-deployment">create a new deployment</InternalLink>}.

> **Note**: If you need to upload only a few small files for a deployment you could inline them when you're ${<InternalLink href="/api#endpoints/deployments/create-a-new-deployment">creating a new deployment</InternalLink>}.

#### Headers
The POST needs to have the following headers:

${<HeadersTable>
  <Row>
    <BoldCell>Content-Type</BoldCell>
    <Cell>With the value <InlineCode>application/octet-stream</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Content-Length</BoldCell>
    <Cell>The file size in bytes</Cell>
  </Row>
  <Row>
    <BoldCell>x-now-digest</BoldCell>
    <Cell>The file SHA1 used to check integrity.</Cell>
  </Row>
  <Row>
    <BoldCell>x-now-size</BoldCell>
    <Cell>The file size in bytes</Cell>
  </Row>
</HeadersTable>}

The file content must be placed inside the body of the request. In the case of a successful response you'll receive a status code **200** with an empty body.

> **NOTE:** The file name is defined when you create the deployment.

    `,
    markdown(components)`
Example request:

${<Request
  method="POST"
  url="https://api.zeit.co/v2/now/files"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/octet-stream',
    'Content-Length': 145,
    'x-now-digest': '514b5ffa5ef016df7f5f42370157d49f97526a42',
    'x-now-size': 145
  }}
  body={{
  "name": "my-instant-deployment",
  "dependencies": {
    "sign-bunny": "1.0.0"
  },
  "scripts": {
    "start": "node server/index.js"
  }
}}
/>}

${<Request
  method="POST"
  url="https://api.zeit.co/v2/now/files"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/octet-stream',
    'Content-Length': 161,
    'x-now-digest': '9d8b952309b28f468919f4a585e18b63a14457f2',
    'x-now-size': 161
  }}
  body={`require('http').Server((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(require('sign-bunny')('Hi there!'));
}).listen();'`}
/>}
    `
  ],
  [
    markdown(components)`
### List all the deployments
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/deployments" />}

List all the deployments under the account corresponding to the API token.

If a deployment hasn't finished uploading (is incomplete), the \`url\` property will have a value of \`null\`.

Each deployment is an object with the following keys:

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>A string with the unique deployment ID you can use to get more information or remove it.</Cell>
  </Row>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A string with the deployment under which the deployment was created.</Cell>
  </Row>
  <Row>
    <BoldCell>url</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A string with the unique URL of the deployment. If it hasn't finished uploading (is incomplete), the value will be <InlineCode>null</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>created</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A number containing the date when the deployment was created (<i>in timestamp</i>).</Cell>
  </Row>
  <Row>
    <BoldCell>state</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>A string with the current deployment state, it could be one of the following <InlineCode>DEPLOYING</InlineCode>, <InlineCode>DEPLOYMENT_ERROR</InlineCode>, <InlineCode>BOOTED</InlineCode>, <InlineCode>BUILDING</InlineCode>, <InlineCode>READY</InlineCode>, <InlineCode>BUILD_ERROR</InlineCode> or <InlineCode>FROZEN</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>A string defining the deployment type, it could be: <InlineCode>NPM</InlineCode>, <InlineCode>DOCKER</InlineCode> or <InlineCode>STATIC</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>scale</BoldCell>
    <TypeCell>Map</TypeCell>
    <Cell>An object with the current <InternalLink href="/docs/getting-started/scaling">scale configuration</InternalLink> of the deployment.</Cell>
  </Row>
</OutputTable>}

#### Scale configuration
The scale configuration object always have the following structure:

${<OutputTable>
  <Row>
    <BoldCell>current</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>A number with the current amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>min</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>A number with the minimum possible amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>max</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>A number with the maximum possible amount of instances.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/deployments"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "deployments": [
    {
      "uid": "7Npest0z1zW5QVFfNDBId4BW",
      "name": "project-a",
      "url": "project-bfzfxvjaewj.now.sh",
      "created": "1460801613968"
      "state": "READY",
      "type": "NPM",
      "scale": {
          "current": 1,
          "min": 1,
          "max": 10
      }
    },
    {
      "uid": "dOgCUIoovYiYmXbrLX0h9qDk",
      "name": "project-b",
      "url": "project-b-iipihlfrpa.now.sh",
      "created": "1462738579605"
      "state": "BUILD_ERROR",
      "type": "NPM",
      "scale": {
          "current": 0,
          "min": 0,
          "max": 1
      },
      {
        "uid": "32h0AAaCEFAYVCiCyDBTQ0HU",
        "name": "project-c",
        "url": "project-c-mqqsssshze.now.sh",
        "created": "1505254885404",
        "state": "FROZEN",
        "type": "NPM",
        "scale": {
            "current": 0,
            "min": 0,
            "max": 1
        }
      }
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get a single deployment
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/deployments/:id" />}

This API allows you to retrieve a deployment by supplying its **:id** in the URL.

You can obtain this, for example, by ${<InternalLink href="/api#endpoints/deployments/get-/now/deployments">listing all deployments</InternalLink>}.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>A string with the unique deployment ID you can use to get more information or remove it.</Cell>
  </Row>
  <Row>
    <BoldCell>host</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>A string with the unique URL of the deployment. If it hasn't finished uploading (is incomplete), the value will be `null`.</Cell>
  </Row>
  <Row>
    <BoldCell>state</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>A string with the current deployment state, it could be one of the following: <InlineCode>DEPLOYING</InlineCode>, <InlineCode>DEPLOYMENT_ERROR</InlineCode>, <InlineCode>BOOTED</InlineCode>, <InlineCode>BUILDING</InlineCode>, <InlineCode>READY</InlineCode>, <InlineCode>BUILD_ERROR</InlineCode> or <InlineCode>FROZEN</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>A string defining the deployment type, it could be <InlineCode>NPM</InlineCode>, <InlineCode>DOCKER</InlineCode> or <InlineCode>STATIC</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>stateTs</BoldCell>
    <TypeCell>Date</TypeCell>
    <Cell>The last time when the deployment state has changed.</Cell>
  </Row>
  <Row>
    <BoldCell>scale</BoldCell>
    <TypeCell>Map</TypeCell>
    <Cell>An object with the current <InternalLink href="/docs/getting-started/scaling">scale configuration</InternalLink> of the deployment.</Cell>
  </Row>
</OutputTable>}

#### Scale configuration
The scale configuration object will always be an object with the following structure:

${<OutputTable>
  <Row>
    <BoldCell>min</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>A number with the minimum possible amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>max</BoldCell>
    <TypeCell>Number</TypeCell>
    <Cell>A number with the maximum possible amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>auto</BoldCell>
    <TypeCell>Boolean</TypeCell>
    <Cell>A boolean indicating if the deployment has auto-scale active.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/deployments/ChbZiZe84CKtod6rmCIRRvYR"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`{
  "uid": "ChbZiZe84CKtod6rmCIRRvYR",
  "host": "my-instant-deployment-rrucptrbft.now.sh",
  "state": "READY",
  "stateTs": "2017-09-22T18:03:44.546Z",
  "scale": {
    "min": 0,
    "max": 1,
    "auto": true
  }
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Delete a deployment
    `
  ],
  [
    markdown(components)`
${<Endpoint method="DELETE" url="/v2/now/deployments/:id" />}

This API allows you to delete a deployment by supplying its **:id** in the URL.
You can obtain the ID, for example, by ${<InternalLink href="/api#endpoints/deployments/get-/now/deployments">listing all deployments</InternalLink>}.
    `,
    markdown(components)`
Example request:

${<Request
  method="DELETE"
  url="https://api.zeit.co/v2/now/deployments/ChbZiZe84CKtod6rmCIRRvYR"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}
    `
  ],
  [
    markdown(components)`
### List deployment files
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/deployments/:id/files" />}

This API allows you to retrieve the file structure of a deployment by supplying its **:id** in the URL.

The body will contain entries for each child and directory, coupled with an ID of the file for content download.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>name</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The name of the file.</Cell>
  </Row>
  <Row>
    <BoldCell>type</BoldCell>
    <TypeCell>Enum</TypeCell>
    <Cell>If it's a <InlineCode>file</InlineCode> or a <InlineCode>directory</InlineCode>.</Cell>
  </Row>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The unique ID of the file (only valid for <InlineCode>file</InlineCode> type)</Cell>
  </Row>
  <Row>
    <BoldCell>children</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>The children files of the directory (only valid for <InlineCode>directory</InlineCode> type).</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v2/now/deployments/ChbZiZe84CKtod6rmCIRRvYR/files"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`[
  {
    "name": "server",
    "type": "directory",
    "children": [
      {
        "name": "index.js",
        "type": "file",
        "uid": "2d4aad419917f15b1146e9e03ddc9bb31747e4d0"
      }
    ]
  },
  {
    "name": "package.json",
    "type": "file",
    "uid": "9acbc0dc48cb0e146a97db2ac386569dc4ff031d"
  }
]`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get a single file content
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v2/now/deployments/:id/files/:fileId" />}

This API allows you to retrieve the file data of a file associated with a deployment by supplying its **:id** and **:fileId** in the URL.

The body will contain the raw content of the file
    `,
    markdown(components)`
Example request:

${<Request
  method="https://api.zeit.co/v2/now/deployments/ChbZiZe84CKtod6rmCIRRvYR/files/2d4aad419917f15b1146e9e03ddc9bb31747e4d0"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example successful (**200**) response:

${<Code>{`require("http").Server((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(require("sign-bunny")("Hi there!"));
}).listen();`}</Code>}
    `
  ],
  [
    markdown(components)`
### Get deployment instances
    `
  ],
  [
    markdown(components)`
${<Endpoint method="GET" url="/v1/now/deployments/:id/instances" />}

Get the list of instances unique URL of a deployment.

#### Output
${<OutputTable>
  <Row>
    <BoldCell>instances</BoldCell>
    <TypeCell>List</TypeCell>
    <Cell>A list of maps with the instance information</Cell>
  </Row>
</OutputTable>}

#### Instance
${<OutputTable>
  <Row>
    <BoldCell>uid</BoldCell>
    <TypeCell>ID</TypeCell>
    <Cell>The instance unique identifier.</Cell>
  </Row>
  <Row>
    <BoldCell>url</BoldCell>
    <TypeCell>String</TypeCell>
    <Cell>The instance unique url. Is the deployment unique URL with the instance ${<InlineCode>uid</InlineCode>} added before ${<InlineCode>.now.sh</InlineCode>}.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v1/now/deployments/DguxFCKb5RdNmTw20KGwb42H/instances"
  headers={{
    Authorization: `Bearer ${TOKEN}`
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "instances": [
    {
      "uid": "ce78d91573fedfff4e6577a8",
      "url": "my-app-oiqkcxsmuf-ce78d91573fedfff4e6577a8.now.sh"
    }
  ]
}`}</Code>}
    `
  ],
  [
    markdown(components)`
### Set scale configuration
    `
  ],
  [
    markdown(components)`
${<Endpoint method="POST" url="/v1/now/deployments/:id/instances" />}

Configure the minimum and maximum amount of instances desired for the given deployment.

> **Note**: The deployment *must* be on the ${<InlineCode>READY</InlineCode>} state to scale it.

#### Input
${<InputTable>
  <Row>
    <BoldCell>min</BoldCell>
    <TypeCell>Integer</TypeCell>
    <BooleanCell status={true} />
    <Cell>The desired minimum amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>max</BoldCell>
    <TypeCell>Integer</TypeCell>
    <BooleanCell status={true} />
    <Cell>The desired maximum amount of instances.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>min</BoldCell>
    <TypeCell>Integer</TypeCell>
    <Cell>The new minimum amount of instances.</Cell>
  </Row>
  <Row>
    <BoldCell>max</BoldCell>
    <TypeCell>Integer</TypeCell>
    <Cell>The new maximum amount of instances.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="https://api.zeit.co/v1/now/deployments/2sS6QiQppD9moBzhmX34Y21H/instances"
  method="POST"
  headers={{
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }}
  body={{
    "min": 1,
    "max": 10
  }}
/>}

Example response:

${<Code syntax="json">{`{
  "min": 1,
  "max": 10
}`}</Code>}
    `
  ]
]
      }
    />
  )
}

export default pure(Deployments)
