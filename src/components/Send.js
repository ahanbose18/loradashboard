import React from 'react'
import { Container, Row, Col, Card,Button, Navbar} from 'react-bootstrap';
import { Textarea } from "@chakra-ui/react"
import 'bootstrap/dist/css/bootstrap.min.css';
const ENDPOINT = "wss://ap3.loriot.io/app?token=vgECIwAAAA1hcDMubG9yaW90LmlvW_AMkXn6-AGhUYZ00z0--w==";


export default function Send(props) {

  let [value, setValue] = React.useState("")
  const websocket = new WebSocket(ENDPOINT); 
   websocket.onopen = (event)=>{
     console.log("Connected");
   }


   let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  console.log(value);
   function handleClick(){
    
    console.log('hello');
   
    let j = {
      "cmd": "tx",
      "EUI": "00288836BF3F1721",
      "port": 1,
      "confirmed": false,
      "data": "01",
      "appid": "BE01021A"
      }
    console.log(JSON.stringify(j));
    websocket.send(JSON.stringify(j));
    websocket.onmessage = (event) =>{
     console.log(event.data);
    }
  }

  return (
    <div>
      <>
      
      <Textarea  value={value}
        onChange={handleInputChange} placeholder="Here is a sample placeholder" />

      <Button variant="outline-success" onClick={handleClick}>Send Downlink</Button>{' '}
      </>
    </div>
  )
}
