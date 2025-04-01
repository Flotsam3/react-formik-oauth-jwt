import React, {useState} from 'react';
import FormCard from '../components/FormCard';
import { useFormik } from 'formik';
import { useAuth } from "../components/AuthProvider";
import { Navigate } from 'react-router-dom';

export default function Login() {
    const { user, setUser } = useAuth();
    const [register, setRegister] = useState(true);
    const {handleChange, values, handleBlur} = useFormik({
        initialValues: {
          name: "", 
          email: "",
          password: ""
        }
    });
    
    if (user) {
      return <Navigate to="/members" />;
    }  
    
    function handleGoogleAuth(){
      window.open("http://localhost:3000/auth/google", "_self");
    }

    function handleGithubAuth(){
      window.open("http://localhost:3000/auth/github", "_self");
    }

    async function handleLocalAuth(){
      try {
        if (!register) {
          const response = await fetch("http://localhost:3000/users/sign-up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          });

          if (response.ok){
            const user = await response.json();
            console.log("registered user", user);
            setRegister(true);
          }

        } else {
          const response = await fetch("http://localhost:3000/users/sign-in", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
          });

          if (response.ok){
            const data = await response.json();
            console.log("Logged in user", data);
            setUser(data.user);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
   <>
    <h1>Welcome {user ? user.displayName : null}</h1>
      <div style={{display: "flex", justifyContent: "center"}}>
          <form >
              <FormCard values={values} handleChange={handleChange} handleBlur={handleBlur} handleGoogleAuth={handleGoogleAuth} handleGithubAuth={handleGithubAuth} register={register} setRegister={setRegister} handleLocalAuth={handleLocalAuth}/>
          </form>
      </div>
   </>
  )
}
