import React, { Component } from 'react'
import CodeOutput from './CodeOutput'

import queryBuilder from 'jQuery-QueryBuilder'
import $ from 'jquery'

import { Navbar, Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const initialRules = {
    condition: 'AND',
    'rules': [
        {
            id: 'price',
            operator: 'less',
            value: 10.25
        },
        {
        condition: 'OR',
        rules: [
            {
                id: 'category',
                operator: 'equal',
                value: 2
            },
            {
                id: 'category',
                operator: 'equal',
                value: 1
            }
        ]
    }]
}

const queryBuilderInit = (entry, rule) => {
    const filters = [
        {
            id: 'name',
            label: 'Name',
            type: 'string'
        },
        {
            id: 'category',
            label: 'Category',
            type: 'integer',
            input: 'select',
            values: {
                1: 'Books',
                2: 'Movies',
                3: 'Music',
                4: 'Tools',
                5: 'Goodies',
                6: 'Clothes'
            },
            operators: [ 'equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null' ]
        },
        {
            id: 'in_stock',
            label: 'In stock',
            type: 'integer',
            input: 'radio',
            values: {
                1: 'Yes',
                2: 'No'
            },
            operators: [ 'equal' ]
        },
        {
            id: 'price',
            label: 'Price',
            type: 'double',
            validation: {
                min: 0,
                step: 0.01
            }
        },
        {
            id: 'id',
            label: 'Identifier',
            type: 'string',
            placeholder: '____-____-____',
            operators: [ 'equal', 'not_equal' ],
            validation: {
                format: /^.{4}-.{4}-.{4}$/
            } 
        }
    ]
    const rules = rule ? rule : initialRules
    $(entry).queryBuilder({ filters, rules })
}


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rules: {}
        }
    }

    componentDidMount() {
        const entry = this.refs.queryBuilder
        queryBuilderInit(entry)
    }

    componentWillUnmount() {
        $(this.refs.queryBuilder).queryBuilder('destroy')
    }

    shouldComponentUpdate() {
        return false
    }

    handleGetRules() {
        const rules = $(this.refs.queryBuilder).queryBuilder('getRules')
        this.setState({ rules: rules })
        this.forceUpdate()
    }

    handleSetRules() {
        const newRules = initialRules
        $(this.refs.queryBuilder).queryBuilder('setRules', newRules)
        this.setState({ rules: newRules })
    }

    handleResetRules() {
        $(this.refs.queryBuilder).queryBuilder('reset')
    }

    render() {
        return(
            <React.Fragment>
                <Navbar className='custom-navbar'>
                    <Container>
                        <Navbar.Brand className='custom-navbar-brand'>
                            QueryBuilder
                        </Navbar.Brand>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <Col md={8}>
                            <div id='query-builder' ref='queryBuilder'/>
                            <ButtonGroup>
                                <Button variant='warning' onClick={this.handleResetRules.bind(this)}>Reset</Button>
                                <Button variant='success' onClick={this.handleSetRules.bind(this)}>Set Rules</Button>
                                <Button onClick={this.handleGetRules.bind(this)}>Get Rules</Button>
                            </ButtonGroup>
                        </Col>
                        <Col md={4}>
                            <CodeOutput query={JSON.stringify(this.state.rules, undefined, 2)} />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default App