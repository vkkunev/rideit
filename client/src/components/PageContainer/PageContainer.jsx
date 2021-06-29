import React from 'react'
import { Container } from 'react-bootstrap'

const PageContainer = ({content}) => (
     <Container className="d-flex justify-content-center p-5" fluid>
         {content}
     </Container>
);

export default PageContainer;