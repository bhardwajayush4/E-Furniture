import React from 'react'
import '../styles/Admin-nav.css'
import { Container, Row } from 'reactstrap'
import useAuth from '../custom-hooks/useAuth'
import { NavLink } from 'react-router-dom'

const admin__nav = [
  {
    display: 'dashboard',
    path: '/dashboard',
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products',
  },
  {
    display: 'order',
    path: '/dashboard/order',
  },
  {
    display: 'user',
    path: '/dashboard/user',
  }
]

const AdminNav = () => {
  const { currentUser } = useAuth();

  return (
    <header className='admin__header'>
      <div className='admin__nav-top'>
        <Container>
          <div className='admin__nav-wrapper-top'>
            <div className='logo'>
              <h2>Multimart</h2>
            </div>
            <div className='search__box pb-3'>
              <input type="search" placeholder='search....' />
              <span><i class="ri-search-line"></i></span>
            </div>
            <div className='admin__nav-top-right'>
              <span><i class="ri-notification-4-line"></i></span>
              <span><i class="ri-settings-3-line"></i></span>
              <img src={currentUser && currentUser.photoURL} alt='' />
            </div>
          </div>
        </Container>
      </div>

      <section className='admin__menu p-0'>
        <Container>
          <Row>
            <div className='admin__navigation'>
              <ul className="admin__list">
                {admin__nav.map(item => (
                  <li className="admin__menu-item">
                    <NavLink to={item.path} className={navclass => navclass.isActive ? 'admin__active' : ''}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </header>
  )
}

export default AdminNav