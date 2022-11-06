
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './index.css'
const url = "http://localhost:5000/"

const App = () => {
    const [productsList, setProductsList] = useState();
    const [filter, setFilter] = useState('undefined');

    //Get all the products on first render
    useEffect(() => {

        const getProducts = async () => {
            try {
                const data = await axios.get(url);
                setProductsList(data.data.result);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, []);


    // get products depending upon the filter applied
    useEffect(() => {
        const getProducts = async () => {
            try {
               
                const data = await axios.get(url + `?filter=${filter}`);
                setProductsList(data.data.result);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, [filter]);


    //handle filter
    const handleFilter = (e) => {
        console.log(e.target.value);
        setFilter(e.target.value);
    }

    return (
        <div style={{ backgroundColor: "gainsboro" }} className='w-50 mx-auto min-vh-100'>

            {/* navbar */}
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="container">
                    <a class="navbar-brand text-white" href="#">TAXMANN</a>
                </div>
            </nav>


            {/* dropdown to filter */}
            <div class="dropdown  w-50 my-3 ml-5 ">
                <select style={{ backgroundColor: "honeydrew" }} className='dropdown-toggle p-2 rounded  border-none text-dark' name="filter" onChange={handleFilter}>
                    <option className='p-2' selected disabled>Filter</option>
                    <option className='p-2' value="MOBILE_PRICE_RANGE_FROM_$2000_TO_$9000">Mobile price range from $2000  to $9000 </option>
                    <option className='p-2' value="ALL_SUBCATEGORY_WITH_POPULARITY_LESS_THAN_500">All subcategory with popularity less than 500</option>
                    <option className='p-2' value="LG_MOBILE">LG mobile</option>
                    <option className='p-2' value="TOP_5_BASED_ON_POPULARITY">Top 5 based on popularity</option>
                    <option className='p-2' value="TOTAL">total</option>
                </select>
            </div>


            {/* display prodcuts */}
            {productsList && productsList.length > 1 && productsList.map(v => {
                return (<div key={v._id} class="card border-secondary mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
                    <div class="card-header">{v.id}</div>
                    <div class="card-body text-secondary">
                        {v.productObj.subcategory.toLowerCase() == "mobile"
                            ? <h5 class="card-title "><i class="fa fa-mobile pr-2 text-danger"></i>{v.productObj.title}</h5>
                            : <h5 class="card-title "><i class="fa-solid fa-tablet-screen-button pr-2 text-primary"></i>{v.productObj.title}</h5>
                        }
                        <p class="card-text"><i className='fa-solid fa-star pr-2 text-warning'></i>{v.productObj.popularity}</p>
                        <p class="card-text text-success font-weight-bold">$  {v.productObj.price}</p>
                    </div>
                </div>)
            })}

            {/* display total Items  */}
            {productsList && productsList.length == 1 && productsList.map(v => {
                return (
                    <div key={v.total} class="card border-secondary mb-3 mx-auto" style={{ maxWidth: "18rem" }}>
                        <div class="card-header">Total products : {v.total}</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title "><i class="fa fa-mobile pr-2 text-danger"></i>Mobile : {v.mobile}</h5>
                            <h5 class="card-title "><i class="fa-solid fa-tablet-screen-button pr-2 text-primary"></i>Tablet :{v.tablet}</h5>
                        </div>
                    </div>)
            })}
        </div >
    )
}

export default App