import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from 'axios'

import { AuthContext } from '../../auth/auth'

const LoginForm = () => {
    const context = useContext(AuthContext);
    const history = useHistory();
    
    const [values, setVaules] = useState({
        username: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/login', values).then((res)=> {
            const { status, data } = res;
            if (status && status === 200) {
                context.login(data);
                history.push("/");
            }
        })
    }
    
    const handleOnChange = (e) => {
        setVaules({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control
                 name="username"
                 type="username"
                 placeholder="Enter username"
                 value={values.username}
                 onChange={handleOnChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control
                 name="password"
                 type="password"
                 placeholder="Password"
                 value={values.password}
                 onChange={handleOnChange} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="dark" type="submit">
                Submit
            </Button>
        </Form>
    )
};

export default LoginForm;