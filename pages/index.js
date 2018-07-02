import Page from '../components/page'
import Head from '../components/head'
import Header from '../components/header'
import Card from '../components/card'

import { H1, H3 } from '../components/text/heading'
import { P } from '../components/text/paragraph'

import Data from '../lib/data/home'

const HomePG = () => (
  <Page>
    <Head titlePrefix="" title={`IOTA Developer Portal`} />
    <div className="header">
      <Header clean={true} inverse={true} />
    </div>
    <div className="segment">
      <H1>IOTA Developers</H1>
      <P>
        {`IOTA is an open-source distributed ledger technology for the internet of
        things.`}
      </P>
    </div>
    {/* Configurable page elements. Edit at /lib/data/home */}
    {Data.map((segment, y) => (
      <div className="segment" key={y}>
        {segment.title && <H3>{segment.title}</H3>}
        {segment.items && (
          <div className="content">
            {segment.items.map((item, i) => (
              <Card key={`${i}+${y}`} {...item} />
            ))}
          </div>
        )}
      </div>
    ))}
    <div className="segment" key={'footer'}>
      <p>
        go to the{' '}
        <a href={'https://github.com/iotaledger'}>foundation's github </a>
        or the{' '}
        <a href={'https://github.com/iota-community'}>community's github </a>
      </p>
    </div>
    <style jsx>{`
      .segment {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 5px 0px 0px;
        margin: 0 30px 0;
        min-width: 320px;
        max-width: 800px;
      }

      .content {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
      }
      a {
        color: #18817c;
      }
    `}</style>
  </Page>
)
export default HomePG
