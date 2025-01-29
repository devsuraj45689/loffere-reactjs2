'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { cn } from 'lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'components/ui/navigation-menu/navigation-menu';
import { Link } from 'react-router-dom';

export function CustomNavigationMenu({ menuTitle, submenus, menuTitleClass }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  useEffect(() => {
    // Ensure the first menu item is always selected initially
    setSelectedMenu(0);
  }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList className="p-0 mb-0 ">
        <NavigationMenuItem>
          {/* Menu Trigger */}
          <NavigationMenuTrigger
            className={`p-0 bg-transparent h-auto text-[#1B1B1B] leading-[21px] gap-2 hover:text-[#2CB1B5] ${menuTitleClass}`}
          >
            {menuTitle}
          </NavigationMenuTrigger>

          {/* Menu Content */}
          <NavigationMenuContent>
            <div className="flex bg-white shadow-lg rounded-b-md w-[1100px] h-[588px]">
              {/* Left Column: Sidebar Menu */}
              <ul className="w-1/4 bg-[#E7F9FA] p-4 ">
                {submenus.menu.map((menuItem, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer flex items-center gap-2 p-2 ${selectedMenu === index
                        ? "text-[#2CB1B5] border-l-[4px] rounded-sm border-[#2CB1B5] "
                        : "text-[#1B1B1B] hover:text-[#2CB1B5]"
                      }`}
                  >
                    <img alt="product" src={menuItem.icon} />
                    {menuItem.title}
                  </li>
                ))}
              </ul>

              {/* Right Columns: Content */}
              <div>
                <div className='flex justify-around text-sm w-[600px] mt-4'>
                  <h3 className='text-xl text-[#2CB1B5] font-bold uppercase'>Lorem Ipsum</h3>
                  <h3 className='text-xl text-[#2CB1B5] font-bold uppercase'>Lorem Ipsum</h3>
                  <h3 className='text-xl text-[#2CB1B5] font-bold uppercase'>Lorem Ipsum</h3>
                </div>

                <div className="w-3/4 grid grid-cols-3 gap-6 mt-3">
                  {submenus.content.map((contentSection, index) => (

                    <div key={index}>
                      {/* Section Header */}
                      <h4 className="text-sm  text-[#2CB1B5] mb-2 ml-10">
                        {contentSection.header}
                      </h4>

                      {/* Section Items */}
                      <ul className="ml-2">
                        {contentSection.items.map((item, i) => (
                          <li key={i}>
                            <Link
                              to={item.href || '#'}
                              className="text-sm text-[#1B1B1B] hover:text-[#2CB1B5] no-underline"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#2CB1B5] hover:text-white focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-colors hover:text-white">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
