import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
// import Img from 'gatsby-image'
// import SimpleReactLightbox from "simple-react-lightbox"
// import { SRLWrapper } from "simple-react-lightbox"


import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'


const ProductPage = ({ data }) => {

  const product = data.shopifyProduct

  console.log("Price = " + product.variants.price)

  // Create our number formatter.
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NZD',
  });

  //Quantity counter 
  function quantityCounter(e) {
    let countThis = e.target.name
    let inputVal = parseInt(document.querySelector(".quantity-input").value)
    if (countThis === 'add') {
      inputVal = inputVal + 1
    } else {
      inputVal = inputVal - 1
    }
    if (inputVal < 1) {
      inputVal = 1
    }
    if (inputVal > 100) {
      inputVal = 100
    }
    document.querySelector(".quantity-input").value = inputVal
  }

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
        <p>{currencyFormat.format(product.priceRange.maxVariantPrice.amount)}</p>
        <p>{currencyFormat.format(product.variants.price)}</p>
        <p>{product.variants.price}</p>

        <Carousel {...getConfigurableProps()}>
          {product.images.map((image, i) => (
            <img
              className='medium-zoom-image'
              key={i}
              width='100%'
              src={image.localFile.url}
              alt={product.title}
              //data-attribute='SRL'
              loading='lazy'
            //style="pointerEvents: visible;"
            />
          ))}
        </Carousel>

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

        <div className="quantity-group">
          <label htmlFor="Quantity" className="quantity-label">Quantity:</label>
          <div className="quantity" data-required-text="Please enter a quantity.">
            <button
              type="button"
              className="quantity-decrease"
              name="subtract"
              onClick={quantityCounter}>
              –
            </button>
            <input type="number" className="quantity-input" name="Quantity" size="2" min="1" max="100" maxLength="3" defaultValue="1" />
            <button
              type="button"
              className="quantity-increase"
              name="add"
              onClick={quantityCounter}>
              +
            </button>
          </div>
        </div>

        <p>{product.variants.title}</p>
        <button
          type="button"
          className="btn-primary"
          name="addToCart">
          Add to cart
        </button>

        <p>{data.shopifyProduct.variants.sku}</p>

        (description)
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        <br />
        (descriptionHtml)
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />


      </Layout>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {

      variants {
        price
        sku
        title
      }

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