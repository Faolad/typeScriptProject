import {ReactElement, memo} from 'react'
import { ProductType } from "../context/ProductsProvider"
import { ReducerAction, ReducerActionType } from "../context/CartProvider"

type PropsType = {
    product:ProductType
    dispatch: React.Dispatch<ReducerAction>
    REDUCER_ACTIONS: ReducerActionType
    inCart: boolean
}
const Product = ({product, dispatch, REDUCER_ACTIONS, inCart}:PropsType):ReactElement => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    console.log(img)
    //old way, works in CRA but not in vite
    // const img: string = require(`../images/${product.sku}`)

    const onAddToCart = ()=>dispatch({
        type:REDUCER_ACTIONS.ADD, payload:{...product, qty:1}
    })
        
    const itemInCart = inCart ? ' → Item in Cart: ✔️' : null

    const content = 
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className='product__img' />
            <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
            {/* disabled={inCart} */}
        </article>

    
    
    return content
}

function areProductEqual({product: prevProduct, inCart:prevInCart}:PropsType,
     {product: nextProduct, inCart:nextInCart}:PropsType){

        return Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof ProductType] ===
                        nextProduct[key as keyof ProductType ] 
                && prevInCart === nextInCart
        }

        )
     }

const MemoizedProduct = memo<typeof Product>(Product, areProductEqual)
export default MemoizedProduct