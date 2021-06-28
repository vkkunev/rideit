import React, { useState, createRef } from 'react'
import { Accordion, InputGroup, FormControl, Card, Button, Form, FormLabel} from 'react-bootstrap'
import { CursorFill } from 'react-bootstrap-icons'
import axios from 'axios'

const Comments = ({ comments, postId }) => {

    const textInput = createRef();

    const [internalComments, setComments] = useState(comments)
    const [commentValue, setValue] = useState('');

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleOnSubmitComment = (e) => {
        e.preventDefault();
        
        const comment = {
            text: textInput.current.value,
            by: 'author'
        }

        axios.post(process.env.REACT_APP_SERVER_URL + 'editPost', { id: postId, text: comment.text, by: comment.by }).then(response => { 
            if (response.status === 200) {
                const comments = response.data.comments;
                setComments(comments)
                setValue('');
            }
            
        })
    }

    return (
        <Accordion defaultActiveKey="1">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Comments ({internalComments.length})
                                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {internalComments.map((comment, idx) => (
                            <Card key={idx}>
                                <Card.Body> <FormLabel>{comment.text}</FormLabel></Card.Body>
                            </Card>
                        ))}

                        <Form onSubmit={handleOnSubmitComment}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    id="commentInput"
                                    name="comment"
                                    placeholder="Comment"
                                    aria-label="Comment"
                                    aria-describedby="basic-addon2"
                                    ref={textInput}
                                    value={commentValue}
                                    onChange={handleOnChange}
                                />
                                <Button type="submit" variant="dark" id="button-addon2">
                                    <CursorFill />
                                </Button>
                            </InputGroup>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default Comments;