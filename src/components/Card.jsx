import { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card({ foodItem, options }) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceOp = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleCart = async () => {
        const finalPrice = qty * parseInt(options[size], 10);
        let foodItemInCart = data.find(item => item.id === foodItem._id && item.size === size);

        if (foodItemInCart) {
            await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size });
        } else {
            await dispatch({
                type: "ADD",
                id: foodItem._id,
                name: foodItem.name,
                img: foodItem.img,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    };

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "400px" }}>
                <img src={foodItem.img} className="card-img-top" style={{ objectFit: "cover", maxHeight: "200px" }} alt={foodItem.name} />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(parseInt(e.target.value, 10))}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOp.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{qty * parseInt(options[size], 10)}/-
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-success ms-2" onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
