import './form.css'
import { useRef } from "react"
export const Register = () => {
  let name = useRef();
  let email = useRef();
  let password = useRef();
  let handlesubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    }
    try {
      const response = await fetch(`https://kzcars-backend-data.onrender.com/register`, {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      console.log(response);
      let resdata = await response.json();
      console.log(resdata);
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div class="wrapper">
        <h1>Hello Again!</h1>
        <p>Welcome back you've <br /> been missed!</p>
        <form onSubmit={handlesubmit}>
          <input type="text" placeholder="Your Name" ref={name} required />
          <input type="email" placeholder="Email" ref={email} required />
          <input type="password" placeholder="Password" ref={password} required />
          <p class="recover">
            <a href="#">Recover Password</a>
          </p>
          <button type='submit'>Sign up</button>
          <closeform></closeform></form>
        <p class="or">
          ----- or continue with -----
        </p>
        <div class="not-member">
          Not a member? <a href="#">Register Now</a>
        </div>
      </div>
    </>
  )
}