import { createContext, ReactElement, useState } from "react"


export type ProductType = {
    sku: string,
    name: string,
    price: number
}

// define initail state for products, the product is an array
// can be empty array too
// const initState:ProductType[] = []
const initState:ProductType[] = [
    {
        "sku": "item0001",
        "name": "Widget",
        "price": 9.99
    },
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
    }
] 

//to use for context
export type UseProductCotextType = { products: ProductType[] }

// uses the above type and get empty array uses ProductType[]
const initContextState:UseProductCotextType = {
    products: []
}

//create context using the above type
const ProductsContext = createContext<UseProductCotextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}
export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    // const [products, setProducts] = useState<ProductType[]>(initState)
    const [products] = useState<ProductType[]>(initState)

    // useEffect(()=>{
    //     const fetchProduct = async (): Promise<ProductType[]>=>{
    //         const data = fetch('http://localhost:3500/products')
    //             .then(resp=> {return resp.json()})
    //             .catch(err => {
    //                 if (err instanceof Error)
    //                     console.log(err.message)
    //             })
    //         return data
            
        
    //     }
    //     fetchProduct().then(products=>setProducts(products))

    // },[])
    
  return (
    <ProductsContext.Provider value={{products}}>
        {children}
    </ProductsContext.Provider>
    
  )
}

export default ProductsContext

// npx json-server -w data/products.json -p 3500