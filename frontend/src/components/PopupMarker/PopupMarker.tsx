import { Modal, Button } from 'react-bootstrap';

interface PopupProps {
  show: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export default function PopupMarker({ show, title, content, onClose }: PopupProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body dangerouslySetInnerHTML={{ __html: content }} />
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
