import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  let navigate = useNavigate()
    const [credentials , setcredentials]=useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const  response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation
        })
        });

        const json = await response.json();
        console.log(json);

     if(json.success){
      localStorage.setItem('token', json.authToken)
      navigate("/login")
      
     }
     else {
      alert("Enter valid Credentials")
     }

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    
  return (

<div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80")', backgroundSize: 'cover',height: '98vh',objectFit: "fill" }}>
<div className='container'>
<form  onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}  />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}  />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
             <input type="text" className='form-control' name='geolocation' value={credentials.location} onChange={onChange} />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
</div>
</div>
    
  )
}

export default Signup