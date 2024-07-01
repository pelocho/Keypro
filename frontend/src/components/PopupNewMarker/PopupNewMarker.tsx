import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api';

interface PopupProps {
    show: boolean;
    coordinates: number[]
    onClose: () => void;
}

export default function PopupNewMarker({ show, coordinates, onClose }: PopupProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const longitude = coordinates[0]
    const latitude = coordinates[1]

    async function handleSubmit(e : React.SyntheticEvent) {
        e.preventDefault();
        api.post("/api/markers/", {name, description, longitude, latitude}).then((res) => {
            if (res.status === 201) window.location.reload();
            else alert("Something went wrong")
        }).catch((err) => alert(err));
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new marker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="inputName">Marker name</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label htmlFor="inputDescription">Marker description</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputDescription"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}