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
        name: 'Introduction',
        href: '/iri/usage/introduction'
      },
      {
        name: 'Installing IRI',
        posts: [
          {
            name: 'Linux',
            href: '/iri/usage/install-iri-linux'
          },
          {
            name: 'Docker',
            href: '/iri/usage/install-iri-docker'
          }
        ]
      },
      {
        name: 'Configuring IRI',
        href: '/iri/usage/configuration'
      },
      {
        name: 'Finding Neighbours',
        href: '/iri/usage/finding-neighbours'
      },
      {
        name: 'Troubleshooting',
        href: '/iri/usage/troubleshooting-iri'
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
