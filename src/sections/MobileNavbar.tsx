import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, Home, MessageSquare, PlusCircle, List, Heart, ChevronDown,X } from 'lucide-react';
import logo from 'assets/landing_page/header/logo.svg';
import navIconsData from 'data/nav-icons.json';
import marker from "../../public/Marker/location.svg"
import user from "../../public/Icon/User.svg"
import saved from "../../public/Icon/Saved.svg"
import post from "../../public/Icon/post.svg"
import item from "../../public/Icon/item.svg"
import carr from "../../public/Icon/carr.svg"
import job from "../../public/Icon/jobs.svg"
import login from "../../public/Icon/login.svg"
import inbox from "../../public/Icon/inbox.svg"
import bike from "../../public/Icon/bike.png"
import bicycle from "../../public/Icon/bicycle.png"
import { useDispatch,useSelector } from 'react-redux';

import {
  HeartIcon,
  LocationIcon,
  MessageIcon,
  PostIcon,
  JobsIcon,
  ItemsIcon,
  UserIcon,
} from 'assets/icons/CustomIcon';
import ProductIcon from 'assets/icons/steppers-icon/Group.png';
import { CustomDropDown } from 'components/CustomDropDown/CustomDropDown';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Modal } from 'react-bootstrap';
import { IoIosClose } from 'react-icons/io';
import CardContent from '@mui/material/CardContent';
import { Reducers,Selectors } from 'store';
import { generalConfigs } from 'configs';
const {uiReducers} = Reducers
const {AuthSelectors} = Selectors
const iconMap = {
  HeartIcon: HeartIcon,
  MessageIcon: MessageIcon,
  PostIcon: PostIcon,
  JobsIcon: JobsIcon,
  ItemsIcon: ItemsIcon,
}

const MobileNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postModalshow, setPostModalShow] = useState(false);
  const [postOptionSelect, setPostOptionSelect] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [isBikesExpanded, setIsBikesExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(''); 
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const toggleBikes = () => setIsBikesExpanded((prev) => !prev);
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
  const handleHeaderIconClick = (iconName:any) => {
    setHeaderActiveIcon(iconName);
    if (iconName === 'Post') {
      navigate('/Post-Product');
    }
    if (iconName === 'Job') {
      navigate('/Post-Job');
    }
  };
  const handlePostModalClose = () => setPostModalShow(false);
  const handlePostModalShow = () => setPostModalShow(true);
  const handlePostOption = (post:any) => {
    handlePostModalClose();
    handleHeaderIconClick(post);
  };
  const getClickHandler = (onClick:any, args:any) => {
    switch (onClick) {
      case 'handleHeaderIconClick':
        return () => handleHeaderIconClick(...args);
      case 'handlePostModalShow':
        return handlePostModalShow;
      default:
        return null;
    }
  };
   const openLoginModal = () => {
      dispatch(uiReducers.showHideModal({modalName:generalConfigs.modals.login,value:true}))
    };
  return (
    <div className="md:hidden">
      {/* Top Navbar */}
      <div className="w-full h-[56px]  flex  justify-between px-4 py-2 bg-white z-10">
        {/* Menu Icon */}
        <div className='flex gap-2'>
        <button className="text-gray-700" onClick={toggleMenu}>
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-[40px] w-[160]" />
        </Link>
        </div>
        

        {/* User Profile Icon */}
        <button className="text-gray-700">
          <img src={user} alt="" />
        </button>
      </div>

      {/* Search Section */}
      <div className="">
      <div className='flex'>
        <div className='w-[32px] h-[32px] rounded bg-teal-50 m-3 '>
        <img src={marker} alt="" className='p-2' />
        </div>
        
      <div className='mt-[12px]'>
        <p className='text-[12px]'>Location <br /><span className='font-semibold'>Chennai,India</span></p>
       
      </div>
      </div>
      
      <div className="px-3 ">
        <div className="flex items-center border w-[396px] h-[44px]  border-gray-300 rounded-md px-3 py-2 bg-white">
          <Search className="text-teal-500" size={20} />
          <input
            type="text"
            placeholder="Search any item"
            className="ml-2 w-full outline-none text-gray-700"
          />
        </div>
      </div>
      </div>
     
      <div
        className={`fixed top-0 left-0 w-[330px] h-[622px] bg-white shadow-lg z-50 overflow-auto transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          {/* Close Button */}
          <div className="flex justify-end  p-3 border-b border-gray-300">
            <button onClick={toggleMenu} className="text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* Tabbed Navigation */}
          <div className="flex h-[46px]">
            <button
              className={`w-1/2 p-2 text-center font-semibold rounded-bl-[5px] rounded-br-[5px] ${
                activeTab === 'menu'
                  ? 'border-b-4 border-teal-500  bg-teal-50'
                  : 'text-gray-600'
              } focus:outline-none`}
              onClick={() => setActiveTab('menu')}
            >
              MENU
            </button>
            <button
              className={`w-1/2 p-2 text-center font-semibold rounded-bl-[5px] rounded-br-[5px] ${
                activeTab === 'categories'
                  ? 'border-b-4 border-teal-500 bg-teal-50'
                  : 'text-gray-600'
              } focus:outline-none`}
              onClick={() => setActiveTab('categories')}
            >
              CATEGORIES
            </button>
          </div>

          {/* Menu Content */}
          {activeTab === 'menu' && (
           <div className="flex flex-col space-y-4">
            <div className='border-b border-gray-300 '>
            <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline py-2">
                Home
              </Link>
            </div>
             
            <div className='border-b border-gray-300 '>
            <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
                About Us
              </Link>
            </div>
            <div className='border-b border-gray-300 '>
            <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
                Contact Us
              </Link>
            </div>
           
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={saved} alt="" />
                Saved
              </Link>
              </div>
              
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={inbox} alt="" /> Inbox
              </Link>
              </div>
             
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={post} alt="" /> Post
              </Link>
              </div>
              
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={job} alt="" /> My Jobs
              </Link>
              </div>
             
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={item} alt="" /> My Item
              </Link>
              </div>
              
              <div className='border-b border-gray-300 '>
              <button  onClick={openLoginModal} className="text-[#1B1B1B]  pl-4 pb-2 font-medium flex items-center gap-2 no-underline">
              <img src={login} alt="" /> Login / Register
              </button>
              </div>
              
            </div>
          )}

          {/* Categories Content */}
          {activeTab === 'categories' && (
            <div className="flex flex-col ">
              <div className='border-b border-gray-300 '>
              <Link to="#" className=" text-[#1B1B1B] font-medium no-underline">
              <div className='pl-4 py-2 flex gap-2'>
              <img src={carr} alt="" /> Cars
              </div>
              
              </Link>
              </div>
              

              {/* Bikes Dropdown */}
              <div>
              <div className='border-b border-gray-300 '>
                <button
                  className="w-full text-left py-2 pl-4 flex items-center justify-between text-[#1B1B1B] font-medium"
                  onClick={toggleBikes}
                >
                  <div className='flex gap-2'> 
                  <img src={bike} alt="" />Bikes
                  </div>
                  
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 text-teal-500 ${
                      isBikesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                </div>
                {isBikesExpanded && (
                  <div className="mt-1x` pl-4">
                    <div className='border-b border-gray-300 '>
                    <p className="flex gap-2 py-1 text-[#1B1B1B] font-normal"><img src={bicycle} alt="" /> Lorem Ipsum</p>
                    </div>
                    <div className='border-b border-gray-300 '>
                    <p className="flex gap-2 py-1 text-[#1B1B1B] font-normal"><img src={bicycle} alt="" /> Lorem Ipsum</p>
                    </div>
                    <div className='border-b border-gray-300 '>
                    <p className="flex gap-2 py-1 text-[#1B1B1B] font-normal"><img src={bicycle} alt="" /> Lorem Ipsum</p>
                    </div>
                    <div className='border-b border-gray-300 '>
                    <p className="flex gap-2 py-1 text-[#1B1B1B] font-normal"><img src={bicycle} alt="" /> Lorem Ipsum</p>
                    </div>
                  </div>
                )}
              </div>
              <div className='border-b border-gray-300 '>
              <Link to="#" className="text-[#1B1B1B] font-medium no-underline">
              <div className='flex gap-2 pl-4 py-2'>
              <img src={bicycle} alt="" /> Bicycles
              </div>
              
              </Link>
              </div>
              <div className='border-b border-gray-300 '>
              <Link to="#" className=" text-[#1B1B1B] font-medium no-underline">
                <p className='pl-4'>⋯ Others</p>
              </Link>
              </div>  
            </div>
          )}
        </div>
    
      {/* Bottom Navbar */}
      <div>
                {user && (
                      <div className="fixed w-[428px] h-[69px] bottom-0  bg-white border-t border-gray-300 z-10">
                      <div className="flex justify-around items-center py-3">
                        {navIconsData.map((navIcon:any, index:any) => {
                          const IconComponent = iconMap[navIcon.iconType];
                          const handleClick = getClickHandler(
                            navIcon.onClick,
                            navIcon.args
                          );
                          return (
                            <div
                              className={`flex flex-col items-center gap-1 cursor-pointer`}
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
                    </div>
                )}
              </div>
            <Modal show={postModalshow} centered onHide={handlePostModalClose}>
          <Modal.Body>
            {/* Modal Close Button (X) */}
            <button
              className="absolute border rounded-circle top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handlePostModalClose}
            >
              <IoIosClose className="modal-close-icon" />
            </button>
            {/* Modal Header */}
            {/* () => handleHeaderIconClick('Post') */}
            <h2 className="text-xl font-semibold mb-1 p-3 mx-5 text-center">
              Lorem ipsum dolor sit amet consectetur.
            </h2>
            <div className="mx-5">
              <div className="mx-5 post-option-card">
                <Card
                  onClick={() => setPostOptionSelect('Post')}
                  className={
                    postOptionSelect === 'Post'
                      ? 'card-wrap-container active-category-card'
                      : 'card-wrap-container'
                  }
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1 0 auto',
                      width: '80%',
                    }}
                  >
                    <CardContent>
                      <input
                        checked={postOptionSelect === 'Post' ? true : false}
                        className="checkPostCard"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      Products
                    </CardContent>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      mr: 2,
                      backgroundColor: '#EDFEFF',
                      borderRadius: '50%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={ProductIcon}
                      alt="Post"
                      sx={{ width: 'auto', height: '30px' }}
                    />
                  </Box>
                </Card>
                <Card
                  onClick={() => setPostOptionSelect('Job')}
                  className={
                    postOptionSelect === 'Job'
                      ? 'card-wrap-container active-category-card'
                      : 'card-wrap-container'
                  }
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: '1 0 auto',
                      width: '80%',
                    }}
                  >
                    <CardContent>
                      <input
                        checked={postOptionSelect === 'Job' ? true : false}
                        className="checkPostCard"
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                      />
                      Jobs
                    </CardContent>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      mr: 2,
                      backgroundColor: '#EDFEFF',
                      borderRadius: '50%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={JobsIcon}
                      alt="Job"
                      sx={{ width: 'auto', height: '30px' }}
                    />
                  </Box>
                </Card>
              </div>
              <div>
                <button
                  onClick={() => handlePostOption(postOptionSelect)}
                  className="btn btn-primary border rounded w-100"
                >
                  continue
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default MobileNavbar;
