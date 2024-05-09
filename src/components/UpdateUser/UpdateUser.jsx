import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
import chileanLocations from '../../data/chilean-locations.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateUser({ user }) {
  const regions = chileanLocations.regiones;
  const { updateUser, getUsers, users } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(user);
  const [selectedRegion, setSelectedRegion] = useState(user.region);
  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState(user.commune);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePatten = /^(?:2|9)[0-9]{8}$/;
  const form = useRef();

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setSelectedRegion(selectedRegion);
    setNewUser({ ...newUser, [e.target.id]: e.target.value });

    const selectedRegionData = regions.find(
      (region) => region.name === selectedRegion
    );
    if (selectedRegionData) {
      setCommunes(selectedRegionData.comunas);
    } else {
      setCommunes([]);
    }
    setSelectedCommune('');
  };

  const handleCommuneChange = (e) => {
    setSelectedCommune(e.target.value);
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  function inputHandler(e) {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  async function submitHandler(e) {
    e.preventDefault();

    if (
      !newUser?.name ||
      !newUser?.email ||
      !newUser?.phone ||
      !newUser?.region ||
      !newUser?.commune
    ) {
      toast.error('Faltan campos obligatorios por llenar!', {
        position: 'bottom-right',
      });
      return;
    } else if (!emailPattern.test(newUser.email)) {
      toast.error('Escribe una dirección de correo electrónico válida!', {
        position: 'bottom-right',
      });
      return;
    } else if (!phonePatten.test(newUser.phone)) {
      toast.error('Escribe un telefono valido. Ej: 912345678!', {
        position: 'bottom-right',
      });
      return;
    }
    const data = await updateUser(newUser);

    if (data.ok) {
      await getUsers();
      form.current.reset();
      toast.success(data.message, {
        position: 'bottom-right',
      });
      handleClose();
    } else {
      toast.error(data.message, {
        position: 'bottom-right',
      });
    }
  }

  useEffect(() => {
    setNewUser(user);
    setSelectedRegion(user.region);
    setSelectedCommune(user.commune);
    const selectedRegionData = regions.find(
      (region) => region.name === selectedRegion
    );
    setCommunes(selectedRegionData.comunas);
  }, [users]);

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleShow}>
        Actualizar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="name"
                type="text"
                placeholder="Nombre del Usuario"
                value={newUser.name}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="name">
                <i className="bi bi-person"></i> Nombre Apellido
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="email"
                id="email"
                placeholder="example@example.com"
                value={newUser.email}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope"></i> Email
              </label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="phone"
                placeholder="Teléfono del Usuario"
                value={newUser.phone}
                onChange={(e) => inputHandler(e)}
              />
              <label htmlFor="phone">
                <i className="bi bi-telephone"></i> Teléfono (912345678)
              </label>
            </Form.Floating>
            <div className="d-flex gap-2">
              <Form.Floating className="w-50 mb-3">
                <Form.Select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => {
                    handleRegionChange(e);
                  }}
                >
                  {regions.map((region, index) => (
                    <option key={index} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </Form.Select>
                <label htmlFor="region">
                  <i className="bi bi-geo-alt"></i> Selecciona
                </label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-3">
                <Form.Select
                  id="commune"
                  value={selectedCommune}
                  onChange={(e) => {
                    handleCommuneChange(e);
                  }}
                  disabled={!selectedRegion}
                >
                  {communes.map((commune) => (
                    <option key={commune} value={commune}>
                      {commune}
                    </option>
                  ))}
                </Form.Select>
                <label htmlFor="commune">
                  <i className="bi bi-geo-alt"></i> Selecciona
                </label>
              </Form.Floating>
            </div>
            <div className="text-end">
              <Button variant="secondary me-2 mb-3" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success mb-3" type="submit">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
