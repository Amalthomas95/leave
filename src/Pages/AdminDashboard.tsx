
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import { Table, Button } from 'react-bootstrap';
import { approveLeave, rejectLeave } from '../Features/leave/leaveslice';
import Header from '../Components/Header';

const AdminDashboard: React.FC = () => {
    const leaveApplications = useSelector((state: RootState) => state.leave.leaveApplications);
    const dispatch = useDispatch();

    const handleApproveLeave = (id: number) => {
        dispatch(approveLeave(id));
    };

    const handleRejectLeave = (id: number) => {
        dispatch(rejectLeave(id));
    };

    return (
        <div>
            <Header/>
        <div style={{ padding: '20px', margin: '15px auto', maxWidth: '800px' }}>
            <h3 style={{ textAlign: 'center' }}>Employee Leave Details</h3>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveApplications.map(application => (
                        <tr key={application.id}>
                            <td>{application.name}</td>
                            <td>{application.leaveType}</td>
                            <td>{application.startDate}</td>
                            <td>{application.endDate}</td>
                            <td>{application.status}</td>
                            <td>
                                {application.status === 'Pending' && (
                                    <>
                                        <Button variant="success" onClick={() => handleApproveLeave(application.id)}>Approve</Button>{' '}
                                        <Button variant="danger" onClick={() => handleRejectLeave(application.id)}>Reject</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </div>
    );
};

export default AdminDashboard;
