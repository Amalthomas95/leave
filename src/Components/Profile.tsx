import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const mockEmployeeData = {
    name: 'User',
    position: 'Software Engineer',
    department: 'Engineering',
};

const Profile: React.FC = () => {
    return (
        <Container className="mt-5">
            <Row className="mb-4 justify-content-md-center">
                <Col md={6}>
                    <Card className="p-3" style={{ borderRadius: '8px',width:'350px' }}>
                        <Card.Body>
                            <Card.Title>Employee Profile</Card.Title> <br />
                            <Card.Text><strong>Name:</strong> {mockEmployeeData.name}</Card.Text>
                            <Card.Text><strong>Position:</strong> {mockEmployeeData.position}</Card.Text>
                            <Card.Text><strong>Department:</strong> {mockEmployeeData.department}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
