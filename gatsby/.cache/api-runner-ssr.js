var plugins = [{
      plugin: require('C:/Users/andrew/personalProjects/Big_Joes_Burgers/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/andrew/personalProjects/Big_Joes_Burgers/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"7ye8n6xs","dataset":"production","watchMode":true,"token":"skaQEHI4NkBeMGQbjTBhgm64EMYOtcZDIVqo7SCwORHMbPcZYlrztQ3wKRvYLaYIazVSJYIadUtO2737cz4NiIct59L34fxr4fzKJPA2ACfvJLr2CG8GaTGy29NihsbDn8jNMlrVkU7CCs2LMlnlx6A2IkPKnD6bPMQifExw25NiJ1PPjJ7E"},
    },{
      plugin: require('C:/Users/andrew/personalProjects/Big_Joes_Burgers/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
