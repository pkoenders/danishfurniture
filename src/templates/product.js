import React from "react"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
//import mediumZoom from 'medium-zoom'
import Img from 'gatsby-image'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'

import "./product.css"



import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from 'react-responsive-carousel'


//import ReactImageMagnify from 'react-image-magnify'


const ProductPage = ({ data }) => {

  const product = data.shopifyProduct

  //console.log("Price = " + data.shopifyProduct.variants.price)

  // Create our number formatter.
  const currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NZD',
  });

  //Quantity counter 
  function countQuantity(e) {
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
    //thumbWidth: 100,
    selectedItem: 0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });


  // function handleClickZoom(e) {
  //   e.preventDefault();
  //   const ZoomImg = mediumZoom('.medium-zoom-image')
  //   ZoomImg.open()
  // }


  //Zoom Props

  // const rimProps = {
  //   enlargedImagePosition: 'over',
  //   //enlargedImageContainerDimensions: '200%'
  // }

  //SLB props
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

      //showThumbnailsButton: false,


      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,

    },

    thumbnails: {
      showThumbnails: false,
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
        <p>{currencyFormat.format(product.variants[0].price)}</p>

        <SimpleReactLightbox>
          <SRLWrapper options={lightBoxOptions}>
            <Carousel {...getConfigurableProps()} >
              {product.images.map((image, i) => (
                <div key={i}>
                  <img
                    width='100%'
                    //fluid={image.localFile.childImageSharp.fluid}
                    src={image.localFile.url}
                    alt={product.title}
                    data-attribute="SRL"
                    className='carouselImg'
                  />


                  {/* <img
                    width='100%'
                    //fluid={image.localFile.childImageSharp.fluid}
                    src={image.localFile.url}
                    alt={product.title}
                  /> */}


                </div>
              ))}
            </Carousel>
          </SRLWrapper>
        </SimpleReactLightbox>

        < div className="quantity-group" >
          <label htmlFor="Quantity" className="quantity-label">Quantity:</label>
          <div className="quantity" data-required-text="Please enter a quantity.">
            <button
              type="button"
              className="quantity-decrease"
              name="subtract"
              onClick={countQuantity}>
              –
            </button>
            <input type="number" className="quantity-input" name="Quantity" size="2" min="1" max="100" maxLength="3" defaultValue="1" />
            <button
              type="button"
              className="quantity-increase"
              name="add"
              onClick={countQuantity}>
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary"
          name="addToCart">
          Add to cart
        </button>

        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        <p>SKU {product.variants[0].sku}</p>


      </Layout>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {

    shopifyProduct(handle: { eq: $handle }) {
      
      title
      handle
      description
      descriptionHtml
      priceRange {
        maxVariantPrice {
          amount
        }
      }

      images {
        localFile {
          url
          childImageSharp {
            fluid(maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }

      variants {
        sku
        price
      }
      vendor

    }
  }
`
export default ProductPage