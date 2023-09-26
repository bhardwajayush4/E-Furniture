import { useState, useRef, useEffect } from 'react'
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import '../styles/Product-detail.css'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch } from 'react-redux'
import { CartActions } from '../components/redux/slices/CartSlices'
import { toast } from 'react-toastify'

const ProductsDetails = () => {
  const [tab, setTab] = useState('desc')
  const [rating, setRating] = useState(null)
  const dispatch = useDispatch()

  const reviewUser = useRef('')
  const reviewMsg = useRef('')

  const { id } = useParams();

  const product = products.find((item) => item.id === id);

  const { imgUrl, productName, price, avgRating, shortDesc, description, reviews, category } = product

  const relatedProducts = products.filter(item => item.category === category)


  const submitHandler = (event) => {
    event.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      username: reviewUserName,
      text: reviewUserMsg,
      rating: rating,
    }


    console.log(reviewObj)
    toast.success('Review submitted!')
  }

  const addCart = () => {
    dispatch(CartActions.addItemCart({
      id,
      imgUrl,
      price,
      productName,
    }))
    toast.success('Product added successfully!')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt='' />
            </Col>
            <Col lg='6' >
              <div className="product__detail">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-4 mb-3">
                  <div>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-s-fill"></i></span>
                    <span ><i class="ri-star-half-s-fill"></i></span>
                  </div>
                  <p>(<span>{avgRating}</span> ratings)</p>
                </div>
                <div className='d-flex align-items-center gap-4'>
                  <span className='product__price'>${price}</span>
                  <span>Category : {category}</span>
                </div>
                <p className='mt-3'>{shortDesc}</p>
                <motion.button whileHover={{ scale: 1.2 }} className="buy__btn" onClick={addCart}>Add to cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='tab__wrapper d-flex align-items-center gap-4'>
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
              </div>

              {tab === 'desc' ? (<div className='tab__content mt-4'>
                <p>{description}</p>
              </div>) : (
                <div className='product__review'>
                  <div className="wrapper__review">
                    <ul>
                      {reviews.map((item, index) => (
                        <li key={index} >
                          <h6 className='mt-5'>Jhon Doe</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>

                    <div className="review__forum">
                      <h4>Leave your experience</h4>
                      <form onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder='Enter name' ref={reviewUser} />
                        </div>

                        <div className="form__group d-flex align-items-center justify-content-center gap-4 rating__group">
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i class="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i class="ri-star-s-fill"></i></motion.span>
                        </div>

                        <div className="form__group">
                          <textarea rows='5' placeholder='Review message....' ref={reviewMsg} />
                        </div>
                        <motion.button whileHover={{ scale: 1.1 }} type='submit' className="buy__btn">Submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>)}
            </Col>
            <Col lg='12'>
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductsDetails