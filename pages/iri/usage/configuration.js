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
    <BoldCell>{`--config -c`}</BoldCell>
    <TypeCell>Config INI file that can be used instead of CLI options. See more below</TypeCell>
    <Cell>-c iri.ini</Cell>
  </Row>
  <Row>
    <BoldCell>{`--port -p`}</BoldCell>
    <TypeCell>
      This is a mandatory option that defines the port to be used to send API commands to your node.
    </TypeCell>
    <Cell>-p 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`--neighbors	-n`}</BoldCell>
    <TypeCell>
      Neighbors that you are connected with will be added via this option.
    </TypeCell>
    <Cell>-n "udp://148.148.148.148:14265 tcp://[2001:db8:a0b:12f0::1]:14265"</Cell>
  </Row>
  <Row>
    <BoldCell>{`--udp-receiver-port	-u`}</BoldCell>
    <TypeCell>
      UDP receiver port. Standard port is 14600
    </TypeCell>
    <Cell>-u 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`--tcp-receiver-port	-t`}</BoldCell>
    <TypeCell>
      TCP receiver port. Standard port is 15600
    </TypeCell>
    <Cell>-t 14800</Cell>
  </Row>
  <Row>
    <BoldCell>{`--testnet`}</BoldCell>
    <TypeCell>
      Makes it possible to run IRI with the IOTA testnet
    </TypeCell>
    <Cell>--testnet</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote`}</BoldCell>
    <TypeCell>Remotely access your node and send API commands</TypeCell>
    <Cell>--remote</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote-auth`}</BoldCell>
    <TypeCell>
      Require authentication password for accessing remotely. Requires a correct username:hashedpassword combination
    </TypeCell>
    <Cell>--remote-auth iotatoken:LL9EZFNCHZCMLJLVUBCKJ</Cell>
  </Row>
  <Row>
    <BoldCell>{`--remote-limit-api`}</BoldCell>
    <TypeCell>
      Exclude certain API calls from being able to be accessed remotely
    </TypeCell>
    <Cell>--remote-limit-api "attachToTangle, addNeighbors"</Cell>
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


`)
