import { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCate, setFoodCate] = useState([]);
    const [search, setSearch] = useState("");

    const loadData = async () => {
        let data = await fetch("http://localhost:8080/home/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        let response = await data.json();
        setFoodCate(response[1]);
        setFoodItems(response[0]);
        // console.log(response[0], response[1]);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (<>
        <div><NavBar /></div>
        <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
            <div className="carousel-caption" style={{ zIndex: "14" }}>
                <div className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setSearch(e.target.value)}/>
                </div>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=900&h=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=900&h=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGl6emF8ZW58MHx8MHx8fDI%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&h=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyeWFuaXxlbnwwfHwwfHx8Mg%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div></div>

        <div className="m-7 container">
            {
                foodCate.length > 0 ?
                    foodCate.map((data) => {
                        return (<div className="row mb-3">
                            <div key={data._id} className="fs-3 mt-3">{data.categoryName}</div>
                            <hr />
                            {foodItems.length > 0 ?
                                foodItems.filter((item) => (item.categoryName === data.categoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) )
                                    .map((filteredItem) => {
                                        return (
                                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3" key={filteredItem._id}>
                                                <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                                            </div>
                                        )
                                    }) : <div>No such data found</div>
                            }
                        </div>
                        )
                    }) : <div>Data not found</div>
            }
        </div>
        <div><Footer /></div>
    </>)
}