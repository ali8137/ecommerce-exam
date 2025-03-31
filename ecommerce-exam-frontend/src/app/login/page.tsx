import Authentication from '@/components/authentication/Authentication'
import React from 'react'

// interface loginProps {
//   name: string
//   age: number
// }

// interface loginProps {}

// const login = ({ name, age }: loginProps) => {
const Login = (/*props: loginProps*/) => {
  return (
    <>
      {/* <div>
        <h1>Welcome, {name}!</h1>
        <p>Age: {age}</p>
      </div> */}
      <div><Authentication isLoginComponent={true} /></div>
    </>
  )
}

export default Login
