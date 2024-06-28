import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface SignInModalProps {
    show: boolean,
    handleCloseRegister: () => void
}

export default function StaticExample({ show, handleCloseRegister }: SignInModalProps) {
    return (
        <>
            <Modal show={show} onHide={handleCloseRegister}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseRegister}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseRegister}>
                        Register
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}