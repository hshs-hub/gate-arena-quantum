
import React from 'react';

interface BlochSphereProps {
  position: { x: number; y: number; z: number };
}

const BlochSphere = ({ position }: BlochSphereProps) => {
  const { x, y, z } = position;
  
  // Convert 3D position to 2D representation
  const sphereX = x * 40 + 50; // Scale and center
  const sphereY = -y * 40 + 50; // Invert Y and center
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Sphere background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-full border-2 border-blue-300 relative overflow-hidden">
        {/* Sphere wireframe */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-400 opacity-50"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-400 opacity-50"></div>
          <div 
            className="absolute border border-blue-400 opacity-30 rounded-full"
            style={{
              width: '80%',
              height: '40%',
              left: '10%',
              top: '30%'
            }}
          ></div>
        </div>
        
        {/* State vector */}
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
          style={{
            left: `${sphereX}%`,
            top: `${sphereY}%`
          }}
        >
          <div className="absolute -top-1 -left-1 w-4 h-4 border-2 border-red-500 rounded-full animate-ping"></div>
        </div>
        
        {/* Vector line from center */}
        <svg className="absolute inset-0 w-full h-full">
          <line
            x1="50%"
            y1="50%"
            x2={`${sphereX}%`}
            y2={`${sphereY}%`}
            stroke="red"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
      
      {/* Labels */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">|0⟩</div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">|1⟩</div>
    </div>
  );
};

export default BlochSphere;
