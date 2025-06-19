
import React, { useState } from 'react';
import CircuitBuilder from './CircuitBuilder';
import QuantumResults from './QuantumResults';

interface QuantumSimulatorProps {
  gateType: 'hadamard' | 'cnot';
}

const QuantumSimulator = ({ gateType }: QuantumSimulatorProps) => {
  const [circuit, setCircuit] = useState<any[]>([]);
  const [quantumState, setQuantumState] = useState<any>(null);

  const handleCircuitChange = (newCircuit: any[]) => {
    setCircuit(newCircuit);
    // Simulate quantum state calculation
    simulateQuantumState(newCircuit);
  };

  const simulateQuantumState = (circuitData: any[]) => {
    // Simplified quantum state simulation
    if (circuitData.length === 0) {
      setQuantumState({
        state: '|0⟩',
        probabilities: { '0': 1.0, '1': 0.0 },
        entanglement: 0,
        blochSphere: { x: 0, y: 0, z: 1 }
      });
      return;
    }

    // Simulate based on gate type
    if (gateType === 'hadamard') {
      setQuantumState({
        state: '(|0⟩ + |1⟩)/√2',
        probabilities: { '0': 0.5, '1': 0.5 },
        entanglement: 0,
        blochSphere: { x: 1, y: 0, z: 0 }
      });
    } else if (gateType === 'cnot') {
      setQuantumState({
        state: '(|00⟩ + |11⟩)/√2',
        probabilities: { '00': 0.5, '01': 0.0, '10': 0.0, '11': 0.5 },
        entanglement: 1,
        blochSphere: { x: 0, y: 0, z: 0 }
      });
    }
  };

  return (
    <div className="quantum-card p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Simulation</h3>
      
      {/* Results Section - Upper */}
      <QuantumResults quantumState={quantumState} />
      
      {/* Circuit Builder Section - Lower */}
      <CircuitBuilder 
        gateType={gateType}
        onCircuitChange={handleCircuitChange}
      />
    </div>
  );
};

export default QuantumSimulator;
