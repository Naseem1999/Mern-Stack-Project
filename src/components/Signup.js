import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
const Signup = (props) => {
  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""});
 let navigate=useNavigate()
    const handlesubmit= async (e)=>{

        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            
            headers: {
              "Content-Type": "application/json",
           
            },
            
            body: JSON.stringify({name,email,password}), 
          });

          const json=await response.json();
          console.log(json);

          if(json.success){
            //redirect
          localStorage.setItem('token',json.authtoken)
         navigate('/',{replace:true})
         props.showAlert("Account created successfully","success")
          }else{
            props.showAlert("Invalid credentials","danger")
          }

    }
    const onchange= (e) =>{
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='container mt-3'>
      <h2>Create an Account to Use Inotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp"   onChange={onchange} name="name"/>

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" onChange={onchange}  name="email"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} required minLength={5}  />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
