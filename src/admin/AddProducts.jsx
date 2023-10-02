import { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase-configure';
import { db } from '../Firebase-configure';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const AddProducts = () => {
  const [title, setTitle] = useState();
  const [shortDesc, setShortDesc] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = async (event) => {
    event.preventDefault()

    setLoading(true)
    // const product = [{
    //   title: title,
    //   shortDesc: shortDesc,
    //   decription: desc,
    //   price: price,
    //   category: category,
    //   imageURL: productImg
    // }]
    // console.log(product)

    try {
      const docRef = await collection(db, 'Products')
      const storageref = ref(storage, `products${Date.now() + productImg}`)
      const uploadTask = uploadBytesResumable(storageref, productImg)

      uploadTask.on(
        (error) => {
          toast.error('Images not uploaded!')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await addDoc(docRef, {
              title: title,
              shortDesc: shortDesc,
              decription: desc,
              price: price,
              category: category,
              imageURL: downloadURL
            })
          })
          setLoading(false)
          toast.success('product added successfully')
          navigate('/dashboard/all-products')
        })
    } catch (error) {
      toast.error('product not added!')
      setLoading(false)
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
           {loading? <h4>loading....</h4>: (
            <>
             <h4 className='mb-4'>Add products</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className='form__group'>
                <span>Product title</span>
                <input type="text" placeholder='title....' value={title} onChange={(e) => setTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>short description</span>
                <input type="text" placeholder='lorem....' value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Description</span>
                <input type="text" placeholder='desc....' value={desc} onChange={(e) => setDesc(e.target.value)} required />
              </FormGroup>
              <div className='d-flex align-items-center justify-content-between gap-4'>
                <FormGroup className='form__group w-50'>
                  <span>price</span>
                  <input type="text" placeholder='$100' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </FormGroup>
                <FormGroup className='form__group w-50'>
                  <span>category</span>
                  <select className='p-2 w-100' value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value='category'>Select category</option>
                    <option value='chair'>chair</option>
                    <option value='sofa'>sofa</option>
                    <option value='mobile'>mobile</option>
                    <option value='watch'>watch</option>
                    <option value='wireless'>wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className='form__group'>
                  <span>Product image</span>
                  <input type="file" onChange={(e) => setProductImg(e.target.files[0])} required />
                </FormGroup>
              </div>
              <button className='buy__btn' type='submit'>Add product</button>
            </Form></>
           )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts