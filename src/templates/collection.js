import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Img from 'gatsby-image'
import NavProductCateories from "../components/nav-product-categories"

export const query = graphql`
  query($handle: String!) {
    
    shopifyCollection(handle: { eq: $handle }) {
      title
      id
      handle
      descriptionHtml
      description
      
      products {
        id
        title
        description
        handle
        images {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        priceRange {
          maxVariantPrice {
            currencyCode
            amount
          }
        }
      }
    }
  }
`

const CollectionPage = ({ data }) => {
  const collection = data.shopifyCollection

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NZD',
  });

  return (
    <>
      <Layout>
        <h1>{collection.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }} />

        <ul>

          <h2>Here are all our products listed under the {collection.title} collection</h2>

          {collection.products.map(item => (
            <>
              <li key={item.id}>
                <h3>
                  <Link to={`/${item.handle}`}>{item.title}</Link>
                </h3>

                <Img
                  fluid={item.images[0].localFile.childImageSharp.fluid}
                  alt={item.images.title}
                />

                {/* {item.images.map(image => (
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    alt={image.title}
                  />
                ))} */}

                <p>{item.description}</p>
                <p>{formatter.format(item.priceRange.maxVariantPrice.amount)}</p>
              </li>

            </>
          ))}
        </ul>

      </Layout>
    </>
  )
}

export default CollectionPage