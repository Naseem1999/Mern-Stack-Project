import React ,{useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Login = (props) => {
 const [credentials,setcredentials]=useState({email:"",password:""});
 let navigate=useNavigate()
    const handlesubmit= async (e)=>{

        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            
            headers: {
              "Content-Type": "application/json",
           
            },
            
            body: JSON.stringify({email:credentials.email,password:credentials.password}), 
          });

          const json=await response.json();
          console.log(json);

          if(json.success){
            //redirect
          localStorage.setItem('token',json.authtoken)
          props.showAlert("Logged in successfully","success")
          navigate('/',{replace:true})

        }else{
            props.showAlert("Invalid credentials","danger")
          }

    }
    const onChange= (e) =>{
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='mt-3 container'>
    <form onSubmit={handlesubmit}  >
      <h2>Login to continue to Inotebook</h2>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={credentials.password}  onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
