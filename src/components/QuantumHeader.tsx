
import React from 'react';

const QuantumHeader = () => {
  return (
    <header className="quantum-gradient text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Quantum Logic Gates
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Explore the fascinating world of quantum computing through interactive simulations. 
          Learn how quantum gates manipulate qubits and create quantum phenomena.
        </p>
      </div>
    </header>
  );
};

export default QuantumHeader;
