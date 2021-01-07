import React from 'react';
import {  BrowserRouter,Switch, Route } from 'react-router-dom';
import Signup from './adminComponent/Signup'
import Login from './adminComponent/Login'
import Home from './adminComponent/Home'
import Panel from './adminComponent/Panel'
import EditDetails from './adminComponent/EditDetails'
import Delete from './adminComponent/Delete'
import Product from './adminComponent/Product'
import AdminProduct from './adminComponent/AdminProduct'




function App() {

    return (
    <>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Signup} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/home' component={Home} />
                  <Route exact path='/panel' component={Panel} />
                   <Route exact path='/edit_details/:id' component={EditDetails} />
                  <Route exact path='/delete/:id' component={Delete} />
                      <Route exact path='/product' component={Product} />
                       <Route exact path='/adminProduct' component={AdminProduct} />

            </Switch>
       </BrowserRouter>
    </>




    );
}

export default App;