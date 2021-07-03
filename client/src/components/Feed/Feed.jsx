import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../Post/Post'
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Feed = ({category}) => {

    const [data, setData] = useState({ data: [] });
    const [isLoading, setLoading] = useState(true);



    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('/posts', category);
            let posts = result.data;
            if (Object.values(category)[0] ==='popular') {
                posts = posts.sort( (a, b) => {return b.votes - a.votes});
            } 
    
            setData(posts);
            setLoading(false);
        };

        fetchData();
    }, [category]);

    return (
        <Container fluid>
            <Row>
                <Col></Col>
                <Col>{isLoading ? (<Spinner animation="border" />) : (
                    data.map((post, idx) => {
                        return (
                            <Post key={idx} postData={post} />
                        )
                    })
                )}
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default withRouter(Feed);