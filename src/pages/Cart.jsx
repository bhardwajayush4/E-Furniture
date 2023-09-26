import React from 'react'
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { CartActions } from '../components/redux/slices/CartSlices'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import '../styles/Cart.css'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items)
  const totalAmount = useSelector(state => state.cart.totalamount)

  const Tr = ({ item }) => {
    const dispatch = useDispatch()

    const deleteHandler = () => {
      dispatch(CartActions.deleteItemCart(item.id))
    }

    return (
      <tr>
        <td>
          <img src={item.image} alt='' />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}x</td>
        <td><motion.i whileTap={{ scale: 1.2 }} onClick={deleteHandler} class="ri-delete-bin-6-line"></motion.i></td>
      </tr>
    )
  }

  return (
    <Helmet title='cart'>
      <CommonSection title='Shopping Cart' />

      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {cartItems.length === 0 ? (<h2 className='fs-4 text-center'>No items are found</h2>) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Detail</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>)}

            </Col>

            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
              <div >
                <button className='buy__btn d-flex w-100 justify-content-center' ><Link to='/shop'>Continue shopping</Link></button>
                <button className='buy__btn w-100 mt-2'><Link to='/checkout'>Checkout</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Cart
