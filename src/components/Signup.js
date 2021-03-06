import React,{useRef,useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContexts'
import { Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'
export default function Signup() {
  const nameRef = useRef()
  const ageRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordconfirmRef = useRef()
  const [error, setError] = useState('');
  const [loading,setLoading] = useState(false)
  const { signup} = useAuth()
  
  
  async function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value !== passwordconfirmRef.current.value)
      {
        return setError('passwords do not match')
      }
    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    }  

    catch{
      setError('failed to create an account')
    }

    setLoading(false)
  }
  return (
    <>
      <Container className = "d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
        <div className = "w-100" style={{maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                  <h2 className="text-center mb4">Sign Up</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit = {handleSubmit}>
                    <Form.Group id="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="name" ref={nameRef} placeholder="Enter name" required/>
                    </Form.Group>

                  

                    <Form.Group id="age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="age" ref={ageRef} placeholder="Enter age" required/>
                    
                    </Form.Group>

                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} placeholder="Enter email" required/>
                      <Form.Text className="text-muted">
                              We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required/>
                    </Form.Group>

                    <Form.Group id="password-confirm">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordconfirmRef} placeholder="Confirm password" required/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                  </Form>
                </Card.Body>
             </Card>
              <div className="w-100 text-center mt-2">
                Already Have an Account? <Link to="/login">Log In</Link>
              </div>
        </div>
   
      </Container>
        
    </>  
    
  )
}

