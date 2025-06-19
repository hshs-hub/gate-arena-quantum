
import React, { useState } from 'react';
import { DragEvent } from 'react';
import GateLibrary, { QUANTUM_GATES } from './GateLibrary';

interface Gate {
  id: string;
  type: string;
  qubit?: number;
  controlQubit?: number;
  targetQubit?: number;
  parameter?: number;
}

interface CircuitBuilderProps {
  numQubits: number;
  onCircuitChange: (circuit: Gate[]) => void;
}

const CircuitBuilder = ({ numQubits, onCircuitChange }: CircuitBuilderProps) => {
  const [droppedGates, setDroppedGates] = useState<Gate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleDragStart = (e: DragEvent, gateName: string) => {
    e.dataTransfer.setData('text/plain', gateName);
  };

  const handleDrop = (e: DragEvent, qubitIndex: number) => {
    e.preventDefault();
    const gateName = e.dataTransfer.getData('text/plain');
    const gateInfo = QUANTUM_GATES.find(g => g.name === gateName);
    
    if (!gateInfo) return;

    const newGate: Gate = {
      id: Date.now().toString() + Math.random(),
      type: gateName,
      qubit: qubitIndex,
    };

    // Handle multi-qubit gates
    if (gateInfo.qubits === 2 && gateName === 'CNOT') {
      newGate.controlQubit = qubitIndex;
      newGate.targetQubit = (qubitIndex + 1) % numQubits;
    } else if (gateInfo.qubits === 2) {
      newGate.controlQubit = qubitIndex;
      newGate.targetQubit = (qubitIndex + 1) % numQubits;
    }

    // Handle parameterized gates
    if (gateInfo.hasParameter) {
      newGate.parameter = Math.PI / 2; // Default parameter
    }

    const newGates = [...droppedGates, newGate];
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

  const removeGate = (gateId: string) => {
    const newGates = droppedGates.filter(gate => gate.id !== gateId);
    setDroppedGates(newGates);
    onCircuitChange(newGates);
  };

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'basic', label: 'Basic' },
    { key: 'pauli', label: 'Pauli' },
    { key: 'phase', label: 'Phase' },
    { key: 'rotation', label: 'Rotation' },
    { key: 'multi', label: 'Multi-Qubit' },
    { key: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-800">Circuit Builder</h4>
        <button
          onClick={clearCircuit}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
        >
          Clear Circuit
        </button>
      </div>

      {/* Gate Category Selector */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-semibold text-gray-700 mb-3">Gate Categories</h5>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gate Library */}
        <div 
          onDragStart={(e) => {
            const target = e.target as HTMLElement;
            if (target.dataset.gateName) {
              handleDragStart(e, target.dataset.gateName);
            }
          }}
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {QUANTUM_GATES
              .filter(gate => selectedCategory === 'all' || gate.category === selectedCategory)
              .filter(gate => gate.qubits <= numQubits)
              .map(gate => (
                <div
                  key={gate.name}
                  draggable
                  data-gate-name={gate.name}
                  className={`gate-button bg-gradient-to-r ${gate.color} group relative`}
                  title={gate.description}
                >
                  <span className="text-xs font-bold">{gate.symbol}</span>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {gate.description}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Circuit Canvas */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <h5 className="font-semibold text-gray-700 mb-4">Quantum Circuit - {numQubits} Qubit{numQubits > 1 ? 's' : ''}</h5>
        
        <div className="space-y-4">
          {Array.from({ length: numQubits }).map((_, qubitIndex) => (
            <div key={qubitIndex} className="flex items-center">
              <div className="quantum-state mr-4 font-semibold w-12">
                |{qubitIndex}⟩
              </div>
              <div 
                className="qubit-wire flex-1 flex items-center min-h-[60px] relative"
                onDrop={(e) => handleDrop(e, qubitIndex)}
                onDragOver={handleDragOver}
              >
                {droppedGates
                  .filter(gate => gate.qubit === qubitIndex || gate.controlQubit === qubitIndex || gate.targetQubit === qubitIndex)
                  .map((gate, index) => (
                    <div
                      key={gate.id}
                      className="relative mx-2 group"
                      onClick={() => removeGate(gate.id)}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${
                        QUANTUM_GATES.find(g => g.name === gate.type)?.color || 'from-gray-500 to-gray-600'
                      } text-white rounded-lg flex items-center justify-center font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow`}>
                        <span className="text-xs">
                          {QUANTUM_GATES.find(g => g.name === gate.type)?.symbol || gate.type}
                        </span>
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to remove
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        {droppedGates.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Drag quantum gates from above to build your circuit
          </p>
        )}
      </div>
    </div>
  );
};

export default CircuitBuilder;
