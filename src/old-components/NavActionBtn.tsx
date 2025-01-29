import React from 'react';

const NavActionBtn = ({ iconName }) => {
  return (
    <div
      className={`icon-item header-icon flex flex-col items-center w-20 `}
      onClick={() => handleHeaderIconClick('Saved')}
    >
      <Icon color="#1B1B1B" sizeClass="w-[14px] h-[12px]" />
      <p className="text-center text-xs font-medium leading-[15.5px] text-[#1B1B1B] mb-0">
        {iconName}
      </p>
    </div>
  );
};

export default NavActionBtn;
