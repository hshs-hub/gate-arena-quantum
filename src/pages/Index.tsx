
import React from 'react';
import QuantumHeader from '../components/QuantumHeader';
import GateExplanation from '../components/GateExplanation';
import QuantumSimulator from '../components/QuantumSimulator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <QuantumHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Comprehensive Quantum Simulator */}
        <section className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Interactive Quantum Circuit Simulator</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Explore the full spectrum of quantum gates - from basic Hadamard and Pauli gates to advanced multi-qubit operations. 
              Build complex quantum circuits and see real-time state evolution.
            </p>
          </div>
          <QuantumSimulator maxQubits={3} />
        </section>

        {/* Gate Explanations */}
        <section className="grid md:grid-cols-2 gap-8">
          
          {/* Basic Gates */}
          <GateExplanation 
            gateName="Hadamard Gate (H)"
            gateSymbol="H"
            description="The Hadamard gate creates a superposition state by rotating the qubit state vector by 180° around the axis at 45° to the X and Z axes. It transforms |0⟩ into (|0⟩ + |1⟩)/√2 and |1⟩ into (|0⟩ - |1⟩)/√2."
            mathematicalNotation="H = (1/√2) [[1, 1], [1, -1]]"
          />

          <GateExplanation 
            gateName="Pauli-X Gate"
            gateSymbol="X"
            description="The Pauli-X gate is the quantum equivalent of the classical NOT gate. It flips the qubit state: |0⟩ becomes |1⟩ and |1⟩ becomes |0⟩. It represents a 180° rotation around the X-axis of the Bloch sphere."
            mathematicalNotation="X = [[0, 1], [1, 0]]"
          />

          <GateExplanation 
            gateName="CNOT Gate"
            gateSymbol="⊕"
            description="The Controlled-NOT gate creates entanglement between two qubits. The control qubit determines whether to flip the target qubit. This gate is fundamental for creating Bell states and quantum error correction."
            mathematicalNotation="CNOT|00⟩ = |00⟩, CNOT|10⟩ = |11⟩"
          />

          <GateExplanation 
            gateName="Phase Gates (S, T)"
            gateSymbol="S/T"
            description="Phase gates add a phase shift to the |1⟩ state while leaving |0⟩ unchanged. The S gate adds π/2 phase, while T gate adds π/4 phase. These are crucial for quantum algorithms and fault-tolerant quantum computing."
            mathematicalNotation="S = [[1, 0], [0, i]], T = [[1, 0], [0, e^(iπ/4)]]"
          />

          <GateExplanation 
            gateName="Rotation Gates (Rx, Ry, Rz)"
            gateSymbol="R"
            description="Rotation gates perform arbitrary rotations around the X, Y, or Z axes of the Bloch sphere by an angle θ. These parametric gates allow precise control of qubit states and are essential for variational quantum algorithms."
            mathematicalNotation="Rx(θ) = cos(θ/2)I - i sin(θ/2)X"
          />

          <GateExplanation 
            gateName="Toffoli Gate (CCNOT)"
            gateSymbol="⊕⊕"
            description="The Toffoli gate is a 3-qubit gate that flips the target qubit only when both control qubits are |1⟩. It's universal for classical computation and essential for quantum error correction and reversible computing."
            mathematicalNotation="CCNOT|110⟩ = |111⟩, CCNOT|abc⟩ = |ab(c⊕ab)⟩"
          />

        </section>

        {/* Educational Content */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Quantum Gate Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-blue-700 mb-2">Basic Gates</h3>
              <p className="text-sm text-gray-600">Fundamental single-qubit operations including Hadamard and Identity gates.</p>
            </div>
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-red-700 mb-2">Pauli Gates</h3>
              <p className="text-sm text-gray-600">X, Y, Z gates representing rotations around Bloch sphere axes.</p>
            </div>
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-purple-700 mb-2">Phase Gates</h3>
              <p className="text-sm text-gray-600">S, T, and P gates that modify quantum phases without changing probabilities.</p>
            </div>
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-orange-700 mb-2">Rotation Gates</h3>
              <p className="text-sm text-gray-600">Parametric gates for arbitrary rotations around X, Y, Z axes.</p>
            </div>
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-green-700 mb-2">Multi-Qubit Gates</h3>
              <p className="text-sm text-gray-600">CNOT, CZ, SWAP gates that create entanglement between qubits.</p>
            </div>
            <div className="quantum-card p-4">
              <h3 className="font-semibold text-rose-700 mb-2">Advanced Gates</h3>
              <p className="text-sm text-gray-600">Toffoli and Controlled-U gates for complex quantum operations.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
