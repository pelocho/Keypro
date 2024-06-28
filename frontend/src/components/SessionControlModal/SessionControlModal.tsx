import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

interface SessionControlModalProps {
    show: boolean,
    route: string,
    handleCloseSignIn: () => void
}

export default function SessionControlModal({ show, route, handleCloseSignIn }: SessionControlModalProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const name = route === '/api/user/register/' ? 'Register' : 'Login'

    async function handleSubmit(e : React.SyntheticEvent) {
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if(name === 'Login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                window.location.reload();
            } else {
                alert('User create successfully!')
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleCloseSignIn}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSignIn}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleSubmit}>
                        {name}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}