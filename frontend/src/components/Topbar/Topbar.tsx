import { Container, Navbar, Button } from 'react-bootstrap';

export default function Topbar() {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Button>Log In</Button>
        </Container>
      </Navbar>
        </>
    );
}