import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetdata from '../custom-hooks/useGetdata'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase-configure'

const User = () => {
    const { data: userdata, loading } = useGetdata('users')

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <h4 className='pt-4 text center fw-bold'>Loading....</h4> : userdata.map(item => (
                                    <tr key={item.uid}>
                                        <td>{item.photoURL}</td>
                                        <td>{item.displayName}</td>
                                        <td>{item.email}</td>
                                        <td><button className='btn btn-danger' onClick={()=>{deleteUser(item.uid)}}>Delete</button></td>
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

export default User