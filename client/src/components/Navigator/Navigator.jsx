import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'

import SelectComunity from '../SelectComunity/SelectComunity';

import axios from 'axios'



const feeds = [
    {
        name: "Home",
        url: "",
        icon: "house",
    },
    {
        name: "Popular",
        url: "",
        icon: "popular",
    },
    {
        name: "All",
        url: "",
        icon: "all",
    }
]

const Navigator = ({ selectCategory }) => {

    const [communities, setCommunities] = useState([]);

    const fetchCommunities = async () => {
        const result = await axios.get(process.env.REACT_APP_SERVER_URL + 'community');
        setCommunities(result.data);
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    return (
        <Nav className="d-flex mr-auto justify-content-start">
            <SelectComunity communities={communities} feeds={feeds} selectCategory={selectCategory} showFeed={true} />
        </Nav>

    )
};

export default Navigator;