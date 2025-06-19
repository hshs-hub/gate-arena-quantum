
import React from 'react';

interface GateExplanationProps {
  gateName: string;
  gateSymbol: string;
  description: string;
  mathematicalNotation: string;
}

const GateExplanation = ({ gateName, gateSymbol, description, mathematicalNotation }: GateExplanationProps) => {
  return (
    <div className="quantum-card p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {gateSymbol}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{gateName}</h2>
      </div>
      
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="quantum-state bg-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
        <p className="text-sm text-gray-600 mb-1">Mathematical Representation:</p>
        <code className="text-lg text-blue-700 font-mono">{mathematicalNotation}</code>
      </div>
    </div>
  );
};

export default GateExplanation;
