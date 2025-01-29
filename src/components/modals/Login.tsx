import { CustomModalTwo } from '../CustomModalTwo/CustomModalTwo';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from 'assets/landing_page/header/logo.svg';
import { Selectors, Reducers } from 'store';
import { generalConfigs } from 'configs';
import {
  login,
  setUser
} from '../../store/slices/authSlice';
import { showToast } from '../ToastMessage/ToastMessage';



const { GeneralSelectors } = Selectors;
const { uiReducers } = Reducers;

const fields = [
  {
    id: 'Email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    type: 'email',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter Your Password',
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const loginModalStatus = useSelector(GeneralSelectors.loginModalStatus);
  const handleOpenForgotPassword = () => {
    closeModal();
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.forgotPassword,
        value: true,
      })
    );
  };

  const handleSocialLogin = () => {};

  const closeModal = () => {
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.login,
        value: false,
      })
    );
  };

  const handleOpenResigetModal = () => {
    closeModal();
    dispatch(
      uiReducers.showHideModal({
        modalName: generalConfigs.modals.register,
        value: true,
      })
    );
  };

  const handleSubmit = async (values:any) => {
    try {
      const rBody:any = {
        email: values.Email,
        password: values.password,
      }
      const result:any = await dispatch(
        login(rBody));

      // Check if the login was successful based on the API response
      if (result?.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('loginStatus', true);
        dispatch(setUser(result?.payload ?? null));
        closeModal();
        return true;
      } else {
        showToast(
          'Login failed: ' +
            (result?.payload?.message || 'Invalid credentials'),
          'error'
        );
        return false;
      }
    } catch (error) {
      showToast('An error occurred while logging in.', 'error');
      console.error('Login error:', error);
      return false;
    }
  };

  return (
    <>
      <CustomModalTwo
        title={<div className="flex justify-center items-center mb-3">
          <h3 className="text-3xl mr-2 mob-fs-16 mb-0">Login to</h3>
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-6 md:h-10" />
          </div>
        </div>}
        forgotPassModal={<Link
          onClick={handleOpenForgotPassword}
          className="text-[#2CB1B5] underline float-right mb-3 font-weight-bold" to={''}        >
          Forgot Password
        </Link>}
        description={<>
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className="flex mob-fs-12">
              <p className="mr-1 font-weight-bold">New to Loffre.ma?</p>
              <Link
                onClick={handleOpenResigetModal}
                className="text-[#2CB1B5] underline font-weight-bold" to={''}              >
                Create an account
              </Link>
            </div>
          </div>
        </>}
        formFields={fields}
        submitButtonText="login"
        onSubmit={handleSubmit}
        label="Login"
        className="ml-5 h-44"
        variant="outline"
        isOpen={loginModalStatus}
        toggleModal={closeModal}
        socialDispatch={handleSocialLogin} footerContent={undefined}      />
    </>
  );
};

export default Login;
