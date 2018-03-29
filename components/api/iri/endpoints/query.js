import markdown from 'markdown-in-js'
import Section, { components } from '../../section'
import { Code, InlineCode } from '../../../text/code'
import {
  InputTable,
  OutputTable,
  Row,
  Cell,
  TypeCell,
  BoldCell,
  BooleanCell
} from '../../table'
import pure from '../../../../lib/pure-component'
import Request from '../../request'

function Query() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
## getTips
    `
  ],
  [
    markdown(components)`

Returns the list of tips.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTips</InlineCode></Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>hashes</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of hashes of unreferences transactions.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "getTips"}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "hashes": [
        "YVXJOEOP9JEPRQUVBPJMB9MGIB9OMTIJJLIUYPM9YBIWXPZ9PQCCGXYSLKQWKHBRVA9AKKKXXMXF99999", 
        "ZUMARCWKZOZRMJM9EEYJQCGXLHWXPRTMNWPBRCAGSGQNRHKGRUCIYQDAEUUEBRDBNBYHAQSSFZZQW9999",
        "QLQECHDVQBMXKD9YYLBMGQLLIQ9PSOVDRLYCLLFMS9O99XIKCUHWAFWSTARYNCPAVIQIBTVJROOYZ9999"
    ], 
    "duration": 4
  }`}</Code>}
    `
  ],
  [
    markdown(components)`
## findTransactions
    `
  ],
  [
    markdown(components)`

Find the transactions which match the specified input and return. All input 
values are lists, for which a list of return values (transaction hashes), in 
the same order, is returned for all individual elements. The input fields 
can either be bundles, addresses, tags or approvees. 

>Using multiple of these input fields returns the **intersection** of the values.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>findTransactions</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>bundles</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of bundle hashes. The hashes need to be extended to 81chars by padding the hash with 9's.</Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>tags</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of tags. Has to be 27 trytes.</Cell>
  </Row>
  <Row>
    <BoldCell>approvees</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={false} />
    <Cell>List of approvees of a transaction.</Cell>
  </Row>
</InputTable>}

#### Returned Values

The transaction hashes which are returned depend on your input.
For each specified input value, the command will return the following:

${<OutputTable>
  <Row>
    <BoldCell>bundles</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which contain the specified bundle hash.</Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which have the specified address as an input/output field.</Cell>
  </Row>
  <Row>
    <BoldCell>tags</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which have the specified address as an input/output field.</Cell>
  </Row>
  <Row>
    <BoldCell>approvees</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Returns transaction hashes which reference (i.e. confirm) the specified transaction.</Cell>
  </Row>
</OutputTable>}

#### Output
${<OutputTable>
    <Row>
      <BoldCell>hashes</BoldCell>
      <TypeCell>Array</TypeCell>
      <Cell>List of hashes which relate to the queries entered.</Cell>
    </Row>
  </OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "findTransactions", "addresses": ["RVORZ9SIIP9RCYMREUIXXVPQIPHVCNPQ9HZWYKFWYWZRE9JQKG9REPKIASHUUECPSQO9JT9XNMVKWYGVAZETAIRPTM"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    hashes: [ 
      'ZJVYUGTDRPDYFGFXMKOTV9ZWSGFK9CFPXTITQLQNLPPG9YNAARMKNKYQO9GSCSBIOTGMLJUFLZWSY9999' 
    ], 
    "duration": 4
  }`}</Code>}
    `
  ],
  [
    markdown(components)`
## getTrytes
    `
  ],
  [
    markdown(components)`

Returns the trytes of a transaction.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTips</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>hashes</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>Array of transaction hashes of which you want to get trytes from.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>hashes</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of hashes of unreferences transactions.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "getTrytes", "hashes": ["OAATQS9VQLSXCLDJVJJVYUGONXAXOFMJOZNSYWRZSWECMXAQQURHQBJNLD9IOFEPGZEPEMPXCIVRX9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{ 
    trytes: [ 
        'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFH...9999',
        'BYSWEAUTWXHXZ9YBZISEK9LUHWGMHXCGEVNZHRLUWQFCUSDXZHOFH...9999' 
    ] 
  }`}</Code>}
    `
  ],
  [
    markdown(components)`
## getInclusionStates
    `
  ],
  [
    markdown(components)`

Get the inclusion states of a set of transactions. This is for determining 
if a transaction was accepted and confirmed by the network or not. You can 
search for multiple tips (and thus, milestones) to get past inclusion states of transactions.

This API call simply returns a list of boolean values in the same 
order as the transaction list you submitted, thus you get a true/false whether a 
transaction is confirmed or not.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getInclusionStates</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>transactions</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of transactions you want to get the inclusion state for.</Cell>
  </Row>
  <Row>
    <BoldCell>tips</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of tips (including milestones) you want to search for the inclusion state.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>states</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of boolean values in the same order.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "getInclusionStates", "transactions": ["QHBYXQWRAHQJZEIARWSQGZJTAIITOZRMBFICIPAVD9YRJMXFXBDPFDTRAHHHP9YPDUVTNOFWZGFGWMYHEKNAGNJHMW"], "tips": ["ZIJGAJ9AADLRPWNCYNNHUHRRAC9QOUDATEDQUMTNOTABUVRPTSTFQDGZKFYUUIE9ZEBIVCCXXXLKX9999"]}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "states": [
        true,
        false,
        true
    ], 
    "duration": 91
  }`}</Code>}
    `
  ],
  [
    markdown(components)`
