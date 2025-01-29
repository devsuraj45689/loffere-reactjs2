import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './store/store'; // Import the store
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
// import { router } from './AppRouter.jsx';
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import '@fontsource/poppins/400.css'; // Regular weight
import '@fontsource/poppins/500.css'; // Medium weight
import { ToastNotificationContainer } from './components/ToastMessage/ToastMessage.jsx';
import { themeConfigs } from './configs';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <HelmetProvider>
          <ConfigProvider theme={themeConfigs.themeVariants.light}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </HelmetProvider>
        <ToastNotificationContainer />
      </Provider>
    </>
  );
};

export default App;
