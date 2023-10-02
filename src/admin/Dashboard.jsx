import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/Dashboard.css'
import useGetdata from '../custom-hooks/useGetdata'

const Dashboard = () => {
  const {data: product} = useGetdata('Products')
  const {data: user} = useGetdata('users')
  return (
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="revenue__box">
              <h5>Total sales</h5>
              <span>7890</span>
            </div>
          </Col>
          <Col lg='3'>
            <div className="order__box">
              <h5>Total orders</h5>
              <span>789</span>
            </div>
          </Col>
          <Col lg='3'>
            <div className="product__box">
              <h5>Total products</h5>
              <span>{product.length}</span>
            </div>
          </Col>
          <Col lg='3'>
            <div className="user__box">
              <h5>Total users</h5>
              <span>{user.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard