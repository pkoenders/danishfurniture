import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import Img from 'gatsby-image'
import SimpleReactLightbox from "simple-react-lightbox"
import { SRLWrapper } from "simple-react-lightbox"


import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'

//import productStyles from './productStyles.module.scss';



const ProductPage = ({ data }) => {
  const product = data.shopifyProduct

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NZD',
  });



  //Carousel props
  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: false,
    showIndicators: false,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: true,
    autoPlay: false,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 100,
    selectedItem: 0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });


  // SLB props
  const lightBoxOptions = {
    settings: {
      overlayColor: '#ffffff',
      disablePanzoom: false,
      hideControlsAfter: false,
      slideAnimationType: 'slide',
      slideSpringValues: [250, 500],
      slideTransitionTimingFunction: 'easeIn',
    },
    buttons: {
      backgroundColor: '#0b1f35e8',
      iconColor: '#ffffff',
      size: '42px',

      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,

    },
    caption: {
      showCaption: false,
      captionColor: '#ffffff',

    }
  };

  return (
    <>
      <Layout>
        <h1>{product.title}</h1>

        <SimpleReactLightbox>
          <SRLWrapper options={lightBoxOptions}>
            <Carousel {...getConfigurableProps()}>
              {product.images.map((image, i) => (
                <img
                  className='medium-zoom-image'
                  key={i}
                  width='100%'
                  src={image.localFile.url}
                  alt={product.title}
                  data-attribute='SRL'
                  loading='lazy'
                //style="pointerEvents: visible;"
                />
              ))}
            </Carousel>
          </SRLWrapper>
        </SimpleReactLightbox>

        {/* <SimpleReactLightbox>
          <SRLWrapper options={lightBoxOptions}>
            <Carousel {...getConfigurableProps()}>
              {product.images.map((image, i) => (
                <div key={i}>
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    src={image.localFile.url}
                    alt={product.title}
                  />
                </div>
              ))}
            </Carousel>
          </SRLWrapper>
        </SimpleReactLightbox> */}

        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        <p>{formatter.format(product.priceRange.maxVariantPrice.amount)}</p>

      </Layout>
    </>
  )
}



export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
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
`

export default ProductPage