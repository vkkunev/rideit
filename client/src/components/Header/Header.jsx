import React from 'react'
import { Navbar } from 'react-bootstrap'
import NavigationBar from '../NavigationBar/NavigationBar';
import Navigator from '../Navigator/Navigator';
import { Reddit } from 'react-bootstrap-icons';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ selectCategory }) => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Rideit <Reddit size={18} /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Navigator selectCategory={selectCategory}/>
            <SearchBar />
            <NavigationBar/>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;