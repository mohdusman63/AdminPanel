import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as ReactBootstrap from 'react-bootstrap';




const Signup = (props) => {

// console.log(" ==== props ==== ", props)
const [name,setname]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
// const [loading,setLoading]=useState(true)

// const history = useHistory()

const PostData=()=>{


  // props.history.push('login')
  fetch("https://fast-atoll-73668.herokuapp.com/adminSignup",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
       name,
      email,
      password,
    })

  })
  .then(res=>res.json()).then((data)=>{


    console.log(data)
 alert(data.message)
    if(data.statusCode===200){
      // history.push('/login')
      props.history.push('login')
    }
})
  .catch(e=> console.log(e))
}

return (
       <>

      <div className="col-md-6 mx-auto mt-3">
          <div className="signup-form">
              <h2 className="text-center">Admin Sign Up</h2>

              <div className="form-group">
              <input type="text" className="form-control" name="username" placeholder="Username" required="required"
              onChange={(e)=>setname(e.target.value)}


              />
         </div>
         <div className="form-group">
            	<input type="email" className="form-control" name="email" placeholder="Email Address" required="required"
                onChange={(e)=>setEmail(e.target.value)}/>
         </div>
         <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" required="required"
              onChange={(e)=>setPassword(e.target.value)}/>
         </div>


       <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg" onClick={()=>PostData()}>Sign Up</button></div>
       </div>

<div className="text-center"><Link to={`/login`}> Already have an account? Login here</Link></div>
</div>
        </>
    )

}
export default Signup