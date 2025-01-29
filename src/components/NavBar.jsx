import { useState, useEffect } from 'react';
import { CustomNavigationMenu } from './CustomNavigationMenu/CustomNavigationMenu';
import megaMenuData from 'data/mega-menu-data.json';

const NavBar = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 428); // Initialize based on window width

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 428); // Update state when resizing
    };

    window.addEventListener('resize', handleResize); // Add listener on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener
    };
  }, []);

  return (
    <>
      {!isMobileScreen && ( // Conditional rendering based on state
        <div className="w-full h-[64px] mt-[84px] flex justify-between items-center md:px-[60px] xl:px-[100px] 2xl:px-[170px] shadow-sm ">
          {megaMenuData.map((menuData, index) => (
            <CustomNavigationMenu
              key={index}
              {...menuData}
              menuTitleClass={index === megaMenuData.length - 1 ? 'text-[#2CB1B5]' : ''}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default NavBar;
