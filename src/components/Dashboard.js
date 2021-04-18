import React from 'react'
import { useState, useEffect } from "react";
import { isDOMComponentElement } from 'react-dom/cjs/react-dom-test-utils.production.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from "socket.io-client";
import '../css/Dashboard.css'
import {  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, ResponsiveContainer} from 'recharts';
  import { Container, Row, Col, Card,Button, Navbar} from 'react-bootstrap';
const ENDPOINT = "wss://ap3.loriot.io/app?token=vgECGgAAAA1hcDMubG9yaW90Lmlv46UyC6qBoREnXdo2VSD7TA==";
export default function Dashboard() {
  
  var rssi_value,snr_value;
  const [snr, setSnr] = useState([]);
  const [rssi, setRssi] = useState([])
  useEffect(() => {

   var websocket = new WebSocket(ENDPOINT);
   websocket.onopen = (event)=>{
     console.log("Connected");
   }
   websocket.onmessage = (event)=>{
    console.log(event.data);
    //var myjson = JSON.stringify(event.data);
    var d = new Date()
    var json = JSON.parse(event.data);
    var data = json.gws;
    if(data)
     {
       console.log(data[0].rssi);
       var rssi_value = data[0].rssi;
       var snr_value = data[0].snr;
       setRssi(currentData => [...currentData,{ 
        name: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getUTCMilliseconds(),
        value: rssi_value}])

        setSnr(currentData => [...currentData,{ 
          name: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getUTCMilliseconds(),
          value: snr_value}])
     }

    
   }

   
   console.log(rssi);
   


  }, []);

  return (
    <>

      <Navbar bg="dark" variant="dark" className = "nav" >
          <Navbar.Brand href="#home">
            Lora Dashboard
          </Navbar.Brand>
      </Navbar>
  
    
     

<Container  className = "container" >
  <Row className = "row">
    <Col xl = "6" sm = "12" className = "col"> 
    <Card border="primary" style={{ width: '500px' }} className = "card">
        <Card.Body>
          <Card.Title>RSSI</Card.Title>
                  <LineChart width={450} height={300} data={rssi}>
                            <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#ff005c"
                                activeDot={{ r: 8 }}
                              />
                  </LineChart>
        </Card.Body>
  </Card>
</Col>
    <Col xl = "6" sm= "12" className = "col"> 
     <Card border="success" style={{ width: '500px' }}>
        <Card.Body>
          <Card.Title>SNR</Card.Title>
            <LineChart width={450} height={300} data={snr}>
              <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#29bb89"
                  activeDot={{ r: 8 }}
                />
          </LineChart>
        </Card.Body>
  </Card>
</Col>
  </Row>
</Container>
  
    </>
  )
}
