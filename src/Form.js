import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { v4 as uuidv4 } from 'uuid';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import {useDispatch} from 'react-redux'
const Form = () => {
 const [name,setname]=useState('')
 const [address,setaddress]=useState('')
 const dispatch=useDispatch()
 
const storeUser=(e)=>{
    e.preventDefault()
    dispatch({type:'Add_User',payload:{id:uuidv4(),name,address}})
    setname('')
    setaddress('')
}
return (
       <>
               <div>
                 <form onSubmit={storeUser}>
                     <div className="form-group">
                          <input type="text" className="form-control" placeholder="name"
                          value={name}
                          onChange={(e)=>setname(e.target.value)} />
                     </div>
                     <div className="form-group">
                          <input type="text" className="form-control" placeholder="address"
                          value={address}
                          onChange={(e)=>setaddress(e.target.value)} />
                     </div>
                     <div className="form-group">
                          <button type="submit" className="btn btn-primary btn-lg"  >Add users</button>
                     </div>
                 </form>
             </div>
    </>
 )}
export default Form