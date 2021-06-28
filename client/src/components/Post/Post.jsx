import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap'
import { ArrowDown, ArrowUp } from 'react-bootstrap-icons'
import axios from 'axios';

import { AuthContext } from '../../auth/auth';
import Comments from '../Comments/Comments';

const Post = ({ postData }) => {
    const userId = useContext(AuthContext).user;
    
    const [_votes, setVotes] = useState(0)

    const [voteSubmitted, setVoteSubmitted] = useState(false);

    const { _id, title, body, author, votes, voters, comments } = postData;

    const changeVote = (id, isUpvote) => {
        axios.post(process.env.REACT_APP_SERVER_URL + 'vote', { id, isUpvote, userId }).then(response => {
            const votes = response.data.votes;
            setVotes(votes);
            setVoteSubmitted(true);
        })
    }

    useEffect(() => {
        setVotes();
    }, []);
    
    const disableVote = voters.forEach(voteId => {
        return !voteSubmitted && voteSubmitted && voteId === userId;
    })

    return (
        <Card className='p-4 m-3' style={{ width: '40rem' }}>
            <Row>
                <Col md={1}>
                    <Row>
                        <Button size="sm" variant="dark" disabled={disableVote}><ArrowUp size={18} onClick={() => changeVote(_id, true)} /></Button>
                    </Row>
                    <Row><span className="ml-3">{_votes ? _votes : votes}</span></Row>
                    <Row>
                       { _votes < 1 ? null : (<Button variant="dark" size="sm" disabled={disableVote} ><ArrowDown size={18} onClick={() => { changeVote(_id, false) }} /></Button>) } 
                    </Row>
                </Col>
                <Col md={11}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                        <Card.Text>
                            {body}
                        </Card.Text>
                       <Comments comments={comments} postId={_id} />
                    </Card.Body>
                </Col>
            </Row>
        </Card >
    );
}

export default Post;