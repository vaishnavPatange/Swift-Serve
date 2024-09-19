import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            return [...state, {id: action.id, name: action.name, qty: action.qty, size: action.size, img: action.img, price: action.price}];

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.idx, 1);
            return newArr;

        case "UPDATE":
            return state.map((food) => 
                food.id === action.id && food.size === action.size
                    ? { ...food, qty: parseInt(action.qty, 10), price: action.price }
                    : food
            );

        case "DROP" : 
            let emptyArr = [];
            return emptyArr;

        default:
            console.log("Some error occurred in reducer!");
            return state;  // Ensure that the state is always returned
    }
};

export const CartProvider = ({ children }) => {  // Capitalize CartProvider
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
