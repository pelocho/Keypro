import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface SignInModalProps {
    show: boolean,
    handleClose: () => void
}

export default function StaticExample({ show, handleClose }: SignInModalProps) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUsername"
                    />
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Sign In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}