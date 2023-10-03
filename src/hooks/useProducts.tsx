import ProductsContext from "../context/ProductsProvider";
import {useContext} from 'react'
import { UseProductCotextType } from "../context/ProductsProvider";


const useProducts = ():UseProductCotextType => {
  return useContext(ProductsContext)
}

export default useProducts