const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
    {
        allShopifyProduct {
            edges {
                node {
                    handle
                }
            }
        }

        allShopifyCollection {
            edges {
                node {
                    title
                    handle
                    id
                }
            }
        }
    }
  `).then(result => {
        result.data.allShopifyProduct.edges.forEach(({ node }) => {
            createPage({
                path: `/${node.handle}/`,
                component: path.resolve(`./src/templates/product.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    handle: node.handle,
                },
            })
        })


        result.data.allShopifyCollection.edges.forEach(({ node }) => {
            createPage({
                path: `/${node.handle}/`,
                component: path.resolve(`./src/templates/collection.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    handle: node.handle,
                },
            })
        })
    })
}