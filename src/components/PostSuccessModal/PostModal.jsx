import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SuccessIcon from '../../assets/landing_page/Balloon.svg';
import Pending from '../../assets/category/job_submit.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostSuccessModal = ({ submit, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="modal-icon" style={{ marginLeft: '24%' }}>
              {/* Replace with your icon or image */}
              {submit === 'product' ? (
                <img
                  src={SuccessIcon}
                  alt="Icon"
                  className="img-fluid rounded-circle"
                  style={{ width: 200, height: 150 }}
                />
              ) : (
                <img
                  src={Pending}
                  alt="Icon"
                  className="img-fluid rounded-circle"
                  style={{ width: 200, height: 150 }}
                />
              )}
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur. Id libero commodo nam amet
              vestibulum ut consectetur.
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostSuccessModal;
