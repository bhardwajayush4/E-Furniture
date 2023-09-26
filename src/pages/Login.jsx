import { useState } from 'react'
import Helmet from '../components/helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../Firebase-configure'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const usercredential = await signInWithEmailAndPassword(auth, email, password)
      const user = usercredential.user
      console.log(user)
      setLoading(false)
      toast.success('Signed in successfully!')
      navigate('/checkout')
    } catch (error) {
      toast.error('Something went wrong!')
      setLoading(false)
    }
  }

  return (
    <Helmet title='login'>

      <section>
        <Container>
          <Row>
            {loading ? (<Col className='text-center'><h5 className='fw-bold'>Loading......</h5></Col>) : (
              <Col lg='6' className='m-auto text-center'>
                <h4 className='mb-3 fw-bold d-flex justify-content-center'>Login</h4>
                <Form className='auth__form' onSubmit={signin}>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <button type='submit' className=" auth__btn mt-3">Login</button>
                  <p>Don't have an account?{' '}<Link to='/signup'>Create an account</Link></p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login