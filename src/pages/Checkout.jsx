import React from 'react'
import Helmet from '../components/helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Container, Row, Col, FormGroup } from 'reactstrap'
import '../styles/Checkout.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const Checkout = () => {
  const totalQty = useSelector(state=> state.cart.totalquantity) 
  const totalAmount = useSelector(state=> state.cart.totalamount)
  return (
    <Helmet title='checkout'>
      <CommonSection title='Checkout' />

      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='fw-bold mb-4'>Billing information</h6>
              <form className='billing__form'>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Enter your name' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="email" placeholder='Enter your email' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="number" placeholder='Phone number' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Street Address' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='City' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Postal Code' />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Country' />
                </FormGroup>
              </form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>Total Qty:<span>{totalQty}</span></h6>
                <h6>Subtotal:<span>${totalAmount}</span></h6>
                <h6>
                  <span>
                    Shipping:<br />Free Shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>Total Cost:<span>${totalAmount}</span></h4>
                <button className=" auth__btn w-100">Place an order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout