import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client';
import Web3 from 'web3';

const socket = openSocket('http://localhost:3001');

class Pay extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            canPay: true
        }

        if (typeof this.web3 != 'undefined') {
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(this.web3.currentProvider)
        } else {
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        }
    }

    render() {
        var balanceWei = this.web3.eth.getBalance(account).toNumber();
        var balance = this.web3.fromWei(balanceWei, 'ether');
        console.log(balance)
        const messageStyle = {
            fontFamily: "Rubik",
            color: "#FFF",
            fontWeight: "400",
            width: 250,
            height: 50,
            fontSize: 20,
            background: "rgb(31, 142, 237)",
            border: "none"
        };

        return (
            <div>
                <button className="btn btn-success" style={messageStyle} disabled={!this.state.canPay} onClick={() => {
                    this.web3.eth.sendTransaction({
                        from: this.web3.eth.coinbase,
                        to: '0xE767aEB31dAAF66366999F72FB5De2CEEA76c277',
                        value: this.web3.toWei(1, 'ether')
                    })
                }}>Pay With Request!</button>

            </div>

        );
    }
}

export default Pay;