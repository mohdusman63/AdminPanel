  alert('hii')
    fetch("fast-atoll-73668.herokuapp.com/adminLogin",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
       email,
      password,
    })
  })

  .then(res=>res.json()).then((data)=>{
  console.log(data)
     alert(data.message)
    if(data.statusCode===200){
      props.history.push('dashbord')
    }
})
  .catch(e=> console.log(e))



  //   const [list,setList]=useState([])
//    useEffect(()=>{
//    async function getVendorList(){
//      try{
//       const res=await axios.get(
//         `https://fast-atoll-73668.herokuapp.com/listMerchant`)
//        console.log(res.data.venders_is)
//        setList(res.data.venders_is)
// //
//        }
//  catch(e){
//     console.log(e)
// //     // setVendor('failed fetching')

//  }}
//  getVendorList()

//   } ,[])