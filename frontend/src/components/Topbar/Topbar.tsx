import { Container, Navbar, Button, ButtonGroup } from 'react-bootstrap';

interface TopBarProps {
    handleOpenSignIn: () => void,
    handleOpenRegister: () => void,
    isAuthorized: boolean
}

export default function Topbar({ handleOpenSignIn, handleOpenRegister, isAuthorized }: TopBarProps) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Keypro</Navbar.Brand>
                    {isAuthorized ?
                        <Button>My Marks</Button> :
                        <ButtonGroup aria-label="session-control">
                            <Button variant="secondary" onClick={handleOpenRegister}>Register</Button>
                            <Button variant="primary" onClick={handleOpenSignIn}>Log In</Button>
                        </ButtonGroup>}
                </Container>
            </Navbar>
        </>
    );
}