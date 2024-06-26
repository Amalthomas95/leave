
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addLeaveApplication } from '../Features/leave/leaveslice';

const validationSchema = Yup.object({
    leaveType: Yup.string().required('Leave type is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    reason: Yup.string().required('Reason is required'),
});

const LeaveApplicationForm: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values: { leaveType: string, startDate: string, endDate: string, reason: string }, { resetForm }: { resetForm: () => void }) => {
        const newLeaveApplication = {
            id: Date.now(), 
            name: 'User', 
            leaveType: values.leaveType,
            startDate: values.startDate,
            endDate: values.endDate,
            reason: values.reason,
            status: 'Pending'
        };
        dispatch(addLeaveApplication(newLeaveApplication));
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            resetForm();
        }, 3000); 
    };

    return (
        <Container>
            <h4 style={{ textAlign: 'center' }}>Leave Application</h4>
            <Formik
                initialValues={{ leaveType: '', startDate: '', endDate: '', reason: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <BootstrapForm.Group controlId="leaveType" className="mb-3">
                            <BootstrapForm.Label>Leave Type</BootstrapForm.Label>
                            <Field name="leaveType" as={BootstrapForm.Control} />
                            <ErrorMessage name="leaveType" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="startDate" className="mb-3">
                            <BootstrapForm.Label>Start Date</BootstrapForm.Label>
                            <Field name="startDate" type="date" as={BootstrapForm.Control} />
                            <ErrorMessage name="startDate" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="endDate" className="mb-3">
                            <BootstrapForm.Label>End Date</BootstrapForm.Label>
                            <Field name="endDate" type="date" as={BootstrapForm.Control} />
                            <ErrorMessage name="endDate" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="reason" className="mb-3">
                            <BootstrapForm.Label>Reason</BootstrapForm.Label>
                            <Field name="reason" as={BootstrapForm.Control} />
                            <ErrorMessage name="reason" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Apply
                        </Button>
                    </Form>
                )}
            </Formik>

            <Modal show={isSubmitted} onHide={() => setIsSubmitted(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your leave application has been submitted successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default LeaveApplicationForm;
