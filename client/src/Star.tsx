import React from 'react';

interface StarProps {
  size: number;
  onClick: () => void;
  position: { top: number; left: number };
}

const Star: React.FC<StarProps> = ({ size, onClick, position }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    backgroundColor: 'yellow',
    borderRadius: '50%',
    opacity: 0.8,
    top: position.top,
    left: position.left,
    animation: 'blink 1.5s infinite alternate',
  };

  return <div style={style} onClick={onClick} />;
};

export default Star;
