import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useContext, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import chileanLocations from '../../data/chilean-locations.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewUser() {
  const regions = chileanLocations.regiones;
  const { addUser, getUsers } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('');
  const [communes, setCommunes] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState('');
  const form = useRef();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePatten = /^(?:2|9)[0-9]{8}$/;

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
    setNewUser({});
    setSelectedRegion('');
    setSelectedCommune('');
    form.current.reset();
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
    const data = await addUser(newUser);

    if (data.ok) {
      await getUsers();
      toast.success(data.message, {
        position: 'bottom-right',
      });
      form.current.reset();
      setNewUser({});
      handleClose();
    } else {
      toast.error(data.message, {
        position: 'bottom-right',
      });
    }
  }

  return (
    <>
      <Button variant="success mb-3" onClick={handleShow}>
        Agregar Usuario
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
          <Modal.Title>Usuario Nuevo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} action="submit" onSubmit={(e) => submitHandler(e)}>
            <Form.Floating className="mb-3">
              <Form.Control
                id="name"
                type="text"
                placeholder="Nombre del Usuario"
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
                  <option value="">Region</option>
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
                  <option value="">Comuna</option>
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
