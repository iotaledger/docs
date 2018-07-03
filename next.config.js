module.exports = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader'
        }
      ]
    })
    return config
  }
  // exportPathMap: async function() {
  //   const paths = await glob("pages/**")
  //   const pages = paths.map(path => {
  //     path = path.replace(/^pages/, "")
  //     path = path.replace("index.js", "")
  //     path = path.replace(".js", "")
  //     if (path === "/") return path
  //     path = path.replace(/\/$/, "")
  //     return path
  //   })
  //   const pageMap = pages.reduce((map, page) => {
  //     map[page] = { page }
  //     return map
  //   }, {})
  //   return pageMap
  // }
}
