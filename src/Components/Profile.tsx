import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { Container, Table } from 'react-bootstrap';

const Profile: React.FC = () => {
    const leaveApplications = useSelector((state: RootState) => state.leave.leaveApplications);

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'text-success';
            case 'rejected':
                return 'text-danger';
            case 'pending':
            default:
                return 'text-primary';
        }
    };

    return (
        <Container className="mt-4">
            <h4 style={{textAlign:'center'}} className="mb-4">Employee Leave Applications</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                <tbody>
                    {leaveApplications.map(application => (
                        <tr key={application.id}>
                            <td>{application.name}</td>
                            <td className={getStatusColor(application.status)}>{application.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Profile;
