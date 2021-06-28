import React, { useState, useEffect } from 'react'
import { Nav, Container, Form, Button } from 'react-bootstrap'
import { Clipboard } from 'react-bootstrap-icons'
import axios from 'axios'

import SelectComunity from '../SelectComunity/SelectComunity'

const CreatePost = () => {

    const [communities, setCommunities] = useState([]);

    const [values, setValues] = useState({
        title: '',
        body: '',
        author: '',
        community: '',
        category: 'all',
        status: '',
    })

    const fetchCommunities = async () => {
        const result = await axios.get(process.env.REACT_APP_SERVER_URL+ process.env.PORT + 'community');
        setCommunities(result.data);
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + 'createPost', values)
    }

    const handleOnChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSelectCommunity = (community) => {
        setValues({community})
    }

    return (
        <Container className="d-flex justify-content-center" fluid>
            <Form onSubmit={handleOnSubmit}>
            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link disabled><Clipboard /> Post</Nav.Link>
                </Nav.Item>
            </Nav>
            <SelectComunity
                communities={communities}
                showFeed={false}
                selectCommunity={handleSelectCommunity}
            />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={values.title} 
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="body"
                        value={values.body}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                Create Post
            </Button>
            </Form>
        </Container>

    );
}

export default CreatePost;