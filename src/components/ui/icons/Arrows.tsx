import React from 'react';

interface ArrowProps {
  className?: string;
  style?: any;
  onClick?: () => void;
}

const containerStyle = {
  position: 'absolute',
  top: '50%',
  width: '46px',
  height: '46px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#ffffff',
  borderRadius: '50%',
  cursor: 'pointer',
  boxShadow: '0px 4px 15px -3px rgba(0, 0, 0, 0.16)',
  transition: 'background-color 0.3s, stroke 0.3s',
};

const svgStyle = {
  transition: 'stroke 0.3s',
};

export const NextArrow: React.FC<ArrowProps> = (props) => (
  <div
    className={`${props.className}`}
    style={{
      ...props.style,
      ...containerStyle,
      transform: 'translate(50% , -50%)',
    }}
    onClick={props.onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#2CB1B5';
      const path = e.currentTarget.querySelector('path');
      if (path) path.style.stroke = '#ffffff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
      const path = e.currentTarget.querySelector('path');
      if (path) path.style.stroke = '#2CB1B5';
    }}
  >
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
    >
      <path
        d="M19 6.47583L14 1.47583M19 6.47583L14 11.4758M19 6.47583H1"
        stroke="#2CB1B5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const PrevArrow: React.FC<ArrowProps> = (props) => (
  <div
    className={`${props.className}`}
    style={{
      ...props.style,
      ...containerStyle,
      transform: 'translate(-50%, -50%)',
    }}
    onClick={props.onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#2CB1B5';
      const path = e.currentTarget.querySelector('path');
      if (path) path.style.stroke = '#ffffff';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff';
      const path = e.currentTarget.querySelector('path');
      if (path) path.style.stroke = '#2CB1B5';
    }}
  >
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
    >
      <path
        d="M1 6.47583L6 11.4758M1 6.47583L6 1.47583M1 6.47583L19 6.47583"
        stroke="#2CB1B5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
export const RightArrow = () => (
  <svg
    width="20"
    height="13"
    viewBox="0 0 20 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.47583L14 1.47583M19 6.47583L14 11.4758M19 6.47583H1"
      stroke="#2CB1B5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
