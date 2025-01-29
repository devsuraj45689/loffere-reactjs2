import React, { useRef, useEffect, useState } from 'react';
import { cn } from 'lib/utils';

const Input = React.forwardRef(
  (
    { className, type = 'text', leftContent, rightContent, onInput, ...props },
    ref
  ) => {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [leftPadding, setLeftPadding] = useState(0);
    const [rightPadding, setRightPadding] = useState(0);

    useEffect(() => {
      // Update padding based on adornment widths
      if (leftRef.current) {
        setLeftPadding(leftRef.current.offsetWidth);
        console.log('sadf', leftRef.current.offsetWidth);
      }
      if (rightRef.current) {
        setRightPadding(rightRef.current.offsetWidth);
        console.log(rightRef.current.offsetWidth);
      }
    }, [leftContent, rightContent]); // Recalculate on content change

    return (
      <div className={`relative flex ${className}`}>
        {leftContent && (
          <span
            ref={leftRef}
            className="absolute left-0 top-1/2 transform -translate-y-1/2" // Adjusted positioning for left adornment
          >
            {leftContent}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'flex w-full h-9  border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
            // {
            //   [`pl-${leftPadding + 10}`]: leftContent, // Add padding based on left content width
            //   [`pr-${rightPadding + 10}`]: rightContent, // Add padding based on right content width
            // },
            // className
          )}
          ref={ref}
          style={{
            paddingLeft: leftPadding ? `${leftPadding}px` : '6px', // Base padding for left
            paddingRight: rightPadding ? `${rightPadding}px` : '6px', // Base padding for right
          }}
          onInput={onInput} // Trigger the onChange event to capture user input
          {...props}
        />
        {rightContent && (
          <span
            ref={rightRef}
            className="absolute right-0 top-1/2 transform -translate-y-1/2" // Adjusted positioning for right adornment
          >
            {rightContent}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
