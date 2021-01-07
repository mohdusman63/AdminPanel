import React ,{useState,useEffect} from 'react';

import {useParams  } from 'react-router-dom';
import axios from 'axios';
const EditDetails=(props)=>{
    //console.log(props.match.params)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [status,setStatus]=useState(0)
       const [phone,setPhone]=useState(0)
    const [ids,setId]=useState('')


    let id=props.match.params.id
   // console.log(typeof(id))



  useEffect(()=>{

    fetch("https://fast-atoll-73668.herokuapp.com/getVendor",{
      method:"post",
     headers:{
      "Content-Type":"application/json"
       },
    body:JSON.stringify({
      id
    })

  })
  .then(res=>res.json()).then((data)=>{

     //  console.log(data.statusCode)
       let code=data.statusCode
       if(code==200){
      //   console.log(data.details)
          setName(data.details.name)
          setEmail(data.details.email)
          let status=data.details.status
         // console.log(status)
          setStatus(status)
          setPhone(data.details.phone)
          setId(id)

       }

  }).catch(e=>console.log(e))
  },[id] )


  const EditData=(id)=>{
      console.log(id)
    fetch("https://fast-atoll-73668.herokuapp.com/editVendor",{
      method:"post",
     headers:{
      "Content-Type":"application/json"
       },
    body:JSON.stringify({
        id,
        name,
       email,
       phone,
       status
    })

  })
  .then(res=>res.json()).then(data=>{
      console.log(data)
      if(data.statusCode==200)
      props.history.goBack('panel')
  }).catch(e=>console.log(e))



     }
return(
        <>
 <h1 className="text-center">Admin Edit Page </h1>
         <div className="col-md-6 mx-auto mt-5 ">
          <div className="signup-form">


              <div className="form-group">
              <input type="text" className="form-control" name="username" placeholder="username" required="required"
              value={name?name:''}
              onChange={(e)=>setName(e.target.value)}


              />
         </div>
         <div className="form-group">
                <input type="email" className="form-control" name="email" placeholder="email" required="required"
                 value={email?email:''}
                onChange={(e)=>setEmail(e.target.value)}
                />

         </div>
          <div className="form-group">
                <input type="number" className="form-control" name="phone" placeholder="phone" required="required"
                 value={phone?phone:0}
                onChange={(e)=>setPhone(e.target.value)}
                />

         </div>

      <div className="form-group">
                <input type="number" className="form-control" name="status" placeholder="status" required="required"
                 value={status?status:0}
                onChange={(e)=>{
                  if(e.target.value>1 ||e.target.value<0 )
                  return false
                  setStatus(e.target.value)}}
                />
                </div>
         <div className="form-group text-center">
            <button onClick={()=>EditData(ids)}
            type="submit" className="btn btn-primary btn-lg btn-block "
            >
                Submit</button>
            </div>


         </div>
         </div>

        </>
    )


}
export default EditDetails
