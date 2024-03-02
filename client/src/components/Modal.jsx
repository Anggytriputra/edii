import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalBoot from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Modal({
  show,
  setShow,
  child,
  handleSubmit,
  headerText,
  buttonText,
}) {
  //   const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <ModalBoot
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <ModalBoot.Header closeButton>
          <ModalBoot.Title>{headerText}</ModalBoot.Title>
        </ModalBoot.Header>
        <ModalBoot.Body>
          <Form onSubmit={handleSubmit}>
            {child}
            <ModalBoot.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {buttonText}
              </Button>
            </ModalBoot.Footer>
          </Form>
        </ModalBoot.Body>
      </ModalBoot>
    </>
  );
}
