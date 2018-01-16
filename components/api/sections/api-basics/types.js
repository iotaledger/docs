import markdown from 'markdown-in-js'
import React from 'react'
import Section, { components } from '../../section'
import { ExternalLink } from '../../../text/link'
import { Table, Row, Cell, BoldCell, FullWidthCell } from '../../table'
import { InlineCode } from '../../../text/code'
import immutable from '../../../../lib/immutable-component'

function Types() {
  return (
    <Section
      contents={
        // prettier-ignore
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
    <BoldCell>ID</BoldCell>
    <Cell>A unique value used to identify resources.</Cell>
    <Cell><InlineCode>"V0fra8eEgQwEpFhYG2vTzC3K"</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>String</BoldCell>
    <Cell>A string is a sequence of characters used to represent text.</Cell>
    <Cell><InlineCode>"ZEIT"</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Integer</BoldCell>
    <Cell>An integer is a number without decimals.</Cell>
    <Cell><InlineCode>1234</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Float</BoldCell>
    <Cell>A float is a number with decimals.</Cell>
    <Cell><InlineCode>12.34</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Map</BoldCell>
    <Cell>A data structure with a list of values assigned to a unique key.</Cell>
    <Cell><InlineCode>{`{ "service": "ZEIT" }`}</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>List</BoldCell>
    <Cell>A data structure with only a list of values separated by a comma.</Cell>
    <Cell><InlineCode>["ZEIT", 1234, 12.34]</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Enum</BoldCell>
    <Cell>A enum is a String with only a few possible valid values.</Cell>
    <Cell><InlineCode>"NPM" | "DOCKER"</InlineCode></Cell>
  </Row>
  <Row>
    <BoldCell>Date</BoldCell>
    <Cell>A String representing a date with the <ExternalLink href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</ExternalLink> format.</Cell>
    <Cell><InlineCode>"2018-09-03T19:48:46.555Z"</InlineCode></Cell>
  </Row>
</Table>}
    `
  ]
]
      }
    />
  )
}

export default immutable(Types)
