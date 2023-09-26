import { Col } from 'reactstrap'
import '../../styles/Product-card.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CartActions } from '../redux/slices/CartSlices';

const ProductCard = (props) => {
const dispatch = useDispatch()

const addCartHandler = ()=>{
  dispatch(CartActions.addItemCart({
    id: props.item.id,
    price: props.item.price,
    imgUrl: props.item.imgUrl,
    productName: props.item.productName
  }))
  toast.success('Add successfully!')
}
  return (
    <Col lg='3' md='4'>
      <div className='product__item'>
        <div className="product__img">
          <motion.img whileHover={{scale:0.9}} src={props.item.imgUrl} alt="" />
        </div>
        <div className='p-2 product__info'>
          <h3 className="product__name"><Link to={`/shop/${props.item.id}`}>{props.item.productName}</Link></h3>
          <span>{props.item.category}</span>
        </div>
        <div className="product__card-bottom d-flex text-align-center justify-content-between p-2">
          <span className="price">{props.item.price}</span>
          <motion.span whileTap={{scale:1.2}} onClick={addCartHandler}>
            <i class="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  )
}

export default ProductCard