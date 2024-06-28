import { Container, Navbar, Button, ButtonGroup } from 'react-bootstrap';

interface TopBarProps {
    handleOpen: () => void,
    isAuthorized: boolean
}

export default function Topbar({ handleOpen, isAuthorized }: TopBarProps) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    {isAuthorized ?
                        <Button>My Marks</Button> :
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary">Register</Button>
                            <Button variant="primary" onClick={handleOpen}>Log In</Button>
                        </ButtonGroup>}
                </Container>
            </Navbar>
        </>
    );
}