import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetdata from '../custom-hooks/useGetdata'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase-configure'
import { toast } from 'react-toastify'

const AllProducts = () => {
  const { data: ProdutsData, loading } = useGetdata('Products')

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'Products', id))
    toast.success('Deleted')
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <h3 className='py-5 text-center fw-bold'>Loading....</h3> :
                  ProdutsData.map(item => (
                    <tr key={item.id}>
                      <td><img src={item.imageURL} alt='' /></td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td><button className='btn btn-danger' onClick={() => { deleteProduct(item.id) }}>Delete</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts