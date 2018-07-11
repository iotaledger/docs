export default [
  {
    name: 'Introduction',
    posts: [
      {
        name: 'What is IRI?',
        href: '/iri/what-is-iri',
        aliases: ['/iri']
      }
    ]
  },
  {
    name: 'Using IRI',
    posts: [
      {
        name: 'Installing IRI',
        posts: [
          {
            name: 'Linux',
            href: '/iri/usage/install-iri-linux'
          },
          {
            name: 'Windows',
            href: '/iri/usage/install-iri-windows'
          },
          {
            name: 'Docker',
            href: '/iri/usage/install-iri-docker'
          }
        ]
      }
    ]
  },
  {
    name: 'Interact',
    posts: [
      {
        name: `HTTP API`,
        href: '/iri/interact/http-api'
      },
      {
        name: `ZeroMQ`,
        href: '/iri/interact/zero-mq'
      }
    ]
  }
]
