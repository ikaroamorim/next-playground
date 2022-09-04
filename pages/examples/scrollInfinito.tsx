import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

export default function ScrollInfinito() {

   const [pokemons, setPokemons] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [isLoaded, setIsLoaded] =useState(false);
   const itemLimit = 20

   React.useEffect(() => {
      const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';
      const urlConfigured = `${ENDPOINT}?offset=${itemLimit*(currentPage-1)}&limit=${itemLimit}",`;
      fetch(urlConfigured)
         .then(response => response.json())
         .then(newPokemons => setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons.results]))
         .then( setIsLoaded(true))
   }, [currentPage]);

   React.useEffect(() => {
      const intersectionObserver = new IntersectionObserver(entries => {
         if ( isLoaded && entries.some((entry) => entry.isIntersecting)) {
            console.log("Watching!!")
            setCurrentPage((currentPageInsideState) => currentPageInsideState + 1)
         }
      });

      intersectionObserver.observe(document.querySelector('#sentinel'))

      return () => intersectionObserver.disconnect();
   }, [])

   return (
      <>
         <h1>
            Scroll Infinito!!
         </h1>

         <Container>
            <Row> {currentPage} </Row>
            <Row>
               {
                  pokemons.map(item => {

                     const pokeId = parseInt(item.url.split('/pokemon/')[1].replace( '\/', ''))
                     return (
                        <Card style={{ width: '18rem' }} key={pokeId}>
                           <Card.Img variant="top" src="https://picsum.photos/286/180"/>
                           <Card.Body>
                              <Card.Title>{item.name}</Card.Title>
                              <Card.Text>
                                 { pokeId }
                              </Card.Text>
                              <Button variant="primary" href={item.url}>Go somewhere</Button>
                           </Card.Body>
                        </Card>
                     )
                  })
               }
            </Row>
            <Row>
               <Col>
                  <Spinner animation="border" role="status" id="sentinel">
                     <span className="visually-hidden">Loading...</span>
                  </Spinner>
               </Col>
            </Row>
         </Container>
      </>
   )
}