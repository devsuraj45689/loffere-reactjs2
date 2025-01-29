import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import '../../assets/css/otp-modal.css';
import { IoIosClose } from 'react-icons/io';
import 'bootstrap/dist/css/bootstrap.min.css';

function OTPModal({
  title,
  description,
  isOpen,
  onClose,
  onSubmitOtp,
  email,
  toggleModal,
  resendBtn,
  otpSendFunction,
  submitButtonText,
  closeButton,
}) {
  const [otp, setOtp] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true); // Controls the resend button state
  const [timer, setTimer] = useState(30); // Countdown timer

  const handleChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleVerify = () => {
    console.log('call');

    if (otp.length === 6) {
      onSubmitOtp(otp); // Pass the OTP to the parent component
      setOtp('');
      onClose(); // Close the modal after submitting OTP
    } else {
      alert('Please enter a 6-digit OTP');
    }
  };

  // Start the timer when the modal opens
  useEffect(() => {
    if (isOpen) {
      setResendDisabled(true);
      setTimer(30);

      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setResendDisabled(false); // Enable resend button
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [isOpen]);

  const handleResend = () => {
    if (!resendDisabled) {
      otpSendFunction(); // Trigger OTP resend function
      setResendDisabled(true);
      setTimer(30); // Reset timer
    }
  };

  return (
    <Modal show={isOpen} centered className="OTP-Modal-dialog">
      <Modal.Body className="mx-5 my-3">
        {/* Modal Close Button (X) */}
        {closeButton === 'show' ? (
          <button
            className="modal-close-btn absolute text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
          >
            <IoIosClose className="modal-close-icon" />
          </button>
        ) : (
          <></>
        )}

        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="mb-3 text-gray-600">{description}</p>
        <p className="text-center mb-3" style={{ fontSize: '14px' }}>
          <span className="font-weight-bold mob-fs-12">OTP sent to</span>{' '}
          <span className="text-gray-500">{email}</span>.
        </p>
        <div className="d-flex mb-4 otp-input justify-content-center">
          <OTPInput
            className="d-flex justify-content-center"
            value={otp}
            onChange={handleChange}
            numInputs={6}
            separator={<span className="mx-1">-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: '2.3rem',
              height: '2.3rem',
              borderRadius: '4px',
              border: '1px solid #b1b1b1',
              fontSize: '1rem',
              textAlign: 'center',
              marginRight: '1.8%',
              marginLeft: '1.8%',
            }}
            focusStyle={{
              border: '1px solid #2CB1B5',
              outline: 'none',
            }}
          />
        </div>
        {resendBtn === 'true' && (
          <p
            onClick={handleResend}
            style={{
              color: resendDisabled ? '#b1b1b1' : '#2CB1B5',
              cursor: resendDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            Resend OTP {resendDisabled && `in ${timer}s`}
          </p>
        )}
        <div className="mt-6 d-flex justify-content-center w-70">
          <Button
            className="w-full"
            style={{ backgroundColor: '#2CB1B5' }}
            onClick={handleVerify}
            type="submit"
          >
            {submitButtonText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OTPModal;
