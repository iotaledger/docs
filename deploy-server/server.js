const express = require('express')
const fileUpload = require('express-fileupload')
const UUID = require('uuid')
const deploy = require('./deploy')

const logger = console
const port = process.env.PORT || 8070
const app = express()
app.use(fileUpload())

app.post('/deploy/:pullRequestId', (req, res) => {
  if (!req.files || !req.files.app) {
    return res.status(400).send('Upload a file with the name "app"')
  }

  const { pullRequestId } = req.params

  // Use the mv() method to place the file somewhere on your server
  const tarballName = UUID.v4()
  logger.log(`Deploying pull request: ${pullRequestId}`)

  req.files.app.mv(`/tmp/${tarballName}.tar.gz`, err => {
    if (err) {
      return res.status(500).send(err)
    }

    deploy(pullRequestId, tarballName)
      .then(() => {
        res.send('SUCCESS')
      })
      .catch(error => {
        logger.error(error.stack)
        return res.status(500).send(error)
      })
  })
})

app.listen(port, () => {
  logger.log(`Deploy server started in port: ${port}\n`)
})
