
import React from 'react';
import BlochSphere from './BlochSphere';
import ProbabilityChart from './ProbabilityChart';

interface QuantumResultsProps {
  quantumState: any;
}

const QuantumResults = ({ quantumState }: QuantumResultsProps) => {
  if (!quantumState) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
        <p className="text-center text-gray-500">
          Build a circuit below to see quantum state results
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Quantum State Results</h4>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quantum State Display */}
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Current State</h5>
          <div className="quantum-state text-lg text-blue-700">
            {quantumState.state}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Entanglement: {quantumState.entanglement}
          </div>
        </div>

        {/* Bloch Sphere Visualization */}
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Bloch Sphere</h5>
          <BlochSphere position={quantumState.blochSphere} />
        </div>

        {/* Measurement Probabilities */}
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Measurement Probabilities</h5>
          <ProbabilityChart probabilities={quantumState.probabilities} />
        </div>
      </div>
    </div>
  );
};

export default QuantumResults;
