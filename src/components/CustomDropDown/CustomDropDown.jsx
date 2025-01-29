import { useState } from 'react'; // Import useState to manage selected option
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu/dropdown-menu.jsx';
import { ChevronDown } from 'lucide-react'; // Importing the down arrow icon
import { Button } from '../MyButton/CustomButton';

// DropdownMenuDemo Component
export function CustomDropDown({ options, icon, className, DefaultName }) {
  // Accept icon as a prop
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle option selection
  const handleSelect = (label, onSelect) => {
    setSelectedOption(label); // Set selected option
    onSelect(); // Call the provided onSelect function
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${className} px-3 flex justify-between h-[44px]`}
          variant="outline"
        >
          <span className={`mr-2 ${icon ? 'inline-block' : 'hidden'}`}>
            {icon}
          </span>
          {/* Render icon only at the left */}
          <span
            className={`text-[16px] font-medium leading-[24px] mr-3 text-[#1B1B1B] overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {selectedOption ? selectedOption : DefaultName}
          </span>
          <ChevronDown className="ml-0 text-[#1B1B1B]" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-w-full">
        {/* Set max width for content */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {options.map(
            ({ icon: optionIcon, label, shortcut, onSelect }, index) => (
              <DropdownMenuItem
                key={index}
                className="hover:bg-[#2CB1B5] hover:text-white flex items-center"
                onClick={() => handleSelect(label, onSelect)} // Handle selection
              >
                {optionIcon} {/* Render icon for options */}
                <span className="truncate">{label}</span>
                {/* Prevent label overflow */}
                {shortcut && (
                  <span className="ml-auto text-xs">{shortcut}</span>
                )}
                {/* Render shortcut if provided */}
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
