
import React, { useState } from 'react';
import BlochSphere from '../BlochSphere';
import ProbabilityChart from '../ProbabilityChart';

const HadamardSimulator = () => {
  const [qubitState, setQubitState] = useState('0');
  const [appliedH, setAppliedH] = useState(false);

  const applyHadamard = () => {
    setAppliedH(!appliedH);
  };

  const resetState = () => {
    setQubitState('0');
    setAppliedH(false);
  };

  const setInitialState = (state: string) => {
    setQubitState(state);
    setAppliedH(false);
  };

  // Calculate quantum state based on initial state and Hadamard application
  const getQuantumState = () => {
    if (!appliedH) {
      // No Hadamard applied
      const probabilities = qubitState === '0' ? { '0': 1.0, '1': 0.0 } : { '0': 0.0, '1': 1.0 };
      const blochSphere = qubitState === '0' ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
      return {
        state: `|${qubitState}⟩`,
        probabilities,
        blochSphere
      };
    } else {
      // Hadamard applied
      const probabilities = { '0': 0.5, '1': 0.5 };
      const blochSphere = qubitState === '0' ? { x: 1, y: 0, z: 0 } : { x: -1, y: 0, z: 0 };
      const stateStr = qubitState === '0' ? '(|0⟩ + |1⟩)/√2' : '(|0⟩ - |1⟩)/√2';
      return {
        state: stateStr,
        probabilities,
        blochSphere
      };
    }
  };

  const currentState = getQuantumState();

  return (
    <div className="quantum-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Hadamard Gate Simulator</h3>
        <div className="bg-gray-100 p-4 rounded-lg inline-block">
          <code className="text-lg text-blue-700 font-mono">H = (1/√2) [[1, 1], [1, -1]]</code>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setInitialState('0')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '0' && !appliedH ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |0⟩
          </button>
          <button
            onClick={() => setInitialState('1')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '1' && !appliedH ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |1⟩
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={applyHadamard}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              appliedH ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {appliedH ? 'Remove H Gate' : 'Apply H Gate'}
          </button>
          <button
            onClick={resetState}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Circuit */}
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <div className="flex items-center justify-center">
          <div className="quantum-state mr-4 font-semibold">|{qubitState}⟩</div>
          <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
          {appliedH && (
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
              H
            </div>
          )}
          <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
          <div className="quantum-state ml-4 font-semibold text-blue-700">{currentState.state}</div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Bloch Sphere</h5>
          <BlochSphere position={currentState.blochSphere} />
        </div>
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Measurement Probabilities</h5>
          <ProbabilityChart probabilities={currentState.probabilities} />
        </div>
      </div>
    </div>
  );
};

export default HadamardSimulator;
