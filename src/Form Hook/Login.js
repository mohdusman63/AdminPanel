import React, { useState } from "react"
const Login=()=>{
    const [value,setValue]=useState({
        firstname: " ",
        lastname: " ",
        email: " "


    });
    const handleInputChange = (event) => {
          const name = event.target.name;
          const value = event.target.value;
        setValue((preVal)=>{
           return{
               ...preVal,
               [name]:value
           }

        })

  };
      const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value);
  };

    return(
        <>
        <form onSubmit={handleSubmit} >


       firstname <input type="text"
        name="firstname"
         value={value.firstname}
        onChange={handleInputChange}



        /><br/>
        lastname <input type="text"
           name="lastname"
        onChange={handleInputChange}
        value={value.lastname}


        /><br/>
          email <input type="text"
           name="email"
        onChange={handleInputChange}
        value={value.email}


        />
        <br/>
        <button type="submit">Login</button>
</form>
        </>
    )
}
export default Login