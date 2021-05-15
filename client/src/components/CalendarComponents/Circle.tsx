import React from 'react';

function Circle() {
  const circleStyle = {
    padding: 3,
    margin: 6,
    display: 'inline-block',
    backgroundColor: 'green',
    borderRadius: '50%',
    width: 1,
    height: 1,
    left: 0,
    top: 0,
  };
  return <div style={circleStyle}></div>;
}

export default Circle;
