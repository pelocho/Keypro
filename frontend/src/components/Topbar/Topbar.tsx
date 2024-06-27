import { Container, Navbar, Button } from 'react-bootstrap';

interface TopBarProps {
    handleOpen: () => void,
} 

export default function Topbar({handleOpen}: TopBarProps) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Button onClick={handleOpen}>Log In</Button>
                </Container>
            </Navbar>
        </>
    );
}