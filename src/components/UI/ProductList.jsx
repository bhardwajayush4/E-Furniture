import React from 'react'
import ProductCard from './ProductCard'

const ProductList = (props) => {
  return (
    <>
    {
    props.data.map((item,index)=>(
      <ProductCard item={item} key = {index}/>
      ))
    }
    </>
  )
}

export default ProductList