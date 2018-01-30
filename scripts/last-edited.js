const { resolve } = require('path')
const fs = require('fs')
const glob = require('glob')
const { promisify } = require('util')
const logger = console

const getStats = promisify(fs.stat)
const writeFile = promisify(fs.writeFile)
const globPromise = promisify(glob)

async function getFileStats() {
  const files = await globPromise(resolve('./pages/docs/**/*.js'))
  const stats = await Promise.all(
    files
      .map(file => file.split('/pages/'))
      .map(file => file[1])
      .map(file => `pages/${file}`)
      .map(file => Promise.all([getStats(file), Promise.resolve(file)]))
  )

  return stats
    .map(([stat, filePath]) => [stat.mtime, filePath])
    .reduce(
      (results, [stat, filePath]) => ({ ...results, [filePath]: stat }),
      {}
    )
}

async function main(fileStats) {
  const filePath = resolve('./lib/data/last-edited.json')
  await writeFile(filePath, JSON.stringify(fileStats, null, 2), 'utf8')
  logger.log('Last edited file updated')
}

getFileStats()
  .then(main)
  .catch(error => logger.error(error))
