import React from 'react'
import { useState, useEffect, useRef} from "react";
import { Link, useHistory } from "react-router-dom"
import { isDOMComponentElement } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {Alert,Figure} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContexts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Send from "./Send"
import io from "socket.io-client";
import '../css/Dashboard.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import {database} from "../firebase"
import {  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, ResponsiveContainer} from 'recharts';
  import { Container, Row, Col, Card,Button, Navbar} from 'react-bootstrap';
  import { Center, Square, Circle } from "@chakra-ui/react"
  import EmailJs from './EmailJs';
import { encodeRelativeHumidity } from 'cayenne-lpp/src/encoder';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  const { decoder } = require('cayenne-lpp');
  const ENDPOINT = "wss://ap3.loriot.io/app?token=vgECIwAAAA1hcDMubG9yaW90LmlvW_AMkXn6-AGhUYZ00z0--w==";
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWhhbmJvc2UiLCJhIjoiY2tvdTJ3ajVlMDJ3MDJ3cGZ2ZjM3cWJ1ZSJ9.Twutfpj-tVMbE9cC2jSwug';

  
export default function Dashboard() {
 
  var rssi_value,snr_value;
  const [snr, setSnr] = useState([]);
  const { currentUser, logout } = useAuth()
  const [rssi, setRssi] = useState([]);
  const [F,setF] = useState(0);
  const [SpreadFactor,setSpreadFactor] = useState(0);
  const [temperature,Settemperature] = useState(0);
  const [pressure,SetPressure] = useState(0);
  const [humidity,Sethumidity] = useState(0);
  const [analoginp,Setanaloginp] = useState(0);
  const [digitalinp, Setdigitalinp] = useState(0);
  const [digitaloutp, Setdigitaloutp] = useState(0);
  const [longitude, Setlongitude] = useState(-70.9);
  const [latitude, Setlatitude] = useState(42.35);
  const [response,Setresponse] = useState(0)
  const [vaccineStatus, setvaccineStatus] = useState(0);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const [error, setError] = useState("");
  const history = useHistory()


        async function handleLogout() {
          setError("")

          try {
            await logout()
            history.push("/")
          } catch {
            setError("Failed to log out")
          }
        }
  
  useEffect(() => {

  const websocket = new WebSocket(ENDPOINT);
   
   websocket.onopen = (event)=>{
     console.log("Connected");
   }

   
   websocket.onmessage = (event)=>{
    console.log(event.data);
    //var myjson = JSON.stringify(event.data);
    var d = new Date()
    var json = JSON.parse(event.data);
    var sf_value = json.freq;
    let sf = json.dr;
    setSpreadFactor(sf);
    setF(sf_value)
    console.log(sf_value);
    var data = json.gws;
    var cayenne_lpp = json.data;
    console.log(cayenne_lpp);
    if(data)
     {
       console.log(data[0].rssi);
       var rssi_value = data[0].rssi;
       var snr_value = data[0].snr;
       let lat = data[0].lat;
       let long = data[0].lon;
       Setlatitude(lat);
       Setlongitude(long);
       console.log(lat);
       console.log(long);
      
       setRssi(currentData => [...currentData,{ 
        name: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getUTCMilliseconds(),
        value: rssi_value}])

        setSnr(currentData => [...currentData,{ 
          name: d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getUTCMilliseconds(),
          value: snr_value}])
      
     }


              
             

     const exampleTemperatureAccelerometer = function exampleTemperatureAccelerometer() {

        try{
          const buffer = Buffer.from(cayenne_lpp, 'hex');
          const json = JSON.stringify(decoder.decode(buffer));
          console.log(`Device with temperature and acceleration sensors: ${json}}`);
          let lpp_data = JSON.parse(json);
          let baro_pressure = lpp_data[0].barometric_pressure_0;
          let temp = lpp_data[1].temperature_1;
          let rel_humidity = lpp_data[2].relative_humidity_2;
          let analog_input = lpp_data[3].analog_input_3;
          let digital_input = lpp_data[4].digital_input_4;
          let digital_output = lpp_data[5].digital_output_5;
          Settemperature(temp);
          SetPressure(baro_pressure);
          Sethumidity(rel_humidity);
          Setanaloginp(analog_input);
          Setdigitalinp(digital_input);
          Setdigitaloutp(digital_output);
          console.log(baro_pressure);
          if (analog_input >= 10)
          {
            setvaccineStatus(1);
          }
          else{
            setvaccineStatus(0);
          }

        }

        catch(err){
          console.log(err)
        }
       
      
      
  //     
    };
    exampleTemperatureAccelerometer();
   
  
    }


  
  
  
 
   
  //  console.log(rssi);
   
   



  }, []);

  
  
     

  return (
    <>

      <Navbar bg="" variant="dark" className = "nav" >
            
            
                <Navbar.Brand href="#home">Lora Dashboard</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                      <Navbar.Text>
                        Signed in as: {currentUser.email}
                      </Navbar.Text>
                </Navbar.Collapse>

               
                  <Button variant="link" onClick={handleLogout}>
                    Log Out
                  </Button>
      </Navbar>


  <div className="sfbw">
     <Alert variant="success" >
          <Alert.Heading>Frequency {F} Hz </Alert.Heading>
      </Alert>

      <Alert variant="primary" >
      <Alert.Heading>Lorawan Monitoring and Visualisation Dashboard</Alert.Heading>
      </Alert>

      <Alert variant="danger">
          <Alert.Heading> SF & BW {SpreadFactor} </Alert.Heading>
      </Alert>
  </div>    
     
  
    
      <Center  h="100px" color="#1D2D50">
         <h1 class="sub-header">Network Parameters</h1>
         
     </Center>
     
 
     

<Container  className = "container networkparams" >
  <Row className = "row">
    <Col xl = "6" sm = "12" className = "col"> 
    <Card border="primary" style={{ width: '500px' }} className = "card">
       
        <Card.Body>
          <Card.Title className="card-title">RSSI</Card.Title>
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
          <Card.Title classname="card-title snr-title">SNR</Card.Title>
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



<Center  h="100px" color="#1D2D50">
         <h1 class="sub-header">Sensor Readings</h1>
 </Center>

<div className="container">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Relative Humdity</Card.Title>
          <CircularProgressbar value={humidity} text={`${humidity}%`}  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: '#DA0037',
    textColor: '#DA0037',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })} />; 
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Barometric Pressure</Card.Title>
          <CircularProgressbar value={pressure} text={`${pressure}`}  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: '#C7FFD8',
    textColor: '#C7FFD8',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })}/>; 
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Temperature 🌡️</Card.Title>
          <CircularProgressbar   value={temperature} text={`${temperature} C`}    styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
  

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',

    // Text size
    textSize: '16px',

    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: '#FFF3AF',
    textColor: '#FFF3AF',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  })} />; 
        </Card.Body>
      </Card>
</div>


      
<div className="container">

      <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title>Force Resistive Sensor Reading</Card.Title>
             <h3>{analoginp}</h3>
        </Card.Body>
              <p>Vaccine Vial Status - {vaccineStatus}</p>

              
      </Card>

    
</div>

      <div className="container">

            <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Latitude:- {latitude}</Card.Title>
                      <Card.Title>Longitude:- {longitude}</Card.Title>
                    </Card.Body>
            </Card>
          
      </div>


      <Container>
      <EmailJs email={currentUser.email} temperature={temperature} pressure={pressure} humidity={humidity} ></EmailJs>
      </Container>




    <Container>
          <Send/>    
    </Container>
      
      <div id="map"></div>
  
     
    </>
  )
}
