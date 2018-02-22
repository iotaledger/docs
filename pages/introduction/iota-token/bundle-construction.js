import markdown from 'markdown-in-js'
import withDoc, { components } from '../../../lib/with-doc'

import { lewi } from '../../../lib/data/team'
import {
  Table,
  Row,
  Cell,
  TypeCell,
  BoldCell
} from '../../../components/api/table'

// prettier-ignore
export default withDoc({
  title: 'How Bundles are constructed',
  date: '19 Feburary 2018',
  authors: [lewi],
  editUrl: 'pages/docs/iota-token/bundle-construction.js',
})(markdown(components)`

IOTA uses an account-like scheme. This means that we have inputs 
(addresses) which you have to spend in order to transfer tokens. 
Addresses are generated from private keys, which in turn are derived 
from a tryte-encoded seed. 

A transfer in IOTA is a bundle consisting of outputs and inputs. 
Bundles are atomic transfers, meaning that either all transactions 
inside the bundle will be accepted by the network, or none. 

A typical transfer in IOTA is a bundle consisting of 4 transactions:

${<Table>
    <Row>
      <BoldCell>Index</BoldCell>
      <BoldCell>Purpose</BoldCell>
      <TypeCell>Value</TypeCell>
    </Row>
    <Row>
      <Cell>0</Cell>
      <Cell>The Output/Desintation of the bundle. 
          Recipient of the transaction</Cell>
      <Cell>{`Greater than 0`}</Cell>
    </Row>
    <Row>
      <Cell>1</Cell>
      <Cell>{`First bundle entry that spends the entirety of the 
      address input. This bundle entry also contains the first part 
      of the signature (in the example case, it'll be the first half 
      of Alice's signature)`}</Cell>
      <Cell>{`Less than 0`}</Cell>
    </Row>
    <Row>
      <Cell>2</Cell>
      <Cell>{`Second half of Alice's signature.`}</Cell>
      <Cell>0</Cell>
    </Row>
    <Row>
      <Cell>3</Cell>
      <Cell>{`Remainder Output. If there is a remainder (Alice didn't spend 
      her entire balance at the respective key index), it will be 
      sent to a remainder address.`}</Cell>
      <Cell>Input minus Output </Cell>
    </Row>
</Table>}

*Note: Alice's address uses a security of 2. This is shown by the number of
Alice's signature fragments in the bundle.*

## Construction Bundles

The construction of bundles is often managed by client software. These libraries,
provided with a list of outputs, will construct a bundle from the addresses with 
positive values a seed based 'account'. 

There are no hard constraints on the number of inputs and outputs in a bundle. However
given the networking and PoW contraints bundles over 30 inputs/outputs are not advised.

#### Inputs

Bundles can crafted with multiple inputs from multiple different addresses (possibly seeds).
The value of the inputs has to be **less than Zero**. The negative value effectively 
'takes' the tokens at the address and makes them available to be outputted in the same
bundle. 

Each input must be signed correctly to be utilised. In 

Obviously, taking more tokens than are availble at an address will result in an invalid
transaction. 

> SECURITY NOTE ${<br />} Ensure to input the **total amount** of any address
that is used as an **input** in a transaction. If a transaction input spends less than the 
full amount from an address, a portion of tokens will remain at the address. 
To move the them these tokens you will have to reuse the addresses private key.
Doing so poses a security risk to the funds at this address.


#### Outputs

Once a bundle has valid inputs, these can be spent to any number of outputs. The outputs, 
given they do not need to be signed, are also able to contain up to \`2187\` trytes worth
of information.

## Invalid Bundles

\`List of reasons why your bundle could be invalid\`

`)
