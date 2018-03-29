const { parse } = require('url')

const data = [
  {
    id: 'gettingStarted',
    name: 'Getting Started',
    posts: [
      {
        id: 'introduction',
        name: 'Introduction',
        href: '/iri/api#introduction',
        aliases: ['/iri/api', '/iri/api#']
      }
    ]
  },

  {
    id: 'apiBasics',
    name: 'API Basics',
    posts: [
      {
        id: 'contentType',
        name: 'Content Type',
        href: '/iri/api#api-basics/content-type'
      },
      {
        id: 'types',
        name: 'Types',
        href: '/iri/api#api-basics/types'
      },
      {
        id: 'errors',
        name: 'Errors',
        href: '/iri/api#api-basics/errors'
      }
    ]
  },

  {
    id: 'endpoints',
    name: 'Endpoints',
    posts: [
      {
        id: 'general',
        name: 'General',
        href: '/iri/api#endpoints/general',
        posts: [
          {
            id: 'getNodeInfo',
            name: 'Get node information',
            href: '/iri/api#endpoints/general/getnodeinfo'
          },
          {
            id: 'getNeighbors',
            name: 'Get neighbors',
            href: '/iri/api#endpoints/general/getneighbors'
          },
          {
            id: 'addNeighbors',
            name: 'Add neighbors',
            href: '/iri/api#endpoints/general/addneighbors'
          },
          {
            id: 'removeNeighbors',
            name: 'Remove neighbors',
            href: '/iri/api#endpoints/general/removeneighbors'
          }
        ]
      },
      {
        id: 'query',
        name: 'Query',
        href: '/iri/api#endpoints/query',
        posts: [
          {
            id: 'getTips',
            name: 'Get lastest tips',
            href: '/iri/api#endpoints/query/gettips'
          },
          {
            id: 'getTrytes',
            name: 'Get transaction trytes',
            href: '/iri/api#endpoints/query/gettrytes'
          },
          {
            id: 'getInclusionStates',
            name: 'Get the inclusion state',
            href: '/iri/api#endpoints/query/getinclusionstates'
          },
          {
            id: 'getBalances',
            name: 'Get address balance',
            href: '/iri/api#endpoints/query/getbalances'
          },
          {
            id: 'gettransactionstoapprove',
            name: 'Get TXs to approve',
            href: '/iri/api#endpoints/query/gettransactionstoapprove'
          }
        ]
      },
      {
        id: 'publish',
        name: 'Publish',
        href: '/iri/api#endpoints/publish',
        posts: [
          {
            id: 'attachToTangle',
            name: 'Attach to tangle',
            href: '/iri/api#endpoints/publish/attachtotangle'
          },
          {
            id: 'interruptAttachingToTangle',
            name: 'Interupt attach to tangle',
            href: '/iri/api#endpoints/publish/gettrytes'
          },
          {
            id: 'broadcastTransactions',
            name: 'Broadcast Transactions',
            href: '/iri/api#endpoints/publish/broadcasttransactions'
          },
          {
            id: 'storeTransactions',
            name: 'Store Transactions',
            href: '/iri/api#endpoints/publish/storeTransactions'
          }
        ]
      }
    ]
  },

  //   {
  //     id: 'errors',
  //     name: 'Errors',
  //     posts: [
  //       {
  //         id: 'generic',
  //         name: 'Generic errors',
  //         href: '/api#errors/generic'
  //       },
  //       {
  //         id: 'deploymentErrors',
  //         name: 'Deployment errors',
  //         href: '/api#errors/deployment-errors'
  //       },
  //       {
  //         id: 'domainErrors',
  //         name: 'Domain errors',
  //         href: '/api#errors/domain-errors'
  //       },
  //       {
  //         id: 'dnsErrors',
  //         name: 'DNS errors',
  //         href: '/api#errors/dns-errors'
  //       },
  //       {
  //         id: 'oauth2Errors',
  //         name: 'OAuth2 errors',
  //         href: '/api#errors/oauth2-errors'
  //       }
  //     ]
  //   },

  {
    id: 'changelog',
    name: 'Changelog',
    posts: [
      {
        id: 'version2',
        name: 'Version 2.0',
        href: '/api#changelog'
      }
    ]
  }
]

export default data.map(({ posts, ...rest }) => {
  return {
    ...rest,
    posts: posts.map(p => {
      const { hash } = parse(p.href)
      return { ...p, hash }
    })
  }
})
