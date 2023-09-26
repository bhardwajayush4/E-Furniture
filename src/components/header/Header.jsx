import { useRef, useEffect } from 'react'
import { Container, Row } from 'reactstrap'
import logo from '../../assets/images/eco-logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import userIcon from '../../assets/images/user-icon.png'
import './Header.css'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth } from '../../Firebase-configure'

const nav__links = [{
  path: 'home',
  element: 'Home',
},
{
  path: 'shop',
  element: 'Shop',
},
{
  path: 'cart',
  element: 'Cart',
}
]

const Header = () => {
  const navigate = useNavigate()

  const headref = useRef(null)
  const menuref = useRef(null)
  const profileUserRef = useRef(null)
  const { currentUser } = useAuth()

  const scrollHandlerFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headref.current.classList.add("sticky__header")
      }
      else {
        headref.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    scrollHandlerFunc()

    return () => window.removeEventListener('scroll', (scrollHandlerFunc))
  })

  const toggleMenu = () => menuref.current.classList.toggle('active__menu')

  const totalQuantity = useSelector(state => state.cart.totalquantity)

  const navigateToCart = () => {
    navigate('/cart')
  }

  const toggleProfileAction = () => profileUserRef.current.classList.toggle('show__profileActions')

  const Logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out successfully')
      navigate('/home')
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  return <header className="header" ref={headref} >
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={logo} alt="" />
            <div>
              <h1>Multimart</h1>
              {/* <p>Since 1995</p> */}
            </div>
          </div>

          <div className="navigation" ref={menuref} onClick={toggleMenu}>
            <ul className="menu">
              {nav__links.map((item) => (
                <li className="nav__item">
                  <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.element}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__icons">
            <span className='fav__icons'>
              <i class="ri-heart-line"></i>
              <span className="badge">1</span>
            </span>
            <span className="cart__icons" onClick={navigateToCart}>
              <i class="ri-shopping-bag-line"></i>
              <span className="badge">{totalQuantity}</span>
            </span>
            <div className='profile'>
              <motion.img whileTap={{ scale: 1.2 }} src={currentUser ? currentUser.photoURL : userIcon} alt='' onClick={toggleProfileAction} />
              <div className="profile__actions" ref={profileUserRef} onClick={toggleProfileAction}>
                {
                  currentUser ? (
                    <span onClick={Logout}>Logout</span>
                  ) : (
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                    </div>
                  )}
              </div>
            </div>
            <div className="mobile__menu">
              <span onClick={toggleMenu}><i class="ri-menu-line"></i></span>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  </header>
}

export default Header