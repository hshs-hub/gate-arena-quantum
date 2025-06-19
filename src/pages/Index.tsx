
import React from 'react';
import QuantumHeader from '../components/QuantumHeader';
import GateExplanation from '../components/GateExplanation';
import QuantumSimulator from '../components/QuantumSimulator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <QuantumHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hadamard Gate Section */}
        <section className="space-y-6">
          <GateExplanation 
            gateName="Hadamard Gate"
            gateSymbol="H"
            description="The Hadamard gate creates a superposition state. It transforms |0⟩ into (|0⟩ + |1⟩)/√2 and |1⟩ into (|0⟩ - |1⟩)/√2, putting the qubit into an equal probability of measuring 0 or 1."
            mathematicalNotation="H|0⟩ = (|0⟩ + |1⟩)/√2"
          />
          <QuantumSimulator gateType="hadamard" />
        </section>

        {/* CNOT Gate Section */}
        <section className="space-y-6">
          <GateExplanation 
            gateName="CNOT Gate"
            gateSymbol="⊕"
            description="The Controlled-NOT gate creates entanglement between two qubits. The control qubit determines whether to flip the target qubit. If control is |1⟩, the target qubit is flipped; if control is |0⟩, nothing happens."
            mathematicalNotation="CNOT|00⟩ = |00⟩, CNOT|10⟩ = |11⟩"
          />
          <QuantumSimulator gateType="cnot" />
        </section>
      </main>
    </div>
  );
};

export default Index;
