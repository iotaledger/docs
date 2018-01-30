import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { leo, rauchg } from '../../../lib/data/team'
import Now from '../../../components/now/now'
import { InternalLink } from '../../../components/text/link'
import { Code, InlineCode } from '../../../components/text/code'
import { TerminalInput } from '../../../components/text/terminal'
import { Table, Row, Column } from '../../../components/table'

// prettier-ignore
export default withDoc({
  title: 'Now\'s Command Line Interface',
  date: '09 Mar 2017',
  authors: [leo, rauchg],
  editUrl: 'pages/docs/features/now-cli.js',
})(markdown(components)`

The \`now\` CLI is the main interface to the now cloud.

It's available on Mac, Linux and Windows either via \`npm\` or as pre-built binaries. The recommended installation mechanism is by installing Now ${<InternalLink href="/download">Desktop</InternalLink>} which also ensures it's always up-to-date.

While the default behavior of \`now\` is to deploy, it also has a variety of sub-commands grouped by different concerns.

## Commands

Here's the full list of all command available and what you can do with them:

### Cloud

The commands you should remember when working with now daily:

${
  <Table>
    <Row header>
      <Column>Syntax</Column>
      <Column>Description</Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now deploy [path]</InlineCode>
      </Column>
      <Column>
        When you invoke
        {' '}
        <InlineCode>now</InlineCode>
        , the files within the current directory will be uploaded
        to
        {' '}
        <Now color="#000" />
        {' '}
        and a new deployment will be created. After that, you'll instantly receive its
        URL so that you can share it with other people around the globe.
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now ls|list [app]</InlineCode>
      </Column>
      <Column>
        Show a list of all deployments. If
        {' '}
        <InlineCode>[app]</InlineCode>
        {' '}
        is defined, it will only
        list the deployments under that namespace.
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now rm|remove [id]</InlineCode>
      </Column>
      <Column>
        Remove a deployment from our platform. The
        {' '}
        <InlineCode>[id]</InlineCode>
        {' '}
        parameter can either be
        the URL of your deployment (e.g.
        {' '}
        <InlineCode>https://static-ytbbrhoggd.now.sh</InlineCode>
        {' '}
        or the hostname (e.g.
        {' '}
        <InlineCode>static-ytbbrhoggd.now.sh</InlineCode>
        ).
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now ln|alias [id] [url]</InlineCode>
      </Column>
      <Column>
        Let's you configure an alias for an existing deployment. You can read more about how
        to take the maximum of functionality out of this sub command
        {' '}
        <InternalLink href="/docs/features/aliases">
          here
        </InternalLink>
        .
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now domains [name]</InlineCode>
      </Column>
      <Column>
        Allows you to manage your domain names directly from the command line (before using
        them as aliases with
        {' '}
        <InlineCode noWrap>now alias</InlineCode>
        ). Read more about it
        {' '}
        <InternalLink href="/docs/features/aliases">
          here
        </InternalLink>
        .
      </Column>
    </Row>

    <Row>
      <Column><InlineCode noWrap>now certs [cmd]</InlineCode></Column>
      <Column>
        By default,
        {' '}
        <Now color="#000" />
        {' '}
        will automatically provision certificates for your deployments. Using this sub command, you can
        see when they're expiring and upload your own ones (
        <InternalLink href="/docs/features/certs">
          read more
        </InternalLink>
        ).
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now secrets [name]</InlineCode>
      </Column>
      <Column>
        <InternalLink href="/docs/features/env-and-secrets">
          Read more
        </InternalLink>
      </Column>
    </Row>

    <Row>
      <Column><InlineCode noWrap>now dns [name]</InlineCode></Column>
      <Column>
        <InternalLink href="/docs/features/dns">
          Read more
        </InternalLink>
      </Column>
    </Row>

    <Row>
      <Column><InlineCode noWrap>now open</InlineCode></Column>
      <Column>
        Running this sub command will open the latest deployment of the project within the current
        directory in your default browser (aliases won't be respected).
      </Column>
    </Row>
  </Table>
}

### Administrative

Help you to manage your account straight from your terminal:

${
  <Table>
    <Row header>
      <Column>Syntax</Column>
      <Column>Description</Column>
    </Row>

    <Row>
      <Column><InlineCode noWrap>now billing|cc</InlineCode></Column>
      <Column>
        Easily add or remove credits cards from your account and adjust billing methods.
      </Column>
    </Row>

    <Row>
      <Column>
        <InlineCode noWrap>now upgrade|downgrade [plan]</InlineCode>
      </Column>
      <Column>
        Switch your plan from within the command line interface. Even after the command is run,
        we don't require you to use a web interface. The whole process happens directly in your terminal.
      </Column>
    </Row>
  </Table>
}

To show the list of sub commands and options in your terminal, run this command:

${<TerminalInput>now help</TerminalInput>}

## Selecting Files and Directories to Be Uploaded

${<Now color="#000" />} uses the metafiles inside your project to determine which files and directories should be uploaded to our platform and which ones should be ignored:

* If \`.gitignore\` exists, we don't upload the contents that are defined in it
* If \`.npmignore\` exists, we don't upload the contents that are defined in it and ignore the existence of .gitignore

But it will get a little tricky if you're using the \`files\` property inside \`package.json\`: In that case, we follow [npm](https://www.npmjs.com/)'s behaviour. This means that if \`files\` exists (which as [per definition](https://docs.npmjs.com/files/package.json#files) defines which files **should** be uploaded), \`.npmignore\` will take precedence and have the final word on which items will be uploaded to ${<Now color="#000" />}.

This means that if you want to specify a list of files that should **never be ignored** when it comes to now, you should either use the \`now.files\` (not \`files\`) property inside \`package.json\` or the \`files\` property inside \`now.json\`:

${
  <Code>
    {`"files": [
  "hello.png",
  "dist"
]`}
  </Code>
}

You can learn more about how to use this property ${<InternalLink href='/docs/features/configuration#"files"-(array)'>here</InternalLink>}.
`)
