/*
  Deploy to now and get the URL
  Deploy to now via the token
  Add a comment to the PR
*/

const shell = require('shelljs')
const GitHubApi = require('github')
const logger = console

const { ZEIT_TOKEN, GH_TOKEN, PULL_REQUEST_ID } = process.env

async function run() {
  logger.log(process.env)
  if (!PULL_REQUEST_ID || PULL_REQUEST_ID === '') return

  // Change the team to ZEIT
  const team = shell.exec(`now switch zeit -t ${ZEIT_TOKEN}`)
  if (team.code !== 0) {
    throw new Error(team.stderr)
  }

  // Deploy the app
  const now = shell.exec(`now -t ${ZEIT_TOKEN}`, { silent: true })
  if (now.code !== 0) {
    throw new Error(now.stderr)
  }

  const deployUrl = now.stdout
  logger.log('> App deployed to:', deployUrl)

  // Create a GH comment
  const github = new GitHubApi({
    // optional
    debug: true,
    protocol: 'https',
    headers: {
      'user-agent': 'ZEIT docs on Travis' // GitHub is happy with a unique user agent
    },
    Promise,
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
  })

  github.authenticate({
    type: 'token',
    token: GH_TOKEN
  })

  await github.issues.createComment({
    owner: 'zeit',
    repo: 'docs',
    number: PULL_REQUEST_ID,
    body: `You can view the modified docs at: ${deployUrl}`
  })
}

run().catch(error => {
  logger.error(error.stack)
  process.exit(1)
})
