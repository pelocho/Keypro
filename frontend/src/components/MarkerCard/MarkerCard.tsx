import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import api from '../../api';
import { useEffect, useState } from 'react';

interface MarkerCardProps {
    name: string,
    description: string,
    longitude: number,
    latitude: number,
    id: string,
}

export default function MarkerCard({ name, description, longitude, latitude, id }: MarkerCardProps) {
    const [nameMarker, setNameMarker] = useState('')
    const [descriptionMarker, setDescriptionMarker] = useState('')
    const [longitudeMarker, setLongitudeMarker] = useState('')
    const [latitudeMarker, setLatitudeMarker] = useState('')

    useEffect(() => {
        setNameMarker(name);
        setDescriptionMarker(description);
        setLongitudeMarker(String(longitude));
        setLatitudeMarker(String(latitude));
    }, []);

    async function handleDelete(e: React.SyntheticEvent) {
        e.preventDefault();
        api.delete(`/api/markers/delete/${id}/`).then((res) => {
            if (res.status === 204) window.location.reload();
            else alert("Something went wrong")
        }).catch((err) => alert(err));
    }

    async function handleEdit(e: React.SyntheticEvent) {
        e.preventDefault();
        api.put(`/api/markers/edit/${id}/`, { name: nameMarker, description: descriptionMarker, longitude: longitudeMarker, latitude: latitudeMarker }).then((res) => {
            if (res.status === 200) window.location.reload();
            else alert("Something went wrong")
        }).catch((err) => alert(err));
    }

    return (
        <Card style={{ marginBottom: '10px' }}>
            <Card.Body>
                <Form.Label htmlFor="inputName">Name</Form.Label>
                <Form.Control
                    type="text"
                    id="inputName"
                    value={nameMarker}
                    onChange={(e) => setNameMarker(e.target.value)}
                />
                <Form.Label htmlFor="inputDescription">Description</Form.Label>
                <Form.Control
                    type="text"
                    id="inputDescription"
                    value={descriptionMarker}
                    onChange={(e) => setDescriptionMarker(e.target.value)}
                />
                <Form.Label htmlFor="inputLogitude">Logitude</Form.Label>
                <Form.Control
                    type="text"
                    id="inputLogitude"
                    value={longitudeMarker}
                    onChange={(e) => setLongitudeMarker(e.target.value)}
                />
                <Form.Label htmlFor="inputLatitude">Latitude</Form.Label>
                <Form.Control
                    type="text"
                    id="inputLatitude"
                    value={latitudeMarker}
                    onChange={(e) => setLatitudeMarker(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <Button variant="primary" style={{ marginRight: '5px' }} onClick={handleEdit}>Edit</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card.Body>
        </Card>
    );
}