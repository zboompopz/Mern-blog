import React, { Component } from 'react';
import axios from 'axios';
import { Table, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: 0,
            name: '',
            price: '',
            stock: '',
            description: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/product')
            .then((res) => {
                this.setState({
                    products: res.data,
                    id: 0,
                    name: '',
                    price: '',
                    stock: '',
                    description: ''
                })
                console.log(res.data);
            })
    }

    namechange = event => {
        this.setState({
            name: event.target.value
        })
    }

    pricechange = event => {
        this.setState({
            price: event.target.value
        })
    }

    stockchange = event => {
        this.setState({
            stock: event.target.value
        })
    }

    descriptionchange = event => {
        this.setState({
            description: event.target.value
        })
    }

    submit(event, id) {
        event.preventDefault()
        if (id === 0) {
            axios.post(`http://localhost:8000/api/product/`, { name: this.state.name, price: this.state.price, stock: this.state.stock, description: this.state.description })
                .then(() => {
                    this.componentDidMount();
                })

        } else {
            axios.put(`http://localhost:8000/api/product/${id}`, { name: this.state.name, price: this.state.price, stock: this.state.stock, description: this.state.description })
                .then(() => {
                    this.componentDidMount();
                })
        }
    }

    delete(id) {
        axios.delete(`http://localhost:8000/api/product/${id}`)
            .then(() => {
                this.componentDidMount();
            })
    }

    
    edit(id) {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                //console.log(res.data)
                this.setState({
                    id: res.data._id,
                    name: res.data.name,
                    price: res.data.price,
                    stock: res.data.stock,
                    description: res.data.description,
                })
            })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Description</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(p =>
                                        <tr key={p._id}>
                                            <td> {p.name} </td>
                                            <td> {p.price} </td>
                                            <td> {p.stock} </td>
                                            <td> {p.description} </td>
                                            <td>
                                            <Button color="info" onClick={(e) => this.edit(p._id)}>Edit</Button>{' '}
                                                <Button color="danger" onClick={(e) => this.delete(p._id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Form onSubmit={(e) => this.submit(e, this.state.id)}>
                            <FormGroup row>
                                <Label md={2}>ชื่อสินค้า</Label>
                                <Col md={10}>
                                    <Input type="text" onChange={(e) => this.namechange(e)} value={this.state.name} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label md={2}>ราคา</Label>
                                <Col md={10}>
                                    <Input type="text" onChange={(e) => this.pricechange(e)} value={this.state.price} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label md={2}>จำนวน</Label>
                                <Col md={10}>
                                    <Input type="text" onChange={(e) => this.stockchange(e)} value={this.state.stock} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label md={2}>รายละเอียด</Label>
                                <Col md={10}>
                                    <Input type="textarea" row={5} onChange={(e) => this.descriptionchange(e)} value={this.state.description} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button color="success">บันทึกข้อมูล</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
