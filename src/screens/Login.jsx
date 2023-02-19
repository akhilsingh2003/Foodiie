import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials , setcredentials]=useState({email:"",password:"",})
  let navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response =await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              email:credentials.email,
              password:credentials.password,
      })
      });

      const json = await response.json();
      console.log(json);

   if(!json.success){
      alert("Enter valid Credentials")
   }
   if(json.success){
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",json.authToken);
    console.log(localStorage.getItem("authToken"))
    navigate("/");

   }

  }
  const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (

  <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80")', backgroundSize: 'cover',height: '98vh',objectFit: "fill" }}>

<div className='container'>
<form className='w-50 m-auto border bg-secondary border-success rounded' onSubmit={handleSubmit}>

            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}  />
            </div>
            
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger"> New user</Link>
            <Link to="/" className="m-3 mx-1 btn btn-primary">Home</Link>

          </form>
</div>
</div>
    
  )
}

export default Login