## getBalances
    `
  ],
  [
    markdown(components)`

Similar to \`getInclusionStates\`. It returns the confirmed balance which a list of 
addresses have at the latest confirmed milestone. In addition to the balances, 
it also returns the milestone as well as the index with which the confirmed balance 
was determined. The balances is returned as a list in the same order as the 
addresses were provided as input.

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getBalances</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of addresses you want to get the confirmed balance from</Cell>
  </Row>
  <Row>
    <BoldCell>Threshold</BoldCell>
    <TypeCell>Int</TypeCell>
    <BooleanCell status={true} />
    <Cell>Confirmation threshold, should be set to 100.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>balances</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of confirmed balances of addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>milestone</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Hash of milestone that referenced this transaction.</Cell>
  </Row>
  <Row>
    <BoldCell>milestoneIndex</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Index of the referencing milestone.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "getBalances", "addresses": ["HBBYKAKTILIPVUKFOTSLHGENPTXYBNKXZFQFR9VQFWNBMTQNRVOUKPVPRNBSZVVILMAFBKOTBLGLWLOHQ"], "threshold": 100}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "balances": [
        "114544444"
    ],
    "milestone": "INRTUYSZCWBHGFGGXXPWRWBZACYAFGVRRP9VYEQJOHYD9URMELKWAFYFMNTSP9MCHLXRGAFMBOZPZ9999",
    "milestoneIndex": 128,
    "duration": 30
}`}</Code>}
    `
  ],
  [
    markdown(components)`
## getTransactionsToApprove
    `
  ],
  [
    markdown(components)`

Tip selection which returns \`trunkTransaction\` and \`branchTransaction\`. The input 
value is depth, which basically determines how many bundles to go back to 
for finding the transactions to approve. 

The higher your depth value, the more "babysitting" you do for 
the network (as you have to confirm more transactions).

#### Input
${<InputTable>
  <Row>
    <BoldCell>command</BoldCell>
    <TypeCell>String</TypeCell>
    <BooleanCell status={true} />
    <Cell>The RPC command for this call: <InlineCode>getTransactionsToApprove</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>addresses</BoldCell>
    <TypeCell>Array</TypeCell>
    <BooleanCell status={true} />
    <Cell>List of addresses you want to get the confirmed balance from</Cell>
  </Row>
  <Row>
    <BoldCell>Threshold</BoldCell>
    <TypeCell>Int</TypeCell>
    <BooleanCell status={true} />
    <Cell>Confirmation threshold, should be set to 100.</Cell>
  </Row>
</InputTable>}

#### Output
${<OutputTable>
  <Row>
    <BoldCell>balances</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Array of confirmed balances of addresses.</Cell>
  </Row>
  <Row>
    <BoldCell>milestone</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Hash of milestone that referenced this transaction.</Cell>
  </Row>
  <Row>
    <BoldCell>milestoneIndex</BoldCell>
    <TypeCell>Array</TypeCell>
    <Cell>Index of the referencing milestone.</Cell>
  </Row>
</OutputTable>}
    `,
    markdown(components)`
Example request:

${<Request
  url="http://localhost:14265/"
  method={"POST"}
  headers={{
    'Content-Type': `application/json`,
    'X-IOTA-API-Version': '1',
  }}
  body={'{"command": "getTransactionsToApprove", "depth": 27}'}
/>}

Example successful (**200**) response:

${<Code>{`{
    "trunkTransaction": "TKGDZ9GEI9CPNQGHEATIISAKYPPPSXVCXBSR9EIWCTHHSSEQCD9YLDPEXYERCNJVASRGWMAVKFQTC9999", 
    "branchTransaction": "TKGDZ9GEI9CPNQGHEATIISAKYPPPSXVCXBSR9EIWCTHHSSEQCD9YLDPEXYERCNJVASRGWMAVKFQTC9999", 
    "duration": 936
  }`}</Code>}
    `
  ]
]}
    />
  )
}

export default pure(Query)
