
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Profile from '../Components/Profile';
import LeaveApplicationForm from '../Components/LeaveApplicationForm';
import Header from '../Components/Header';

const EmployeeProfilePage: React.FC = () => {
    return (
        <div>
            <Header/>
        <Container className="mt-5">
            
            <Row>
                <Col md={6}>
                    <Profile />
                </Col>
                <Col md={6}>
                    <LeaveApplicationForm />
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default EmployeeProfilePage;
