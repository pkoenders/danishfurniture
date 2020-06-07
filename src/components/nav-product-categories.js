import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

function NavProductCateories() {

    const data = useStaticQuery(graphql`
        query {
            allShopifyCollection(sort: { fields: [title] }) {
                edges {
                    node {
                        title
                        handle
                        id
                        image {
                          localFile {
                            url
                                childImageSharp {
                                    fluid(maxWidth: 500, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)



    return (
        <>
            <h2> Product categories (collections)</h2>
            <ul>
                {/* {data.allShopifyCollection.edges.map(({ node }) => ( */}
                {data.allShopifyCollection.edges.map((edge, i) => (

                    //{product.images.map((image, i) => (
                    //console.log("node =" + node)
                    <li key={i} >
                        <Link to={`${edge.node.handle}`}>{edge.node.title}

                            {edge.node.image &&
                                <Img
                                    width='50%'
                                    fluid={edge.node.image.localFile.childImageSharp.fluid}

                                    //src={edge.node.image.localFile.url}

                                    alt={edge.node.title}
                                />
                            }
                        </Link>

                    </li>
                ))}
            </ul>
        </>
    )
}

export default NavProductCateories