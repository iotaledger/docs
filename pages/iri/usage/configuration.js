import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'
import { TerminalInput } from '../../../components/text/terminal'
import { Code } from '../../../components/text/code'
import {
  Table,
  Row,
  Cell,
  TypeCell,
  BoldCell
} from '../../../components/api/table'
import { lewi } from '../../../lib/data/team'

// prettier-ignore
export default withDoc({
  title: 'Configuration',
  date: '12 March 2018',
  authors: [lewi],
  editUrl: 'pages/iri/usage/configuration.js',
})(markdown(components)`

Running IRI is incredibly simple. You can launch it using the 
command below and passing parameters inline or using a configuration
file.

## Running without a .INI file

${<TerminalInput>{`java -jar iri.jar -p 14600`}</TerminalInput>}

In order for IRI to be functional, you will need to find 
neighbors (see next section). 

As such, you can connect to your neighbors with either 
protocol. In order to get the most out of IRI, we have also 
made a set of flags available for you.

${<Table>
  <Row>
    <BoldCell>Option</BoldCell>
    <BoldCell>Description</BoldCell>
    <TypeCell>Example</TypeCell>
  </Row>
  <Row>
    <BoldCell>{`-c`}</BoldCell>
    <Cell>Config INI file that can be used instead of CLI options. See more below</Cell>
    <Cell>-c iri.ini</Cell>
  </Row>
  <Row>
    <BoldCell>{`-p`}</BoldCell>
    <Cell>
      This is a mandatory option that defines the port to be used to send API commands to your node.
    </Cell>
    <Cell>-p 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`-n`}</BoldCell>
    <Cell>
      Neighbors that you are connected with will be added via this option.
    </Cell>
    <Cell>-n "udp://148.148.148.148:14265 tcp://[2001:db8:a0b:12f0::1]:14265"</Cell>
  </Row>
  <Row>
    <BoldCell>{`-u`}</BoldCell>
    <Cell>
      UDP receiver port. Standard port is 14600
    </Cell>
    <Cell>-u 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`-t`}</BoldCell>
    <Cell>
      TCP receiver port. Standard port is 15600
    </Cell>
    <Cell>-t 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`--testnet`}</BoldCell>
    <Cell>
      Makes it possible to run IRI with the IOTA testnet
    </Cell>
    <Cell>--testnet</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote`}</BoldCell>
    <Cell>Remotely access your node and send API commands</Cell>
    <Cell>--remote</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote-auth`}</BoldCell>
    <Cell>
      Require authentication password for accessing remotely. Requires a correct username:hashedpassword combination
    </Cell>
    <Cell>--remote-auth iotatoken:LL9EZFNCHZCMLJLVUBCKJ</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote-limit-api`}</BoldCell>
    <Cell>
      Exclude certain API calls from being able to be accessed remotely
    </Cell>
    <Cell>--remote-limit-api "attachToTangle, addNeighbors"</Cell>
  </Row>
  <Row>
    <BoldCell>{`--send-limit`}</BoldCell>
    <Cell>
      Limit the outbound bandwidth consumption. Limit is set to mbit/s
    </Cell>
    <Cell>--send-limit 1.0</Cell>
  </Row>
  <Row>
    <BoldCell>{`--max-peers`}</BoldCell>
    <Cell>
      Limit the number of max accepted peers. Default is set to 0 (mutual tethering)    </Cell>
    <Cell>--max-peers 8</Cell>
  </Row>
  <Row>
    <BoldCell>{`--dns-resolution-false`}</BoldCell>
    <Cell>
      Ignores DNS resolution refreshing
    </Cell>
    <Cell>--dns-resolution-false</Cell>
  </Row>
</Table>}

## Configuring using an .INI File

You can also provide an ini file to store all of your command line 
options and easily update (especially neighbors) if needed. You 
can enable it via the --config flag. 

Here is an example INI file:

${<Code>{`[IRI]
PORT = 14700
UDP_RECEIVER_PORT = 14700
NEIGHBORS = udp://my.favorite.com:15600
IXI_DIR = ixi
HEADLESS = true
DEBUG = true
TESTNET = true
DB_PATH = db
`}</Code>}

To run IRI with this .INI file, given its named \`iri.ini\`, use this
command:

${<TerminalInput>{`java -jar iri.jar -c iri.ini`}</TerminalInput>}

## Use .INI file with Docker

Create an iota.ini file with all of your configuration 
variables set in it. Any that you don't provide in here 
will be assumed to be default or taken from command line 
arguments.

${<TerminalInput>{`docker run -d --net=host --name iota-node -p 14265:14265 -p 14777:14777/udp -p 15777:15777 -v iota.ini:/iri/iota.ini iotaledger/iri:latest`}</TerminalInput>}


`)
