import React from "react";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ListingCard from "../components/Listing/ListingCard";
import Listings from "../components/Listing/Listings";



configure({ adapter: new Adapter() });


describe('Listing Card component', function() {
    it('should render without throwing an error', function () {
        const wrapper = shallow(<ListingCard key="w" listing="s"/>);
        expect(wrapper.props().listing).to.equal('s');
        expect(wrapper.props().key).to.equal('w');

    })
});

describe('Listing component', function() {
    it('should render without throwing an error', function () {
        const wrapper = shallow(<Listings/>);
        expect(wrapper).toBe(true);
    })
});




