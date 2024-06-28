import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface SignInModalProps {
    show: boolean,
    handleCloseSignIn: () => void
}

export default function StaticExample({ show, handleCloseSignIn }: SignInModalProps) {
    return (
        <>
            <Modal show={show} onHide={handleCloseSignIn}>
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
                    <Button variant="secondary" onClick={handleCloseSignIn}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseSignIn}>
                        Sign In
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}