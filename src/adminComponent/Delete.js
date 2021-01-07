import React ,{useState,useEffect} from 'react';

import {useParams  } from 'react-router-dom';
import axios from 'axios';
const Delete=(props)=>{
    //console.log(props.match.params)
    const [ids,setIds]=useState(' ')
    let id=props.match.params
    console.log(id)
    setIds(id)
     useEffect(()=>{
       fetch("https://fast-atoll-73668.herokuapp.com/deleteVendor",{
       method:"post",
       headers:{
      "Content-Type":"application/json"
       },
       body:JSON.stringify({
         ids

    })

  })
  .then(res=>res.json()).then((data)=>{
      console.log('hii')

  }).catch(e=>console.log(e))


     },[ids])





}
export default Delete
