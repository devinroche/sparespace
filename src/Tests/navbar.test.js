import React from "react";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Navbar from "../components/Navbar/Navbar";
import {Logo} from "../components/Styles"



configure({ adapter: new Adapter() });


describe('Navbar component', function() {
    it('should render without throwing an error', function () {
        expect(shallow(<Navbar/>));
    });
    it('should render the logo without error', function () {
        expect(shallow(<Navbar/>).contains(<Logo className="navbar-brand" href="/home">sparespace</Logo>)).toBe(true);
    });
});

