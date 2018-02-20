import React from "react";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Login from "../components/Login";
import { Formik } from "formik"
import {FormInput} from "../components/Styles"



configure({ adapter: new Adapter() });


describe('Login component', function() {
    it('should render without throwing an error', function () {
        expect(shallow(<Login/>).exists(<Formik/>)).toBe(true);
    });
    it('renders a email input', () => {
        expect(shallow(<FormInput />).find('#email').length).toEqual(0);
    })
});


describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'gkunthara@zagmail.gonzaga.edu'}});
        expect(wrapper.state('email')).toEqual('gkunthara@zagmail.gonzaga.edu');
    })
});

describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'qwerty'}});
        expect(wrapper.state('password')).toEqual('qwerty');
    })
})
