import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../assets/admin-speedy/assets/vendors/mdi/css/materialdesignicons.min.css";
import "../assets/admin-speedy/assets/vendors/css/vendor.bundle.base.css";
import "../assets/admin-speedy/assets/css/style.css";
import img1 from "../assets/admin-speedy/assets/images/logo.svg";
import img2 from "../assets/admin-speedy/assets/images/logo-mini.svg";
import profile from "../assets/admin-speedy/assets/images/faces/face1.jpg";
import profile2 from "../assets/admin-speedy/assets/images/faces/face1.jpg";
import circle1 from "../assets/admin-speedy/assets/images/dashboard/circle.svg";
import circle2 from "../assets/admin-speedy/assets/images/dashboard/circle.svg";
import { propTypes } from "react-bootstrap/esm/Image";
const Panel = (props) => {
  //console.log(props)
  const [vendor, setVendor] = useState(0);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function getVendorList() {
      try {
        const res = await axios.get(
          `https://fast-atoll-73668.herokuapp.com/listMerchant`
        );
        //  console.log(res.data)
        let total_vendor = res.data.total_vendor;
        //console.log(res.data.venders_is);
        setVendor(total_vendor);
        const vendor_list = res.data;

        setList(res.data.venders_is);
      } catch (e) {
        console.log(e);
        setVendor("failed fetching");
      }
    }
    getVendorList();
  }, []);

  const onDeleteHandler = (id, index) => {
    let ids = id;

    console.log(id, index);
    //alert("This is ID : " + id)
    fetch("https://fast-atoll-73668.herokuapp.com/deleteVendor", {
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
        let x = list.filter((item) => item._id !== id);
        setVendor(x.length);
        setList(x);
        //console.log(data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="container-scroller">
        {/* nav bar    */}
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="navbar-brand brand-logo" href="ind̥ex.html">
              <img src={img1} alt="logo" />
            </a>
            <a className="navbar-brand brand-logo-mini" href="index.html">
              <img src={img2} alt="logo" />
            </a>
          </div>

          <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-toggle="minimize"
            >
              <span className="mdi mdi-menu"></span>
            </button>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="profileDropdown"
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="nav-profile-img">
                    <img src={profile} alt="profile" />
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black">David Greymaax</p>
                  </div>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown"
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-cached mr-2 text-success"></i>{" "}
                    Activity Log{" "}
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-logout mr-2 text-primary"></i> Signout{" "}
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-menu"></span>
            </button>
          </div>
        </nav>

        <div className="container-fluid page-body-wrapper">
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item nav-profile">
                <a href="#" className="nav-link">
                  <div className="nav-profile-image">
                    <img src={profile2} alt="profile" />
                    <span className="login-status online"></span>
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">David Grey. H</span>
                    <span className="text-secondary text-small">
                      john@dummy.com
                    </span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="dashboard.html">
                  <span className="menu-title">Dashboard</span>
                  <i className="mdi mdi-home menu-icon"></i>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/product">
                  <span className="menu-title">Category</span>
                  <i className="mdi mdi-houzz-box menu-icon"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminProduct">
                  <span className="menu-title">Admin Product</span>
                  <i className="mdi mdi-checkbox-multiple-blank-outline menu-icon"></i>
                </Link>
              </li>
            </ul>
            <i id="bannerClose"></i>
          </nav>

          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-home"></i>
                  </span>{" "}
                  Dashboard{" "}
                </h3>
              </div>

              {/* main panel */}

              <div className="row">
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body">
                      <img
                        src={circle1}
                        className="card-img-absolute"
                        alt="circle-image"
                      />

                      <h4 className="font-weight-normal mb-3">
                        Total Vendors
                        <i className="mdi mdi-account-multiple mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">
                        {vendor ? (
                          vendor
                        ) : (
                          <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        )}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img
                        src={circle2}
                        className="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 className="font-weight-normal mb-3">
                        Total Companies{" "}
                        <i className="mdi mdi-houzz-box mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">45,6334</h2>
                      <h6 className="card-text">Decreased by 10%</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body">
                      <img
                        src={circle1}
                        className="card-img-absolute"
                        alt="circle-image"
                      />
                      <h4 className="font-weight-normal mb-3">
                        Total Properties{" "}
                        <i className="mdi mdi-diamond mdi-24px float-right"></i>
                      </h4>
                      <h2 className="mb-5">95,5741</h2>
                      <h6 className="card-text">Increased by 5%</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mx-auto grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Search Vendor </h4>
                      <div className="table-responsive">
                        {/* search box */}
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Emter the vendor Name"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Name. </th>
                              <th>Email </th>
                              <th>Phone </th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* serach using  filter function */}
                            {list
                              .filter((element) => {
                                if (search === "") return element;
                                else if (
                                  element.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                )
                                  return element;
                              })
                              .map((element, index) => (
                                <tr key={element._id}>
                                  <td>{element.name}</td>
                                  <td>{element.email}</td>
                                  <td>{element.phone}</td>
                                  {element.status ? (
                                    <td>
                                      <label className="badge badge-success">
                                        Active
                                      </label>
                                    </td>
                                  ) : (
                                    <td>
                                      <label className="badge badge-danger">
                                        Inactive
                                      </label>
                                    </td>
                                  )}
                                  <td className="">
                                    <Link to={`/edit_details/${element._id}`}>
                                      <button
                                        type="button"
                                        className="btn btn-inverse-primary btn-rounded btn-icon"
                                      >
                                        <i className="mdi mdi-pencil"></i>
                                      </button>
                                    </Link>
                                    {/* <Link to={`/delete/${element._id}`}> */}
                                    <button
                                      onClick={() =>
                                        onDeleteHandler(element._id, index)
                                      }
                                      type="button"
                                      className="btn btn-inverse-danger btn-rounded btn-icon"
                                    >
                                      <i className="mdi mdi-delete-forever"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Panel;
