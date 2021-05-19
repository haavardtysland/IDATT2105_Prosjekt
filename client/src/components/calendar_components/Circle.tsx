import React from 'react';

interface CircleProps {
  color: string;
}

function Circle({ color }: CircleProps) {
  const circleStyle = {
    padding: 3,
    margin: 6,
    display: 'inline-block',
    backgroundColor: color,
    borderRadius: '50%',
    width: 2,
    height: 2,
    left: 0,
    top: 0,
  };
  return <div style={circleStyle}></div>;
}

export default Circle;
