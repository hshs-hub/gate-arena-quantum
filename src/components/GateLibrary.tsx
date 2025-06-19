
import React from 'react';

interface Gate {
  name: string;
  symbol: string;
  color: string;
  category: 'basic' | 'pauli' | 'phase' | 'rotation' | 'multi' | 'advanced';
  description: string;
  qubits: number;
  hasParameter?: boolean;
}

export const QUANTUM_GATES: Gate[] = [
  // Basic Gates
  { name: 'H', symbol: 'H', color: 'from-blue-500 to-blue-600', category: 'basic', description: 'Hadamard - Creates superposition', qubits: 1 },
  { name: 'I', symbol: 'I', color: 'from-gray-500 to-gray-600', category: 'basic', description: 'Identity - No operation', qubits: 1 },
  
  // Pauli Gates
  { name: 'X', symbol: 'X', color: 'from-red-500 to-red-600', category: 'pauli', description: 'Pauli-X - Bit flip (NOT)', qubits: 1 },
  { name: 'Y', symbol: 'Y', color: 'from-green-500 to-green-600', category: 'pauli', description: 'Pauli-Y - Bit and phase flip', qubits: 1 },
  { name: 'Z', symbol: 'Z', color: 'from-purple-500 to-purple-600', category: 'pauli', description: 'Pauli-Z - Phase flip', qubits: 1 },
  
  // Phase Gates
  { name: 'S', symbol: 'S', color: 'from-indigo-500 to-indigo-600', category: 'phase', description: 'S Gate - √Z phase gate', qubits: 1 },
  { name: 'T', symbol: 'T', color: 'from-pink-500 to-pink-600', category: 'phase', description: 'T Gate - √S phase gate', qubits: 1 },
  { name: 'P', symbol: 'P', color: 'from-teal-500 to-teal-600', category: 'phase', description: 'Phase Gate - Arbitrary phase', qubits: 1, hasParameter: true },
  
  // Rotation Gates
  { name: 'RX', symbol: 'Rx', color: 'from-orange-500 to-orange-600', category: 'rotation', description: 'Rotation around X-axis', qubits: 1, hasParameter: true },
  { name: 'RY', symbol: 'Ry', color: 'from-yellow-500 to-yellow-600', category: 'rotation', description: 'Rotation around Y-axis', qubits: 1, hasParameter: true },
  { name: 'RZ', symbol: 'Rz', color: 'from-cyan-500 to-cyan-600', category: 'rotation', description: 'Rotation around Z-axis', qubits: 1, hasParameter: true },
  
  // Multi-qubit Gates
  { name: 'CNOT', symbol: '⊕', color: 'from-purple-500 to-purple-600', category: 'multi', description: 'Controlled-NOT', qubits: 2 },
  { name: 'CZ', symbol: 'CZ', color: 'from-violet-500 to-violet-600', category: 'multi', description: 'Controlled-Z', qubits: 2 },
  { name: 'SWAP', symbol: '⤫', color: 'from-emerald-500 to-emerald-600', category: 'multi', description: 'Swap two qubits', qubits: 2 },
  
  // Advanced Gates
  { name: 'CCNOT', symbol: '⊕⊕', color: 'from-rose-500 to-rose-600', category: 'advanced', description: 'Toffoli - Controlled-CNOT', qubits: 3 },
  { name: 'CU', symbol: 'CU', color: 'from-amber-500 to-amber-600', category: 'advanced', description: 'Controlled-U gate', qubits: 2, hasParameter: true },
];

interface GateLibraryProps {
  selectedCategory?: string;
  onGateSelect?: (gate: Gate) => void;
  maxQubits?: number;
}

const GateLibrary = ({ selectedCategory = 'all', onGateSelect, maxQubits = 3 }: GateLibraryProps) => {
  const categories = {
    all: 'All Gates',
    basic: 'Basic',
    pauli: 'Pauli',
    phase: 'Phase',
    rotation: 'Rotation',
    multi: 'Multi-Qubit',
    advanced: 'Advanced'
  };

  const filteredGates = QUANTUM_GATES.filter(gate => {
    const categoryMatch = selectedCategory === 'all' || gate.category === selectedCategory;
    const qubitMatch = gate.qubits <= maxQubits;
    return categoryMatch && qubitMatch;
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredGates.map((gate) => (
          <div
            key={gate.name}
            draggable
            onClick={() => onGateSelect?.(gate)}
            className={`gate-button bg-gradient-to-r ${gate.color} group relative cursor-pointer`}
            title={gate.description}
          >
            <span className="text-sm font-bold">{gate.symbol}</span>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {gate.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GateLibrary;
