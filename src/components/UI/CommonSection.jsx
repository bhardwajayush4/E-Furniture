import React from 'react'
import { Container } from 'reactstrap'
import '../../styles/Common-section.css'

const CommonSection = (props) => {
    return (
        <section className="Common__section">
            <Container className='text-center'>
                <h1>{props.title}</h1>
            </Container>
        </section>
    )
}

export default CommonSection