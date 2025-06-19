
import React from 'react';
import QuantumHeader from '../components/QuantumHeader';
import HadamardSimulator from '../components/simulators/HadamardSimulator';
import PauliXSimulator from '../components/simulators/PauliXSimulator';
import CNOTSimulator from '../components/simulators/CNOTSimulator';
import PhaseGateSimulator from '../components/simulators/PhaseGateSimulator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <QuantumHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-16">
        
        {/* Hadamard Gate Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Hadamard Gate (H)</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Hadamard gate creates a superposition state by rotating the qubit state vector by 180° around the axis at 45° to the X and Z axes. 
              It transforms |0⟩ into (|0⟩ + |1⟩)/√2 and |1⟩ into (|0⟩ - |1⟩)/√2.
            </p>
          </div>
          <HadamardSimulator />
        </section>

        {/* Pauli-X Gate Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Pauli-X Gate (NOT Gate)</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Pauli-X gate is the quantum equivalent of the classical NOT gate. It flips the qubit state: |0⟩ becomes |1⟩ and |1⟩ becomes |0⟩. 
              It represents a 180° rotation around the X-axis of the Bloch sphere.
            </p>
          </div>
          <PauliXSimulator />
        </section>

        {/* CNOT Gate Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">CNOT Gate (Controlled-NOT)</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Controlled-NOT gate creates entanglement between two qubits. The control qubit determines whether to flip the target qubit. 
              This gate is fundamental for creating Bell states and quantum error correction.
            </p>
          </div>
          <CNOTSimulator />
        </section>

        {/* Phase Gates Section */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Phase Gates (S, T)</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Phase gates add a phase shift to the |1⟩ state while leaving |0⟩ unchanged. The S gate adds π/2 phase, while T gate adds π/4 phase. 
              These are crucial for quantum algorithms and fault-tolerant quantum computing.
            </p>
          </div>
          <PhaseGateSimulator />
        </section>

      </main>
    </div>
  );
};

export default Index;
