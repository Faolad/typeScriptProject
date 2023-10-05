import { useState } from "react"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ProductList from "./components/ProductList"
import useMessage from "./hooks/useMessage"


function App() {
  const [viewCart, setViewCart] = useState<boolean>(false)
  const {message} = useMessage()
  

  const pageContent = viewCart ? <Cart /> : <ProductList />
  const messageText= (message:string)=>{
    if (message.length) return message
  } 
  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      <div style={{backgroundColor: "red", fontWeight: 30, color: 'white'}}>
        {messageText(message)}
      </div>
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  )
  return content
}

export default App
