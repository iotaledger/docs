const { parse } = require('url')

const data = [
  {
    id: 'gettingStarted',
    name: 'Getting Started',
    posts: [
      {
        id: 'introduction',
        name: 'Introduction',
        href: '/api#introduction',
        aliases: ['/api', '/api#']
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
        href: '/api#api-basics/content-type'
      },
      {
        id: 'authentication',
        name: 'Authentication',
        href: '/api#api-basics/authentication'
      },
      {
        id: 'errors',
        name: 'Errors',
        href: '/api#api-basics/errors'
      },
      {
        id: 'rateLimits',
        name: 'Rate Limits',
        href: '/api#api-basics/rate-limits'
      },
      {
        id: 'versioning',
        name: 'Versioning',
        href: '/api#api-basics/versioning'
      },
      {
        id: 'types',
        name: 'Types',
        href: '/api#api-basics/types'
      }
    ]
  },

  {
    id: 'endpoints',
    name: 'Endpoints',
    posts: [
      {
        id: 'deployments',
        name: 'Deployments',
        href: '/api#endpoints/deployments',
        posts: [
          {
            id: 'deploymentsCreate',
            name: 'Create a new deployment',
            href: '/api#endpoints/deployments/create-a-new-deployment'
          },
          {
            id: 'deploymentsFileUpload',
            name: 'Upload deployment files',
            href: '/api#endpoints/deployments/upload-deployment-files'
          },
          {
            id: 'deploymentsGetAll',
            name: 'List all the deployments',
            href: '/api#endpoints/deployments/list-all-the-deployments'
          },
          {
            id: 'deploymentsGetSingle',
            name: 'Get a single deployment',
            href: '/api#endpoints/deployments/get-a-single-deployment'
          },
          {
            id: 'deploymentsDelete',
            name: 'Delete a deployment',
            href: '/api#endpoints/deployments/delete-a-deployment'
          },
          {
            id: 'deploymentsFileGetAll',
            name: 'List deployment files',
            href: '/api#endpoints/deployments/list-deployment-files'
          },
          {
            id: 'deploymentsFilesGetSingle',
            name: 'Get single file content',
            href: '/api#endpoints/deployments/get-a-single-file-content'
          },
          {
            id: 'deploymentsInstances',
            name: 'Get deployment instances',
            href: '/api#endpoints/deployments/get-deployment-instances'
          },
          {
            id: 'deploymentsScale',
            name: 'Set scale configuration',
            href: '/api#endpoints/deployments/set-scale-configuration'
          }
        ]
      },
      {
        id: 'logs',
        name: 'Logs',
        href: '/api#endpoints/logs',
        posts: [
          {
            id: 'logsGetByDeployment',
            name: 'Get deployment logs',
            href: '/api#endpoints/logs/get-deployment-logs'
          }
        ]
      },
      {
        id: 'domains',
        name: 'Domains',
        href: '/api#endpoints/domains',
        posts: [
          {
            id: 'domainsListAll',
            name: 'List all the domains',
            href: '/api#endpoints/domains/list-all-the-domains'
          },
          {
            id: 'domainsAddNew',
            name: 'Add a new domain',
            href: '/api#endpoints/domains/add-a-new-domain'
          },
          {
            id: 'domainsRemoveByName',
            name: 'Remove domain',
            href: '/api#endpoints/domains/remove-a-domain-by-name'
          },
          {
            id: 'domainsCheckAvailability',
            name: 'Check domain availability',
            href: '/api#endpoints/domains/check-a-domain-availability'
          },
          {
            id: 'domainsCheckPrice',
            name: 'Check domain price',
            href: '/api#endpoints/domains/check-the-price-of-a-domain'
          },
          {
            id: 'domainsPurchase',
            name: 'Purchase a domain',
            href: '/api#endpoints/domains/purchase-a-domain'
          }
        ]
      },
      {
        id: 'dns',
        name: 'DNS',
        href: '/api#endpoints/dns',
        posts: [
          {
            id: 'dnsListDNSRecords',
            name: 'DNS records by domain',
            href: '/api#endpoints/dns/list-all-the-dns-records-of-a-domain'
          },
          {
            id: 'dnsSetDNSRecord',
            name: 'Create a new DNS record',
            href: '/api#endpoints/dns/create-a-new-dns-record'
          },
          {
            id: 'dnsRemoveDNSRecord',
            name: 'Remove a DNS record',
            href: '/api#endpoints/dns/remove-a-dns-record'
          }
        ]
      },
      {
        id: 'certificates',
        name: 'Certificates',
        href: '/api#endpoints/certificates',
        posts: [
          {
            id: 'certificatesListAll',
            name: 'List all the certificates',
            href: '/api#endpoints/certificates/list-all-the-certificates'
          },
          {
            id: 'certificatesGetSingle',
            name: 'Get a single certificate',
            href: '/api#endpoints/certificates/get-a-single-certificate'
          },
          {
            id: 'certificatesCreateNew',
            name: 'Create a new certificate',
            href: '/api#endpoints/certificates/create-a-new-certificate'
          },
          {
            id: 'certificatesReplace',
            name: 'Replace a certificate',
            href: '/api#endpoints/certificates/replace-a-certificate'
          },
          {
            id: 'certificatesDelete',
            name: 'Delete a certificate',
            href: '/api#endpoints/certificates/delete-a-certificate'
          }
        ]
      },
      {
        id: 'aliases',
        name: 'Aliases',
        href: '/api#endpoints/aliases',
        posts: [
          {
            id: 'aliasesListAll',
            name: 'List all the aliases',
            href: '/api#endpoints/aliases/list-all-the-aliases'
          },
          {
            id: 'aliasesRemove',
            name: 'Remove an alias',
            href: '/api#endpoints/aliases/remove-an-alias'
          },
          {
            id: 'aliasesListByDeployment',
            name: 'List aliases by deployment',
            href: '/api#endpoints/aliases/list-aliases-by-deployment'
          },
          {
            id: 'aliasesAssign',
            name: 'Alias a deployment',
            href: '/api#endpoints/aliases/assign-an-alias-to-a-deployment'
          }
        ]
      },
      {
        id: 'secrets',
        name: 'Secrets',
        href: '/api#endpoints/secrets',
        posts: [
          {
            id: 'secrets',
            name: 'List all the secrets',
            href: '/api#endpoints/secrets/list-all-the-secrets'
          },
          {
            id: 'secrets',
            name: 'Create a new secret',
            href: '/api#endpoints/secrets/create-a-new-secret'
          },
          {
            id: 'secrets',
            name: 'Change secret name',
            href: '/api#endpoints/secrets/change-secret-name'
          },
          {
            id: 'secrets',
            name: 'Delete a secret',
            href: '/api#endpoints/secrets/delete-a-secret'
          }
        ]
      },
      {
        id: 'teams',
        name: 'Teams',
        href: '/api#endpoints/teams',
        posts: [
          {
            id: 'teamsCreate',
            name: 'Create team',
            href: '/api#endpoints/teams/create-a-team'
          },
          {
            id: 'teamsList',
            name: 'List all your teams',
            href: '/api#endpoints/teams/list-all-your-teams'
          },
          {
            id: 'teamsGetSingle',
            name: 'Get single team information',
            href: '/api#endpoints/teams/get-single-team-information'
          },
          {
            id: 'teamsUpdate',
            name: 'Update team information',
            href: '/api#endpoints/teams/update-team-information'
          },
          {
            id: 'teamsTeamMembers',
            name: 'Get list of team members',
            href: '/api#endpoints/teams/get-list-of-team-members'
          },
          {
            id: 'teamsInvite',
            name: 'Invite user to team',
            href: '/api#endpoints/teams/invite-user-to-team'
          },
          {
            id: 'teamsChangeRole',
            name: 'Change user role',
            href: '/api#endpoints/teams/change-user-role'
          },
          {
            id: 'teamsRemove',
            name: 'Remove user to team',
            href: '/api#endpoints/teams/remove-user-to-team'
          }
        ]
      },
      {
        id: 'authentication',
        name: 'Authentication',
        href: '/api#endpoints/authentication',
        posts: [
          {
            id: 'authenticationRequest',
            name: 'Request a login',
            href: '/api#endpoints/authentication/request-a-login'
          },
          {
            id: 'authenticationVerify',
            name: 'Verify login',
            href: '/api#endpoints/authentication/verify-login'
          }
        ]
      },
      {
        id: 'oauth2',
        name: 'OAuth2',
        href: '/api#endpoints/oauth2',
        posts: [
          {
            id: 'oauth2Authorization',
            name: 'Authorization',
            href: '/api#endpoints/oauth2/authorization'
          },
          {
            id: 'oauth2ExchangingCodeForToken',
            name: 'Exchange code for token',
            href: '/api#endpoints/oauth2/exchanging-code-for-an-access-token'
          },
          {
            id: 'oauth2UsingAccessToken',
            name: 'Using access token',
            href: '/api#endpoints/oauth2/using-access-token'
          }
        ]
      }
    ]
  },

  {
    id: 'errors',
    name: 'Errors',
    posts: [
      {
        id: 'generic',
        name: 'Generic errors',
        href: '/api#errors/generic'
      },
      {
        id: 'deploymentErrors',
        name: 'Deployment errors',
        href: '/api#errors/deployment-errors'
      },
      {
        id: 'domainErrors',
        name: 'Domain errors',
        href: '/api#errors/domain-errors'
      },
      {
        id: 'dnsErrors',
        name: 'DNS errors',
        href: '/api#errors/dns-errors'
      },
      {
        id: 'oauth2Errors',
        name: 'OAuth2 errors',
        href: '/api#errors/oauth2-errors'
      }
    ]
  },

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
