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
    width: 3,
    height: 3,
    left: 0,
    top: 0,
    marginLeft: '35%',
    marginRight: 'auto',
  };
  return <div style={circleStyle}></div>;
}

export default Circle;
