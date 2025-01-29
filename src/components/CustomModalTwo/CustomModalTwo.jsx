import { useState } from 'react';
import { Button } from '../MyButton/CustomButton';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import Facebook from 'assets/landing_page/header/social-icon/facebook.png';
import Apple from 'assets/landing_page/header/social-icon/apple.png';
import Google from 'assets/landing_page/header/social-icon/google.png';
import { auth, provider, fbProvider } from '../../configs/db-config';
import { signInWithPopup, OAuthProvider } from 'firebase/auth';
import eye from "./../../../public/Icon/eye.svg"
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import the default styles
import 'assets/css/custom-phone-input.css'; // Import your custom styles
import 'bootstrap/dist/css/bootstrap.min.css';

export function CustomModalTwo({
  title,
  description,
  formFields,
  submitButtonText,
  onSubmit,
  label,
  className,
  variant,
  footerContent,
  isOpen, // Receive isOpen as prop from parent
  toggleModal, // Receive toggleModal as prop from parent
  forgotPassModal,
  socialDispatch,
}) {
  // Generate the initial values and validation schema dynamically based on formFields
  const initialValues = formFields.reduce((acc, field) => {
    acc[field.id] = field.defaultValue || '';
    return acc;
  }, {});
  const [mobileCodeValue, setMobileCodeValue] = useState('');
  const validationSchema = Yup.object().shape(
    formFields.reduce((acc, field) => {
      // Customize validation for each field type if needed
      if (field.type === 'email') {
        acc[field.id] = Yup.string()
          .email('Invalid email address')
          .required(`${field.id} is required`);
      } else {
        acc[field.id] = Yup.string().required(`${field.id} is required`);
      }
      return acc;
    }, {})
  );

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result.user);
        socialDispatch({
          name: result.user.displayName,
          email: result.user.email,
          registrationType: 'social',
        });
        // You can store user data or redirect the user as needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        console.log('User Info:', result.user);

        // Handle successful sign-in
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          console.warn('Popup closed by the user.');
          // Optional: Notify the user with a UI element
          alert('It seems you closed the sign-in popup. Please try again.');
        } else {
          console.error('Authentication error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      });
  };

  const signInWithApple = () => {
    const appleProvider = new OAuthProvider('apple.com');

    signInWithPopup(auth, appleProvider)
      .then((result) => {
        // Successfully signed in
        const user = result.user;
        console.log('User Info:', user);

        // Get the OAuth credential
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);

        // Handle user information or registration as needed
      })
      .catch((error) => {
        // Handle errors
        if (error.code === 'auth/popup-closed-by-user') {
          console.warn('Popup closed by the user.');
          alert('Sign-in popup was closed. Please try again.');
        } else if (error.code === 'auth/cancelled-popup-request') {
          console.warn('Popup request was canceled.');
        } else {
          console.error('Sign-in error:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      });
  };

  return (
    <>
      <Modal
        show={isOpen}
        centered
        onHide={toggleModal}
        className={variant === 'outline' ? 'Login-Modal' : 'Registration-Modal'}
      >
        <Modal.Body>
          {/* Modal Close Button (X) */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={toggleModal}
          >
            <IoIosClose className="modal-close-icon" />
          </button>
          {/* Modal Header */}
          <h2 className="text-xl font-semibold mt-3 mb-1">{title}</h2>
          <p className="mb-1 text-gray-600 text-bold">{description}</p>
          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values)
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="mx-3">
                {/* Dynamic Form Fields */}
                <div className="space-y-4">
                  {formFields.map((field, index) => (
                    <div key={index} className="relative">
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}{' '}
                        {field.label !== '' ? (
                          <span className="required text-teal-500">*</span>
                        ) : (
                          <></>
                        )}
                      </label>
                      {field.id === 'mobile' ? (
                        <div className="custom-phone-input-container">
                          <PhoneInput
                            value={mobileCodeValue}
                            onChange={setMobileCodeValue}
                            defaultCountry="MA" // Default country: Morocco
                            international
                            className="custom-phone-input w-30 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                          <Field
                            id={field.id}
                            name={field.id}
                            type={
                              field.type === 'password' &&
                                !showPassword[field.id]
                                ? 'password'
                                : 'text'
                            }
                            placeholder={field.placeholder}
                            className="ml-3 w-65 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      ) : (
                        <Field
                          id={field.id}
                          name={field.id}
                          type={
                            field.type === 'password' && !showPassword[field.id]
                              ? 'password'
                              : 'text'
                          }
                          placeholder={field.placeholder}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}

                      {field.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(field.id)}
                          className={
                            field.label === ''
                              ? 'absolute right-2 top-5 transform -translate-y-1/2'
                              : 'absolute right-2 top-11 transform -translate-y-1/2'
                          }
                        >
                          {showPassword[field.id] ? (
                            <FaEyeSlash className="eye-icon-color" />
                          ) : (
                            // <FaEye className="eye-icon-color" />
                            <img src={eye} alt="" />
                          )}
                        </button>
                      )}
                      <ErrorMessage
                        name={field.id}
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  ))}

                  {label === 'Login' ? <div>{forgotPassModal}</div> : <></>}
                </div>
                {label === 'Register' ? (
                  <></>
                  // <div className="text-right mt-3 mob-fs-12">
                  //   By using this site, you agree to our{' '}
                  //   <a href="/privacy">Privacy Policy</a>.
                  // </div>
                ) : (
                  <></>
                )}
                {/* Modal Footer (Single Full-Width Submit Button) */}
                <div className="mt-5">
                  <Button className="w-full" type="submit">
                    {submitButtonText}
                  </Button>
                  {footerContent}
                </div>

                {label === 'Login' || label === 'ForgetPssword' ? (
                  <div class=" social-login-buttons my-3 mx-3">
                    <div className='flex'>
                    <div className="flex-grow border-t border-gray-300 m-[10px]"></div>
                    <span className="px-2 text-gray-500 text-sm">Or login with</span>
                    <div className="flex-grow border-t border-gray-300 m-[10px]"></div>
                    </div>

                    
                    <div class="icon-container d-flex gap-3 mt-3 justify-center">
                      <div className="cursor-pointer">
                        <img
                          onClick={signInWithFacebook}
                          src={Facebook}
                          alt="Facebook"
                        />
                      </div>
                      <div className="cursor-pointer">
                        <img
                          onClick={signInWithApple}
                          src={Apple}
                          alt="Apple"
                        />
                      </div>
                      <div className="cursor-pointer">
                        <img
                          onClick={signInWithGoogle}
                          src={Google}
                          alt="Facebook"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
