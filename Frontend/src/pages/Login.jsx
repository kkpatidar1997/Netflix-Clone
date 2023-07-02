import {useState, React} from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();

  const [formValues, setFormValues] = useState(
    {
      email: "",
      password: ""
    })

    const handleLogIn = async () => {
      try {
        const { email, password} = formValues;
        console.log(email)
        await signInWithEmailAndPassword(firebaseAuth, email, password)
      } catch (error) {
        setErrors("Incorrect Email and Password")
        console.log(error)
        
      }
    } 
    onAuthStateChanged(firebaseAuth,(currentUser) => {
      if(currentUser) navigate("/");
    })
  return (
    <Container>
      <BackgroundImage/>
      <div className='content'>
        <Header/>
        <div className='form-container flex column a-center j-center'>
          <div className='form flex column a-center j-center'> 
            <div className='title'>
              <h3>Login</h3>
            </div>
              <div className='container flex column'>
              <input type='email' placeholder='Email Address' name='email' required 
                value={formValues.email} 
                onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
              />
    
              <input type='password' placeholder='Password' name='password' required 
                value={formValues.password} 
                onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
              />
              <button onClick={handleLogIn}>Login</button>
              {errors && <p className="color">{errors}.</p>}
              </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login

const Container = styled.div`
position: relative;
.content{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 85vh;
  .form-container{
    gap: 2rem;
    height: 85vh;
    .form {
      padding: 2rem;
        background-color: rgba(0, 0, 0, 0.2); /* Updated background color */
        width: 25vw;
        gap: 2rem;
        color: white;
        border-radius: 0.5rem; /* Added border-radius */
        .title{
          font-size: 25px;
        }
      .container {
        gap: 2rem;
        input{
          padding: 0.5rem 1rem;
          width: 15rem;

        }
        button {
          padding: 10px;
          width: 5rem;
          margin-left: 80px;
          background-color: #F5F3F4;
          border: none;
          cursor: pointer;
          color: red;
          border-radius: 0.2rem;
          font-weight: bolder;
          font-size: 15px;
        }
        .color{
          color: white;
        }
      }

    }
  }
}
`;