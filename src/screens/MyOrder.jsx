import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            console.log("User Email:", userEmail);

            const response = await fetch("http://localhost:8080/home/myOrder", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userEmail })
            });

            const fetchedData = await response.json();
            setOrderData(fetchedData.orderData || []);
            // console.log(fetchedData);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Helper function to format date and time
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <div>
            <NavBar />
            <div>
            {orderData && orderData.length > 0 ? (
    <div>
        {orderData[0].order_data.map((item, itemIndex) => (
            <div key={itemIndex} className="m-5">
                <h3>{formatDate(item[0].order_date)}</h3> {/* Format the date */}
                <hr />
                <div className="row">
                    {item.slice(1).map((arrayData, arrayDataIndex) => (
                        <div key={arrayDataIndex} className="card m-3" style={{ width: "18rem", maxHeight: "400px" }}>
                            <img src={arrayData.img} className="card-img-top" style={{ objectFit: "cover", maxHeight: "200px" }} alt={arrayData.name} />
                            <div className="card-body">
                                <h5 className="card-title">{arrayData.name}</h5>
                                <div className="container w-100">
                                    <span className="m-1">{arrayData.qty}</span>
                                    <span className="m-1">{arrayData.size}</span>
                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        ₹{arrayData.price}/-
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
) : (
    <p>No order data found!</p>
)}

            </div>
            <Footer />
        </div>
    );
}
