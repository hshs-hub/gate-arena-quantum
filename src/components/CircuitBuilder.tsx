
import React, { useState } from 'react';
import { DragEvent } from 'react';

interface CircuitBuilderProps {
  gateType: 'hadamard' | 'cnot';
  onCircuitChange: (circuit: any[]) => void;
}

const CircuitBuilder = ({ gateType, onCircuitChange }: CircuitBuilderProps) => {
  const [droppedGates, setDroppedGates] = useState<any[]>([]);
  
  const handleDragStart = (e: DragEvent, gate: string) => {
    e.dataTransfer.setData('text/plain', gate);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const gate = e.dataTransfer.getData('text/plain');
    const newGates = [...droppedGates, { type: gate, id: Date.now() }];
    setDroppedGates(newGates);
    onCircuitChange(newGates);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const clearCircuit = () => {
    setDroppedGates([]);
    onCircuitChange([]);
  };

  const availableGates = gateType === 'hadamard' 
    ? [{ name: 'H', symbol: 'H', color: 'from-blue-500 to-blue-600' }]
    : [
        { name: 'H', symbol: 'H', color: 'from-blue-500 to-blue-600' },
        { name: 'CNOT', symbol: '⊕', color: 'from-purple-500 to-purple-600' }
      ];

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Circuit Builder</h4>
      
      {/* Gate Palette */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 mb-3">Available Gates</h5>
        <div className="flex gap-3">
          {availableGates.map((gate) => (
            <div
              key={gate.name}
              draggable
              onDragStart={(e) => handleDragStart(e, gate.name)}
              className={`gate-button bg-gradient-to-r ${gate.color} group relative`}
              title={`Drag to add ${gate.name} gate`}
            >
              {gate.symbol}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {gate.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circuit Canvas */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h5 className="font-semibold text-gray-700">Quantum Circuit</h5>
          <button
            onClick={clearCircuit}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
          >
            Clear
          </button>
        </div>
        
        <div
          className="circuit-dropzone flex items-center gap-4 min-h-[120px]"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Qubit wire */}
          <div className="flex-1">
            <div className="flex items-center">
              <div className="quantum-state mr-4 font-semibold">|0⟩</div>
              <div className="qubit-wire flex-1 flex items-center">
                {droppedGates.map((gate, index) => (
                  <div
                    key={gate.id}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold mx-2 shadow-md"
                  >
                    {gate.type === 'H' ? 'H' : '⊕'}
                  </div>
                ))}
              </div>
            </div>
            
            {gateType === 'cnot' && (
              <div className="flex items-center mt-4">
                <div className="quantum-state mr-4 font-semibold">|0⟩</div>
                <div className="qubit-wire flex-1"></div>
              </div>
            )}
          </div>
        </div>
        
        {droppedGates.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Drag gates from above to build your quantum circuit
          </p>
        )}
      </div>
    </div>
  );
};

export default CircuitBuilder;
