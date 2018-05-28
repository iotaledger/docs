const { parse } = require('url')

const data = [
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
        id: 'getNodeInfo',
        name: 'getNodeInfo',
        href: '/iri/api#endpoints/getNodeInfo'
      },
      {
        id: 'getNeighbors',
        name: 'getNeighbors',
        href: '/iri/api#endpoints/getNeighbors'
      },
      {
        id: 'addNeighbors',
        name: 'addNeighbors',
        href: '/iri/api#endpoints/addNeighbors'
      },
      {
        id: 'removeNeighbors',
        name: 'removeNeighbors',
        href: '/iri/api#endpoints/removeNeighbors'
      },
      {
        id: 'getTips',
        name: 'getTips',
        href: '/iri/api#endpoints/getTips'
      },
      {
        id: 'getTrytes',
        name: 'getTrytes',
        href: '/iri/api#endpoints/getTrytes'
      },
      {
        id: 'getInclusionStates',
        name: 'getInclusionStates',
        href: '/iri/api#endpoints/getInclusionStates'
      },
      {
        id: 'getBalances',
        name: 'getBalances',
        href: '/iri/api#endpoints/getBalances'
      },
      {
        id: 'getTransactionsToApprove',
        name: 'getTransactionsToApprove',
        href: '/iri/api#endpoints/getTransactionsToApprove'
      },

      {
        id: 'attachToTangle',
        name: 'attachToTangle',
        href: '/iri/api#endpoints/attachToTangle'
      },
      {
        id: 'interruptAttachingToTangle',
        name: 'interruptAttachingToTangle',
        href: '/iri/api#endpoints/interruptAttachingToTangle'
      },
      {
        id: 'broadcastTransactions',
        name: 'broadcastTransactions',
        href: '/iri/api#endpoints/broadcastTransactions'
      },
      {
        id: 'storeTransactions',
        name: 'storeTransactions',
        href: '/iri/api#endpoints/storeTransactions'
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
