import React from 'react'
import { useHistory } from 'react-router-dom'
import {Container, Grid, GridItem,Box,Flex,Spacer,Center,Square,Text,Button ,ButtonGroup} from "@chakra-ui/react"
import Query from './CheckVaccine'
import '../css/HomePage.css'
import Typed from 'react-typed';
import vaccine from '../images/vaccinesvg.svg'
export default function HomePage() {
  const { push } = useHistory()

  return (
    <>
        
          <svg className="topsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#071E3D" fill-opacity="1" d="M0,0L48,16C96,32,192,64,288,112C384,160,480,224,576,213.3C672,203,768,117,864,69.3C960,21,1056,11,1152,48C1248,85,1344,171,1392,213.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>

          <Container className="header headcontainer" maxW="container.xl">
                  <div className="text">
                  
                    <h2>Vaccine Cold Storage Monitoring System</h2>
                        <div className="subtext">
                        <Typed 
                          strings={['A LORAWAN NETWORK SOLUTIONS','Stay Home','Stay Safe']}
                          typeSpeed={40}
                          backSpeed={50}
                          loop
                      />
                      <br/>
                        </div>
                      
                         
                  </div>

                 

            <Container m ={5} >

                  <Button colorScheme="pink" size="lg" m={5} onClick={() => push('/signup')}>
                    Sign Up
                  </Button>
                  <Button colorScheme="teal" size="lg" m={5} onClick={() => push('/login')}>
                    Login
                  </Button>
             </Container>
                 

             <img className="logo" src={vaccine}></img> 
          </Container>

         
           

          <div className="vaccinecheck">
                
              
                 <Query/>
                
          </div>

        

    </>
    
  )
}
