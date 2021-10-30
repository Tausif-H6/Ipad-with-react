import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Singup = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "", name:"",cpassword:"" })
    let history = useHistory();

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {


        e.preventDefault();
       const {name,email,password}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
             
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,password })

        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //Save the auth-token and redirect
            localStorage.setItem('token',json.authtoken);
             history.push("/");
        }else{
            alert("Wrong credentials");
        }

    }



    return (
        <div>
        <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Enter your Name </label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange }  />
               
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={onChange }  />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"  onChange={onChange }   name="password"     />
            </div>
            <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confrim Password</label>
            <input type="password" className="form-control" id="cpassword"  onChange={onChange } minLength={5}  required name="cpassword"  />
        </div>

            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
        </div>
    )
}

export default Singup
