import { useCart, useDispatchCart } from "./ContextReducer"

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 text-center fs-3 w-100">
        The Cart is Empty!
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async ()=>{
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:8080/home/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toString()
        })
      }  
    );
    if(response.status == 200){
      dispatch({type: "DROP"});
      console.log("Checked Out !");
    }

  }

  return (
    <div className="container mt-5 m-auto">
      <table className="table">
        <thead className="text-success">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((food, idx) => (
              <tr key={idx}>
                <td scope="row">{idx + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0" >
                    <i class="fa-solid fa-trash-can" onClick={() => dispatch({ type: "REMOVE", idx: idx })}></i>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center">
        <span className="fs-4">Total Price: {totalPrice}</span>
        <button className="btn btn-success btn-md text-white" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  )
}
