/*
  Deploy to now and get the URL
  Deploy to now via the token
  Add a comment to the PR
*/

const shell = require('shelljs')
const logger = console

const { CI_PULL_REQUEST } = process.env

async function run() {
  if (!CI_PULL_REQUEST || CI_PULL_REQUEST === '') return

  const [, PULL_REQUEST_ID] = CI_PULL_REQUEST.match(/\/([0-9]*)$/)

  // Build the app
  const build = shell.exec(`npm run build`)
  if (build.code !== 0) {
    throw new Error(build.stderr)
  }

  // Export the app
  const exportApp = shell.exec(`npm run export`)
  if (exportApp.code !== 0) {
    throw new Error(exportApp.stderr)
  }

  // Create a tarball version of the app
  const tarball = shell.exec(`tar czf app.tar.gz out`)
  if (tarball.code !== 0) {
    throw new Error(tarball.stderr)
  }

  // Upload the app to the deploy server
  const url = `https://zeit-docs-deploy-server.now.sh/deploy/${PULL_REQUEST_ID}`
  const upload = shell.exec(`curl -F "app=@app.tar.gz" ${url}`)
  if (upload.code !== 0) {
    throw new Error(upload.stderr)
  }

  if (upload.stdout !== 'SUCCESS') {
    throw new Error(`${upload.stdout}\n${upload.stdout}`)
  }
}

run().catch(error => {
  logger.error(error.stack)
  process.exit(1)
})
