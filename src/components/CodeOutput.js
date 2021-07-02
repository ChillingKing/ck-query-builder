import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import '../styles/styles.css'

const CodeOutput = ({ query }) => {
    return(
        <React.Fragment>
            <Accordion defaultActiveKey='0' className='custom-accordion'>
                <Card className='custom-card'>
                    <Card.Header className='custom-card-header'>
                        <Accordion.Toggle as={Button} variant='link' eventKey='0' className='custom-accordion-toggle'>
                            JSON
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='0'>
                        <Card.Body className='custom-card-body'>
                            <pre>
                                {query}
                            </pre>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </React.Fragment>
    )
}


export default CodeOutput