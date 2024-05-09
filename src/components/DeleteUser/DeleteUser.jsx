import { Modal, Button } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteUser({ id }) {
  const { getUsers, deleteUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDeleteUser = async () => {
    const data = await deleteUser(id);
    if (data.ok) {
      await getUsers();
      toast.success(data.message, {
        position: 'bottom-right',
      });
    } else {
      toast.error(data.message, {
        position: 'bottom-right',
      });
    }
    handleClose();
  };

  return (
    <>
      <Button variant="danger ms-2" size="sm" onClick={handleShow}>
        Eliminar
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
          <Modal.Title>Desea eliminar el Usuario ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button variant="secondary px-3 me-2" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger px-4" onClick={confirmDeleteUser}>
            Si
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
