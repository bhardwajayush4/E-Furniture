import React from 'react'
import Helmet from '../components/helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import heroImg from '../assets/images/hero-img.png'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Services from '../services/Services'
import ProductList from '../components/UI/ProductList'
import Products from '../assets/data/products'
import { useEffect, useState } from 'react'
import CounterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock'

const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    const filteredTrendData = Products.filter((item) => item.category === 'chair')
    setTrendingProducts(filteredTrendData)

    const filteredbestSalesData = Products.filter((item) => item.category === 'sofa')
    setBestSalesProducts(filteredbestSalesData)

    const filteredmobileProducts = Products.filter((item) => item.category === 'mobile')
    setMobileProducts(filteredmobileProducts)

    const filteredwirelessProducts = Products.filter((item) => item.category === 'wireless')
    setWirelessProducts(filteredwirelessProducts)

    const filteredpopularProducts = Products.filter((item) => item.category === 'watch')
    setPopularProducts(filteredpopularProducts)

  }, [setTrendingProducts, setBestSalesProducts])

  const year = new Date().getFullYear()
  return (
    <Helmet title={'Home'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make your interior more minimiliastic and modern.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At sint dolorum sit magni saepe maiores tempora neque soluta voluptas nisi.</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to='shop'>Shop now</Link></motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__div'>
                <img src={heroImg} alt='' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className="section__title">Trending products</h2>
            </Col>
            <ProductList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Limited offers</h4>
                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileHover={{ scale: 1.1 }} className="store__btn">
                <Link to='/shop'>Visit Store</Link>
              </motion.button>

            </Col>
            <Col lg='6' md='6' className='text-end'>
              <img src={CounterImg} alt='' />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={mobileProducts} />
            <ProductList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className="section__title">Popular in category</h2>
            </Col>
            <ProductList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home