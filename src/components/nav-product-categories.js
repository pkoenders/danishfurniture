import React from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'

function NavProductCateories() {

    const data = useStaticQuery(graphql`
        query {
            allShopifyCollection(sort: { fields: [title] }) {
                edges {
                    node {
                        title
                        handle
                        id
                    }
                }
            }
        }
    `)



    return (
        <>
            <h2> Product categories (collections)</h2>
            <ul>
                {data.allShopifyCollection.edges.map(({ node }) => (
                    //console.log("node =" + node)
                    <li key={node.id} >
                        <Link to={`${node.handle}`}>{node.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default NavProductCateories