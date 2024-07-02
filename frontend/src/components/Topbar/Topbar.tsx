import { Container, Navbar, Button, ButtonGroup } from 'react-bootstrap';

interface TopBarProps {
    handleOpenSignIn: () => void,
    handleOpenRegister: () => void,
    handleLogOut: () => void,
    handleOpenMyMarkers: () => void,
    isAuthorized: boolean
}

export default function Topbar({ handleOpenSignIn, handleOpenRegister, handleLogOut, handleOpenMyMarkers, isAuthorized }: TopBarProps) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Keypro</Navbar.Brand>
                    {isAuthorized ?
                        <ButtonGroup aria-label="session-control-buttons">
                            <Button variant="primary" onClick={handleOpenMyMarkers}>My Markers</Button>
                            <Button variant="secondary" onClick={handleLogOut}>Log Out</Button>
                        </ButtonGroup> :
                        <ButtonGroup aria-label="session-control">
                            <Button variant="primary" onClick={handleOpenSignIn}>Log In</Button>
                            <Button variant="secondary" onClick={handleOpenRegister}>Register</Button>
                        </ButtonGroup>}
                </Container>
            </Navbar>
        </>
    );
}