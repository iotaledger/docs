import markdown from 'markdown-in-js'
import React from 'react'
import Section, { components } from '../../section'
import { Table, Row, Cell, BoldCell, FullWidthCell } from '../../table'
import { InlineCode } from '../../../text/code'
import immutable from '../../../../lib/immutable-component'

function Types() {
  return (
    <Section
      contents={// prettier-ignore
      [
  [
    markdown(components)`
Along the documentation we're going to use many different types of data. Here you can find a list of them and what they mean.

${<Table head={
  <Row>
    <Cell isHead>Name</Cell>
    <FullWidthCell isHead>Definition</FullWidthCell>
    <Cell isHead>Example</Cell>
  </Row>
}>
  <Row>
    <BoldCell>Boolean</BoldCell>
    <Cell>A value to donate a positive or negative value.</Cell>
    <Cell><InlineCode>true</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>String</BoldCell>
    <Cell>A string is a sequence of characters used to represent text.</Cell>
    <Cell><InlineCode>Hello World!</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Integer</BoldCell>
    <Cell>An integer is a number without decimals.</Cell>
    <Cell><InlineCode>1234</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Array</BoldCell>
    <Cell>A data structure with only a list of values separated by a comma.</Cell>
    <Cell><InlineCode>["ZEIT", 1234, 12.34]</InlineCode></Cell>
  </Row>
</Table>}
    `
  ]
]}
    />
  )
}

export default immutable(Types)
