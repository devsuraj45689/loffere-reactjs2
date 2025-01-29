import NavBar from '../../components/NavBar';
import { Header, Footer } from 'sections';
import './style.scss';
import ModalContainer from '../../containers/Modal.container';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className='z-10'>
        <Header />
        <NavBar />
      </nav>
      {children}
      <Footer />
      <ModalContainer />
    </>
  );
};

export default Layout;
