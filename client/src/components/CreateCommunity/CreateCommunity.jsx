import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const CreateCommunity = () => {

    const [values, setValues] = useState({ name: '', description: '' })

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name] : e.target.value})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + 'community', values)
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="#/"
                    name="name"
                    onChange={handleOnChange}
                    value={values.name}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description </Form.Label>
                <Form.Control 
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={handleOnChange}
                    value={values.description}
                 />
            </Form.Group>
            <Button variant="dark" type="submit">
                Create Community
            </Button>
        </Form>
    )

}

export default CreateCommunity;