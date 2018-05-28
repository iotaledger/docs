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

function getNeighbors() {
  return (
    <Section
      contents={// prettier-ignore
      [  
    [
      markdown(components)`
  
  Returns a list of neighbours that the node is connected to. 
  Includes statistics relating to the connection.
  
  #### Input
  ${<InputTable>
    <Row>
      <BoldCell>command</BoldCell>
      <TypeCell>String</TypeCell>
      <BooleanCell status={true} />
      <Cell>The RPC command for this call: <InlineCode>getNeighbors</InlineCode> </Cell>
    </Row>
  </InputTable>}
  
  #### Output
  ${<OutputTable>
    <Row>
      <BoldCell>address</BoldCell>
      <TypeCell>String</TypeCell>
      <Cell>The IP address or URL of your peer</Cell>
    </Row>
    <Row>
      <BoldCell>numberOfAllTransactions</BoldCell>
      <TypeCell>Int</TypeCell>
      <Cell>Number of all transactions sent (invalid, valid, already-seen)</Cell>
    </Row>
    <Row>
      <BoldCell>numberOfInvalidTransactions</BoldCell>
      <TypeCell>Int</TypeCell>
      <Cell>Invalid transactions your peer has sent you. These are transactions with invalid signatures or overall schema.</Cell>
    </Row>
    <Row>
      <BoldCell>numberOfNewTransactions</BoldCell>
      <TypeCell>Int</TypeCell>
      <Cell>New transactions which were transmitted.</Cell>
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
      body={'{"command": "getNeighbors"}'}
    />}
    
  
  Example successful (**200**) response:
  
  ${<Code>{`{
      "duration": 37,
      "neighbors": [
          {
              "address": "/8.8.8.8:14265",
              "numberOfAllTransactions": 922,
              "numberOfInvalidTransactions": 0,
              "numberOfNewTransactions": 92
          },
          {
              "address": "/8.8.8.8:5000",
              "numberOfAllTransactions": 925,
              "numberOfInvalidTransactions": 0,
              "numberOfNewTransactions": 20
          }
      ]
  }`}</Code>}
      `
    ]
]}
    />
  )
}

export default pure(getNeighbors)
