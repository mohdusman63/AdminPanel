import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "../assets/admin-speedy/assets/vendors/mdi/css/materialdesignicons.min.css";
import "../assets/admin-speedy/assets/vendors/css/vendor.bundle.base.css";
import "../assets/admin-speedy/assets/css/style.css";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const Product = () => {
  const [show, setShow] = useState(false);
  const [catogry_name, setCatogry] = useState();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    async function getcatogryList() {
      try {
        const res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/fetchCatogry`
        );
        //console.log(res.data.statusCode)
        if (res.data.statusCode) {
          // console.log(res.data.message)
          setList(res.data.message);
          setLoading("");
        }
      } catch (e) {
        setLoading("failed fetching");
        console.log(e);
      }
    }
    getcatogryList();
  }, []);
  const ModalHandler = (a) => {
    //console.log(a)
    if (a === false) setShow(true);
    else setShow(false);
  };
  const AddCatogry = () => {
    setShow(false);
    // alert(catogry_name)
    fetch("https://fast-atoll-73668.herokuapp.com/addCatogry", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catogry_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("===========>");
        // console.log(data.message)
        if (data.statusCode === 200) {
          console.log("===========>");
          let id = data.catogry_id;
          let name = data.catogry_name;
          let v = {
            _id: id,
            catogry_name: name,
          };
          setList((preValue) => {
            //        console.log('<===========>')
            //  console.log(...preValue,v)
            //   console.log('<===========>')
            return [...preValue, v];
          });
          //console.log(list)
        } else {
          alert(data.message);
          return false;
        }
      })
      .catch((e) => console.log(e));
  };
  const DeleteHandler = (id, index) => {
    console.log(id, index);
    let x = list.filter((item) => item._id !== id);
    setList(x);
  };
  const onHide = () => {
    setShow(false);
  };
  return (
    <>
      <div className="container-scroller">
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-3 text-right">
                    <Button onClick={() => ModalHandler(show)}>
                      Add Catogry
                    </Button>
                    <Modal
                      animation={false}
                      show={show}
                      onHide={() => setShow(false)}
                    >
                      <Modal.Header>Add Catogry</Modal.Header>
                      <Modal.Body>
                        <div className="modal-body bg-white pt-4">
                          <div className="row">
                            <div className="col-12 col-md-12">
                              <div className="form-group">
                                <label htmlFor="companyname">
                                  Catogry Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setCatogry(e.target.value)}
                                  id="companyname"
                                  placeholder="Catogry Name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={() => ModalHandler(show)}>
                          close button
                        </Button>
                        <Button onClick={() => AddCatogry()}>
                          Add catogry
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
                {/* category table  */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Serial Number </th>
                        <th>Catogery Name </th>
                        <th className="text-center">Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list
                        ? list.map((element, index) => (
                            <tr key={element._id}>
                              <td>{index + 1}</td>
                              <td>{element.catogry_name}</td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-inverse-primary btn-rounded btn-icon"
                                >
                                  <i className="mdi mdi-pencil"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    DeleteHandler(element._id, index)
                                  }
                                  className="btn btn-inverse-danger btn-rounded btn-icon"
                                >
                                  <i className="mdi mdi-delete-forever"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        : null}
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
export default Product;
