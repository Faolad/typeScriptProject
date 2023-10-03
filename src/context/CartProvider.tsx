import {createContext, ReactElement, useReducer, useMemo} from 'react'


export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}


type CartStateType = {
    cart: CartItemType[]
}
const initCartState:CartStateType = {cart:[]}

// different reducer type that we ae going to use, converting string to var
const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

//type for action
export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state:CartStateType, action:ReducerAction):CartStateType => {
    switch(action.type){
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload){
                throw new Error("Action.payload is missing in ADD")
            }

            const {sku, name, price } = action.payload
            //filter the cart coming from the existing cart in the state
            // cart now doesnt have existing sku
            // check if the cart want to add doesnot exist before, returns all cart if the new doesnt exist before
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            //select the item that needs to be updated if already exists
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty:number = itemExists ? itemExists.qty + 1 : 1
            return {...state, cart: [...filteredCart, {sku, name, price, qty}]}  
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload){
                throw new Error("Action.payload is missing in REMOVE")
            }
            const {sku} = action.payload
            //filter the cart coming from the existing cart in the state
            // cart now doesnt have existing sku
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            return {...state, cart: [...filteredCart]}

        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload){
                throw new Error("Action.payload is missing in QUANTITY")
            }
            
            const {sku, qty} = action.payload

            //item we are not updating
            const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)
            
            //item to update
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if(!itemExists) {
                throw new Error("Item must exist in order to update the quantity")
            }
            const updatedItem:CartItemType = { ...itemExists, qty}
            return {...state, cart: [...filteredCart, updatedItem]}

        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return {...state, cart: []}
        }

        default:
            throw new Error("No action type matched")
    }
}

//Context 

const useCartContext = (initCartState:CartStateType)=>{
    const [state, dispatch] = useReducer(reducer, initCartState)

    // return same thing as REDUCER_ACTION_TYPE alwaysbut memoized so it wont re render
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((prev, cartItem)=>{
        return prev + cartItem.qty
    },0) 

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD'})
        .format(state.cart.reduce((prev, cartItem)=>{
            return prev + (cartItem.qty * cartItem.price)
        },0))

    

    const cart = state.cart.sort((a,b)=>{
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })    

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type UseCartContextType = ReturnType<typeof useCartContext>


const initContextState:UseCartContextType = {
    dispatch: ()=>{},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE, 
    totalItems: 0,
    totalPrice: '',
    cart: [],
} 

const CartContext = createContext<UseCartContextType>(initContextState)


type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const CartProvider = ({children}:ChildrenType ): ReactElement =>{

    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;