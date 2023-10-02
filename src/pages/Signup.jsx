import { useState } from 'react'
import Helmet from '../components/helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import '../styles/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../Firebase-configure'
import { storage } from '../Firebase-configure'
import { db } from '../Firebase-configure'
import { toast } from 'react-toastify'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const signup = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const storageref = ref(storage, `images/${Date.now() + username}`)
      const uploadTask = uploadBytesResumable(storageref, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadUrl => {
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl,
            })

            // store user data in firestore firebase
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadUrl,
            });
          })
        })
      setLoading(false)
      toast.success('Account created successfully')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!')

    }
  }

  return (
    <Helmet title='signup'>

      <section>
        <Container>
          <Row>
            {loading ? <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading.....</h5></Col> :
              <Col lg='6' className='m-auto text-center'>
                <h4 className='mb-3 fw-bold d-flex justify-content-center'>Login</h4>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup className='group__form'>
                    <input className='text-center' type="file" placeholder='Choose File' onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type='submit' className=" auth__btn mt-3">Create an account</button>
                  <p>Already have an account?{' '}<Link to='/login'>Login</Link></p>
                </Form>
              </Col>}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Signup