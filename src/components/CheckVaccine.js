  import React, {useRef,useState} from 'react'
  import axios from 'axios'
  import  {Container, Grid, GridItem,Box,Flex,Spacer,Center,Square,Text,Button ,ButtonGroup} from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Form,
  Formik,
  Field
} from "@chakra-ui/react"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import "../css/Background.css"
  export default function CheckVaccine() {
    const pinRef = useRef()
    const dateRef = useRef()
    const [pin,SetPin] = useState()
    const [date,SetDate] = useState()
    const [center,setCenter] = useState([])
    const [name, setName] = useState([])
  
    function handleSubmit(e)
     {
        e.preventDefault()
        console.log("Button Pressed!!!")
      ///  console.log(pinRef);
        console.log(pin);
        console.log(date);
        var d = date;
        var year = d.slice(0,4);
        var month = d.slice(5,7);
        var day = d.slice(8,11);
        d = `${day}-${month}-${year}`
        console.log(d)
       
        axios({
          method: 'get',
          url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${d}`
        })
          .then(function (response) {
            
            console.log(response.data);
            let sessions = response.data.sessions;
            console.log(sessions)
            setCenter(sessions)
            
          });
     }


     const renderTable = () => {
      return center.map(data => {
        return (
          <tr>
          <td key="name">{data.name}</td>
          <td key="address">{data.address}</td>
          <td key="state">{data.state_name}</td> 
          <td key="fee_type">{data.fee_type}</td>
          <td key = "fee">{data.fee}</td> 
          <td key="available_capacity">{data.available_capacity}</td>
          <td key="available_capacity_dose_1">{data.available_capacity_dose1}</td>
          <td key="available_capacity_dose_2">{data.available_capacity_dose2}</td>
          <td key="vaccine">{data.vaccine}</td>
          <td key="min_age_limit">{data.min_age_limit}</td> 
        </tr>
        )
      })
    }

    

    return (
      <>
            <Container maxW="xl" centerContent>


            <Container className="head" maxW="xl" centerContent>
                  <Box padding="4" bg="orange.100" maxW="3xl">
                    <h2>Check Vaccine Availability</h2>
                  </Box>
            </Container>



                <Box bg="#161D6F" p={4} color="#C7FFD8">
                <Flex m={4} p={4} justifyContent="center">
    <form onSubmit={handleSubmit}>
                                    <FormControl id="pincode" value={pin} onChange={({target})=> SetPin(target.value)} isRequired>
                                        <FormLabel>Pin</FormLabel>
                                        <Input type="text" />
                                        <FormHelperText>Please Enter Valid Pin</FormHelperText>
                                      </FormControl>

                                      <FormControl id="date" value={date} onChange={({target})=> SetDate(target.value)} isRequired>
                                        <FormLabel>Date</FormLabel>
                                        <Input type="date" />
                                        <FormHelperText>Please Enter Valid Date</FormHelperText>
                                      </FormControl>

                                      <Button colorScheme="#21E6C1" variant="outline" m={2} type = "submit">
                                                      Check
                                      </Button>

                                    </form>

       
    </Flex>
                </Box>
   


    <Table variant="striped" colorScheme="teal">
                          <TableCaption>Availability</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Center</Th>
                              <Th>Address</Th>
                              <Th>State</Th>
                              <Th>Fee Type</Th>
                              <Th>Fee</Th>
                              <Th>Available Capacity</Th>
                              <Th>Available Capacity Dose 1</Th>
                              <Th>Available Capacity Dose 2</Th>
                              <Th>Vaccine</Th>
                              <Th>Minimum Age Limit</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                          {renderTable()}
                          </Tbody>
                         
                  </Table>
                                 

            </Container>

                  

      </>
    )
  }
  