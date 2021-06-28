import React from 'react'
import { Form, FormControl, Button, Nav} from 'react-bootstrap'

const SearchBar = () => (
    <Nav className="d-flex mr-auto justify-content-center">
    <Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-dark">Search</Button>
</Form>
</Nav>
)

export default SearchBar;