import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import img1 from "../assets/admin-speedy/assets/images/logo.svg";
import Spinner from "react-bootstrap/Spinner";
const AdminProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState("loading");
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(null);
  const [category, SetCategory] = useState([]);
  const [catogry_id, SetCategoryId] = useState("");
  const [product_name, SetProductName] = useState("");
  const [description, SetDescription] = useState("");

  const [photos, SetFileName] = useState("");
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/getAllProduct`
        );
        const res2 = await axios.get(
          ` https://fast-atoll-73668.herokuapp.com/fetchCatogry`
        );

        let getCategory = res2.data.message;
        console.log(getCategory);
        SetCategory(getCategory);
        setLoading("");
        //console.log(res.data.message);
        let get = res.data.message;
        console.log(get);
        setProduct(res.data.message);
        setUrl("https://fast-atoll-73668.herokuapp.com/");
      } catch (e) {
        console.log(e);
      }
    }
    getProduct();
  }, []);
  const ModalHandler = (a) => {
    //console.log(a)
    if (a === false) setShow(true);
    else setShow(false);
  };
  const selectHandler = (e) => {
    console.log(e);
    //alert(e.target.value);
    SetCategoryId(e.target.value);
  };

  const onDeleteHandler = (a, b) => {
    console.log(a, b);
    let id = a;
    console.log(id);
    fetch("https://fast-atoll-73668.herokuapp.com/deleteProduct", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let x = product.filter((item) => item._id !== id);
        setProduct(x);
      })
      .catch((e) => console.log(e));
  };

  const formHandler = (e) => {
    // alert(e.target.filename)
    SetFileName(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handleSubmit = () => {
    async function addProduct() {
      try {
        console.log("phots" + photos);
        const formData = new FormData();
        formData.append("photos", photos);
        formData.append("catogry_id", catogry_id);
        formData.append("product_name", product_name);
        formData.append("description", description);
        console.log(formData);
        let result = await axios({
          method: "post",
          url: "https://fast-atoll-73668.herokuapp.com/addproductAdmin",
          data: formData,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "multipart/form-data",
          },
        });
        //console.log(result)
        //console.log(result.data)
        let getProduct = result.data.product;
        console.log(getProduct);

        let products_name = getProduct.product_name;
        let product_description = getProduct.description;
        let product_image = getProduct.image_array;
        let product_id = getProduct._id;

        //console.log(products_name,product_image,product_description)
        let product_data = {
          product_name: products_name,
          image_array: product_image,
          description: product_description,
          product_id: product_id,
        };
        console.log(product_data);
        setShow(false);
        setProduct((preValue) => {
          //  console.log(...preValue,product_data)
          return [...preValue, product_data];
        });
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data.message);
          alert(error.response.data.message);
          setShow(false);
        }
      }
    }
    addProduct();
  };
  return (
    <>
      <div className="container-scroller">
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                {/* model for product */}
                <div className="row">
                  <div className="col-12 mb-3 text-right">
                    <Button
                      onClick={() => {
                        ModalHandler(show);
                      }}
                    >
                      Add Product
                    </Button>
                    <Modal
                      animation={false}
                      show={show}
                      onHide={() => setShow(false)}
                    >
                      <Modal.Header>Add product</Modal.Header>
                      <Modal.Body>
                        <div className="modal-body bg-white pt-4">
                          <div className="row">
                            <div className="col-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="companyname">Add Product</label>

                                <Form>
                                  <Form.Group>
                                    <Form.Control
                                      type="text"
                                      placeholder="ProductName"
                                      onChange={(e) =>
                                        SetProductName(e.target.value)
                                      }
                                    />
                                  </Form.Group>

                                  <Form.Group>
                                    <Form.Control
                                      as="select"
                                      onChange={selectHandler}
                                    > <option>Choose Catogry</option>
                                      {category.map((element, index) => (
                                        <option
                                          style={{ color: "dark" }}
                                          key={index}
                                          value={element._id}
                                        >
                                          {element.catogry_name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Control
                                      type="text"
                                      placeholder="Description"
                                      onChange={(e) =>
                                        SetDescription(e.target.value)
                                      }
                                    />
                                  </Form.Group>

                                  <Form.Group>
                                    <Form.File
                                      className="position-relative"
                                      required
                                      name="file"
                                      onChange={formHandler}
                                      label="File"
                                    />
                                  </Form.Group>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => ModalHandler(show)}>
                          close button
                        </Button>
                        <Button onClick={() => handleSubmit()}>
                          Add Products
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>

                <div className="text-center">
                  {loading ? (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : null}
                </div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ProductName</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {product
                        ? product.map((elelment, index) => (
                            <tr key={index}>
                              <td>{elelment.product_name}</td>
                              <td>{elelment.description}</td>
                              <td>
                                <img
                                  src={
                                    elelment.image_array[0]
                                      ? url + elelment.image_array[0]
                                      : null
                                  }
                                  alt="image"
                                />
                              </td>
                              <td>
                                {" "}
                                <button
                                  onClick={() =>
                                    onDeleteHandler(elelment._id, index)
                                  }
                                  type="button"
                                  className="btn btn-inverse-danger btn-rounded btn-icon"
                                >
                                  <i className="mdi mdi-delete-forever"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminProduct;
