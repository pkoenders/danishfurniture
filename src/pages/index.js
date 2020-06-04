import React, { useContext } from 'react'
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import NavProductCateories from "../components/nav-product-categories"

export const query = graphql`
query {
  allShopifyProduct(
      sort: {
        fields: [createdAt]
        order: DESC
      }
    ) {
      edges {
        node {
          id
          availableForSale
          title
          handle
          createdAt
          images {
            id
            originalSrc
            localFile {
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          variants {
            price
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>


    <NavProductCateories />
    <ul>

      <h2>Here are all our products, listed as (createdAt / descending) order</h2>
      {data.allShopifyProduct.edges
        ? data.allShopifyProduct.edges.map(({ node: { availableForSale, id, handle, title, description, images: [firstImage], variants: [firstVariant] } }) => (
          <>
            {availableForSale &&
              <li key={id}>
                <h3>
                  <Link to={`/${handle}`}>{title}</Link>
                </h3>

                {firstImage && firstImage.localFile && (
                  <Img
                    fluid={firstImage.localFile.childImageSharp.fluid}
                    alt={handle}
                  />
                )}

                {/* {" - "}${node.priceRange.minVariantPrice.amount} */}

                <p>{description}</p>


              </li>
            }
          </>
        ))
        : <p>No Products found!</p>}
    </ul>


    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
