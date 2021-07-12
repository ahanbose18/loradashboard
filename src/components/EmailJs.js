import React from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios';
import { Button, ButtonGroup, Container } from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Form
} from "@chakra-ui/react"

import{ init } from 'emailjs-com';
init("user_NPzPjqdlUGQ08LRo1C0J1");
export default function EmailJs(props) {

  function sendEmail(e) {
    e.preventDefault();
    
      var data = {
        service_id: 'service_yg2v9fe',
        template_id: 'template_4596327',
        user_id: 'user_NPzPjqdlUGQ08LRo1C0J1',
        template_params: {
            'name': props.email,
            'temperature': props.temperature,
            'pressure': props.pressure,
            'humidity': props.humidity

        }
    };
    axios.post('https://api.emailjs.com/api/v1.0/email/send',data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
     
   
        <>
          <Container>
                        <Button  onClick={sendEmail} colorScheme="teal" size="lg" m={10} >Generate Report</Button>
 
          </Container>
                
            
          
        </>
  
  )
}
