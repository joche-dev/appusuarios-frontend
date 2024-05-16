import { Container, Row, Col } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import CardUser from '../../components/CardUser/CardUser';
import NewUser from '../../components/NewUser/NewUser';
import { ToastContainer, toast } from 'react-toastify';
import './Dashboard.css';

export default function Dashboard() {
  const { users, getUsers, loading, error } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    toast.error(error, {
      position: 'bottom-right',
    });
  }

  return (
    <Container className="py-2 py-md-4">
      <h1 className="mb-5">Lista de Usuarios</h1>
      <NewUser />
      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {loading && <p>Cargando usuarios...</p>}
        {users?.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          users?.map((user, index) => (
            <Col key={index}>
              <CardUser user={user} />
            </Col>
          ))
        )}
      </Row>
      <ToastContainer />
    </Container>
  );
}
