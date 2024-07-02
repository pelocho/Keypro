import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MarkerCard from '../MarkerCard/MarkerCard';

interface Marker {
    id: string;
    longitude: number;
    latitude: number
    name: string;
    description: string;
}
interface MyMarkersModalProps {
    show: boolean,
    myMarkers: Marker[],
    handleCloseMyMarkers: () => void
}

export default function MyMarkersPopup({ show, myMarkers, handleCloseMyMarkers }: MyMarkersModalProps) {
    return (
        <>
            <Modal show={show} onHide={handleCloseMyMarkers}>
                <Modal.Header closeButton>
                    <Modal.Title>My Markers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {myMarkers.map((marker) => (
                        <MarkerCard key={marker.id} name={marker.name} description={marker.description} longitude={marker.longitude} latitude={marker.latitude} id={marker.id}></MarkerCard>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMyMarkers}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}