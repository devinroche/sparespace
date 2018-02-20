import React from "react";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Home from "../components/Home";
import {Header} from "../components/Styles";



configure({ adapter: new Adapter() });


describe('Home component', function() {
    it('should render without throwing an error', function () {
        expect(shallow(<Home/>).contains(<Header>More Affordable Storage</Header>)).toBe(true);
    });
});

