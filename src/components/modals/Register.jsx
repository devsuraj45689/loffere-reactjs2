import { CustomModalTwo } from 'components/CustomModalTwo/CustomModalTwo';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';
import { showToast } from 'components/ToastMessage/ToastMessage';

import {
  createPassword,
} from 'store/slices/authSlice';

const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const fields = [
  { id: 'name', label: 'Name', placeholder: 'Enter Your Name' },
  {
    id: 'Email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    type: 'email',
  },
  {
    id: 'mobile',
    label: 'Mobile No.',
    placeholder: 'Enter Your Mobile Number',
    type: 'number',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter Your Password',
  },
  {
    id: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm Password',
  },
];

const Register = () => {
  const dispatch = useDispatch();
  const registerModalStatus = useSelector(GeneralSelectors.registerModalStatus);

  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.register,
        value: false,
      })
    );
  };

  const handleSocialLogin = () => {};

  const openLoginModal = () => {
    closeModal();
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.login,
        value: true,
      })
    );
  };

  const openVerifyEmail = (values) => {
    closeModal();
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.verifyEmailOtp,
        value: true,
        data: values
      })
    )
  }

  const handleSubmit = async (values) => {
      await dispatch(createPassword({
        name: values.name,
        email: values.Email,
        mobileNumber: values.mobile,
        password: values.password,
        confirmPassword: values.confirm_password,
      }))
      .then((data) => {
        if(data?.payload?.success){
          showToast('Register account successfully!', 'success');
          closeModal();
          openVerifyEmail(values);
        }else {
          if(data?.meta?.requestStatus === 'success'){
            showToast('Register account successfully!', 'success');
            closeModal();
          }else {
            showToast("Something went wrong", 'error');
          }
        }
        
      })
      .catch((error) => {
        showToast('An error occurred while logging in.', 'error');
        console.log(error, 'error');
      })

    }

  return (
    <>
      <CustomModalTwo
        title={
          <div className="flex justify-center mb-3">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 md:h-10" />
            </div>
          </div>
        }
        forgotPassModal={<></>}
        description={
          <>
            <div className="w-[100%] flex flex-col justify-center items-center">
              <h1 className="text-3xl text-black mob-fs-16">Create account</h1>
              <div className="flex">
                <p className="mr-1 font-weight-bold mob-fs-16">
                  Already have an account?
                </p>
                <Link
                  className="text-[#2CB1B5] underline"
                  onClick={openLoginModal}
                >
                  Login
                </Link>
              </div>
            </div>
          </>
        }
        formFields={fields}
        submitButtonText="Register"
        onSubmit={handleSubmit}
        label="Register"
        className="ml-5 h-44"
        variant=""
        isOpen={registerModalStatus}
        toggleModal={closeModal}
        socialDispatch={handleSocialLogin}
      />
    </>
  );
};

export default Register;
