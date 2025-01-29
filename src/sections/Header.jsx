import { useState,useEffect } from 'react';
import logo from 'assets/landing_page/header/logo.svg';
import { CustomDropDown } from 'components/CustomDropDown/CustomDropDown';
import { ChevronDown } from 'lucide-react';
import { Button } from 'components/MyButton/CustomButton';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import ProductIcon from 'assets/icons/steppers-icon/Group.png';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import options from '../data/category.json'; 
import {
  HeartIcon,
  LocationIcon,
  MessageIcon,
  PostIcon,
  JobsIcon,
  ItemsIcon,
  UserIcon,
} from 'assets/icons/CustomIcon';
import navIconsData from 'data/nav-icons.json';
import { generalConfigs } from 'configs';
import MobileNavbar from './MobileNavbar';
import { Reducers,Selectors } from 'store';
import CustomCard from 'components/CustomCard/CustomCard';
const {uiReducers} = Reducers
const {AuthSelectors} = Selectors

const iconMap = {
  HeartIcon: HeartIcon,
  MessageIcon: MessageIcon,
  PostIcon: PostIcon,
  JobsIcon: JobsIcon,
  ItemsIcon: ItemsIcon,
};

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(AuthSelectors.getUser)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [postModalshow, setPostModalShow] = useState(false);
  const [postOptionSelect, setPostOptionSelect] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 428);
  const [headerActiveIcon, setHeaderActiveIcon] = useState('');
  const navigate = useNavigate();
  const handleHeaderIconClick = (iconName) => {
    setHeaderActiveIcon(iconName); // Set the active icon
    if (iconName === 'Post') {
      handlePostModalShow();
    }
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };
  // Functions to open each modal and set the modal type
  const openLoginModal = () => {
    dispatch(uiReducers.showHideModal({modalName:generalConfigs.modals.login,value:true}))
  };

  const openRegisterModal = () => {
    dispatch(uiReducers.showHideModal({modalName:generalConfigs.modals.register,value:true}))

  };
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 428;
      setIsMobileView(isMobile);
      document.body.setAttribute('data-is-mobile', isMobile ? 'true' : 'false'); 
    };     
    handleResize();     
    window.addEventListener('resize', handleResize);    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  // Conditionally render MobileNavbar for small screens
  if (isMobileView) {
    return <MobileNavbar />;
  }
  const locations = [
    {
      label: 'New York, USA',
      onSelect: () => console.log('New York selected!'),
    },
    {
      label: 'Tokyo, Japan',
      onSelect: () => console.log('Tokyo selected!'),
    },
  ];

  const categories = [
    {
      label: 'Electronics',
      onSelect: () => console.log('Electronics selected!'),
    },
    {
      label: 'Fashion',
      onSelect: () => console.log('Fashion selected!'),
    },
  ];


  const handlePostModalClose = () => {
    setPostModalShow(false);
    setPostOptionSelect(''); // Reset the selected post option
  };
  const handlePostModalShow = () => setPostModalShow(true);

  // handle post option
  const handlePostOption = (post) => {
    setPostOptionSelect(post); // Use `post` to set the selected option
    handlePostModalClose(); // Close the modal after selection
  };

  const getClickHandler = (onClick, args) => {
    switch (onClick) {
      case 'handleHeaderIconClick':
        return () => handleHeaderIconClick(...args);
      case 'handlePostModalShow':
        return handlePostModalShow;
      default:
        return null;
    }
  };
  const handleContinue = () =>{
    navigate("/post-product")
  }

  return (
   
    <div className="w-full h-[84px] bg-white border-b flex items-center md:justify-between md:px-[30px] 2xl:px-[100px] md:py-4 fixed top-0 z-30">

        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-[52px] w-auto" />
          </Link>
        </div>
        {/* Search & Dropdowns */}
        <div className="flex justify-center gap-[16px]">
          <div>
            <CustomDropDown
              className={' w-[150px]'}
              DefaultName={'Location'}
              options={locations}
              icon={<LocationIcon sizeClass="w-[18px] h-[20px]" />}
            />
          </div>

          <div className="flex">
            <CustomDropDown
              DefaultName={'All Category'}
              options={categories}
              className="rounded-tr-none rounded-br-none w-[160px]"
            />
            <div className="border h-[44px] w-[273px]  pr-1 flex items-center rounded-tr-sm rounded-br-sm">
              <input
                type="text"
                placeholder="Search any item"
                className="pl-3 grow focus:outline-none"
              />
              <button class="inline-flex items-center justify-center rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#2CB1B5] text-white shadow hover:bg-[#24989b] h-9 w-9">
                <span class="mr-1 ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Login & Others */}
        <div>
          {/* {!user ? (
            <div className=" mt-1">
              <Button
                onClick={openLoginModal}
                variant="outline"
                className="ml-5 h-[44px]"
              >
                Login
              </Button>
              <Button
                onClick={openRegisterModal}
                variant=""
                className="ml-5 h-[44px]"
              >
                Register
              </Button>
            </div>
          ) : ( */}
            <div className="flex items-center gap-[20px]">
              <div className="flex gap-[20px] items-center justify-center">
                {navIconsData.map((navIcon, index) => {
                  const IconComponent = iconMap[navIcon.iconType];
                  const handleClick = () => handleHeaderIconClick(navIcon.iconName);
                  return (
                    <div
                className={`flex flex-col items-center gap-1 cursor-pointer ${
                  headerActiveIcon === navIcon.iconName ? 'border-b-4 border-teal-500 rounded-bl-sm rounded-br-sm' : ''
                }`}
                onClick={handleClick}
                key={index}
              >
                      {IconComponent && (
                        <IconComponent
                          color="#1B1B1B"
                          sizeClass={`${navIcon.iconSize}`}
                        />
                      )}
                      <p className="text-center text-xs font-medium leading-[15.5px] text-[#1B1B1B] mb-0">
                        {navIcon.iconName}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div
                onClick={() => {
                  localStorage.clear(), window.location.reload();
                }}
                className="flex items-center gap-1.5"
              >
                <UserIcon sizeClass="w-[28px] h-[28px]" />
                <ChevronDown className="ml-0 text-[#1B1B1B] grow" size={16} />
              </div>
            </div>
           {/* )}  */}
        </div>
        <Modal className='w-[467px] h-[460px]' show={postModalshow} centered onHide={handlePostModalClose}>
      <Modal.Body className="relative p-5 text-center">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handlePostModalClose}
        >
          <IoIosClose className="text-3xl" />
        </button>

        {/* Modal Heading */}
        <h2 className="text-2xl font-semibold mb-4">
          Lorem ipsum dolor sit amet <br /> consectetur.
        </h2>

        {/* Card Options */}
        <div className="flex flex-col gap-3 items-center">
      {options.map((option) => (
        <CustomCard
        key={option.id}
        image={option.image} 
        title={option.title}
        description={option.description}
        isSelected={postOptionSelect === option.id}
        onClick={() => setPostOptionSelect(option.id)}
      />
      ))}
    </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          variant="default"
          className="w-[351px] h-[40px] mt-5"
          disabled={!postOptionSelect}
        >
          Continue
        </Button>
      </Modal.Body>
    </Modal>
      </div>
   
  );
};

export default Header;
