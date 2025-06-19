
import React, { useState } from 'react';
import CircuitBuilder from './CircuitBuilder';
import QuantumResults from './QuantumResults';

interface Gate {
  id: string;
  type: string;
  qubit?: number;
  controlQubit?: number;
  targetQubit?: number;
  parameter?: number;
}

interface QuantumSimulatorProps {
  maxQubits?: number;
}

const QuantumSimulator = ({ maxQubits = 3 }: QuantumSimulatorProps) => {
  const [circuit, setCircuit] = useState<Gate[]>([]);
  const [quantumState, setQuantumState] = useState<any>(null);
  const [numQubits, setNumQubits] = useState(2);

  const handleCircuitChange = (newCircuit: Gate[]) => {
    setCircuit(newCircuit);
    simulateQuantumState(newCircuit);
  };

  const simulateQuantumState = (circuitData: Gate[]) => {
    if (circuitData.length === 0) {
      const initialState = '|' + '0'.repeat(numQubits) + '⟩';
      const probabilities: Record<string, number> = {};
      for (let i = 0; i < Math.pow(2, numQubits); i++) {
        const state = i.toString(2).padStart(numQubits, '0');
        probabilities[state] = i === 0 ? 1.0 : 0.0;
      }
      
      setQuantumState({
        state: initialState,
        probabilities,
        entanglement: 0,
        blochSphere: { x: 0, y: 0, z: 1 }
      });
      return;
    }

    // Enhanced simulation logic based on gates in circuit
    const hasHadamard = circuitData.some(gate => gate.type === 'H');
    const hasCNOT = circuitData.some(gate => gate.type === 'CNOT');
    const hasPauliX = circuitData.some(gate => gate.type === 'X');
    const hasPauliY = circuitData.some(gate => gate.type === 'Y');
    const hasPauliZ = circuitData.some(gate => gate.type === 'Z');

    let resultState = '';
    let probabilities: Record<string, number> = {};
    let entanglement = 0;
    let blochSphere = { x: 0, y: 0, z: 1 };

    if (hasHadamard && hasCNOT) {
      // Bell state creation
      const states = ['00', '11'];
      states.forEach(state => probabilities[state] = 0.5);
      resultState = '(|00⟩ + |11⟩)/√2';
      entanglement = 1;
      blochSphere = { x: 0, y: 0, z: 0 };
    } else if (hasHadamard) {
      // Superposition state
      if (numQubits === 1) {
        probabilities = { '0': 0.5, '1': 0.5 };
        resultState = '(|0⟩ + |1⟩)/√2';
      } else {
        for (let i = 0; i < Math.pow(2, numQubits); i++) {
          const state = i.toString(2).padStart(numQubits, '0');
          probabilities[state] = 1 / Math.pow(2, numQubits);
        }
        resultState = 'Equal superposition';
      }
      blochSphere = { x: 1, y: 0, z: 0 };
    } else if (hasPauliX) {
      // X gate flips the qubit
      probabilities = { '1': 1.0 };
      resultState = '|1⟩';
      blochSphere = { x: 0, y: 0, z: -1 };
    } else if (hasPauliY) {
      // Y gate creates complex superposition
      probabilities = { '0': 0.5, '1': 0.5 };
      resultState = 'i|1⟩';
      blochSphere = { x: 0, y: 1, z: 0 };
    } else if (hasPauliZ) {
      // Z gate adds phase
      probabilities = { '0': 1.0 };
      resultState = '|0⟩';
      blochSphere = { x: 0, y: 0, z: 1 };
    } else {
      // Default state
      const initialState = '0'.repeat(numQubits);
      probabilities[initialState] = 1.0;
      resultState = '|' + initialState + '⟩';
    }

    setQuantumState({
      state: resultState,
      probabilities,
      entanglement,
      blochSphere
    });
  };

  return (
    <div className="quantum-card p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Quantum Circuit Simulator</h3>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Qubits:</label>
          <select 
            value={numQubits} 
            onChange={(e) => setNumQubits(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
      
      <QuantumResults quantumState={quantumState} />
      <CircuitBuilder 
        numQubits={numQubits}
        onCircuitChange={handleCircuitChange}
      />
    </div>
  );
};

export default QuantumSimulator;
