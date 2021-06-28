import React, { useState } from 'react'
import { NavDropdown, Dropdown, Col } from 'react-bootstrap'
import { House, ArrowUpRightCircle, BarChartSteps } from 'react-bootstrap-icons'

const mapIcon = (iconName) => {
    if (iconName === 'house') return <House />;
    if (iconName === 'popular') return <ArrowUpRightCircle />;
    if (iconName === 'all') return <BarChartSteps />;
};

const SelectComunity = ({ communities, feeds, selectCategory, showFeed, selectCommunity }) => {

    const [title, setTitle] = useState(showFeed ? 'Home' : "Choose community");

    const handleOnSelect = (name) => {
        if (selectCategory) selectCategory(mapCategory(name));

        if (selectCommunity) selectCommunity(name);
        setTitle(name);
    }

    const mapCategory = (name) => {
        if (name === "Home") return { "category": "all" };
        if (name === "Popular") return { "category": "popular" }
        if (name === "All") return { "category": "all" }

        return { "community": name };
    }

    return (
        <NavDropdown as={Col} className="border" title={title} id="basic-nav-dropdown" onSelect={handleOnSelect}>
            <Dropdown.Header>MY COMMUNITIES</Dropdown.Header>
            <NavDropdown.Item href="/create-community"> +Create Comunity</NavDropdown.Item>
            {communities.map((community, idx) => (
                <NavDropdown.Item key={idx} href={community.url} onSelect={() => { handleOnSelect(community.name) }}>{community.name}</NavDropdown.Item>
            ))}

            {showFeed ? (<><Dropdown.Header>FEEDS</Dropdown.Header>
                {feeds.map((feed, idx) => {
                    const IconTag = mapIcon(feed.icon);
                    return (
                        <NavDropdown.Item key={idx} href={feed.url} onSelect={() => { handleOnSelect(feed.name) }}>{IconTag} {feed.name}</NavDropdown.Item>
                    );
                })} </>) : null}
        </NavDropdown>
    );
}

export default SelectComunity;