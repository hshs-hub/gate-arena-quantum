
import React, { useState } from 'react';
import BlochSphere from '../BlochSphere';
import ProbabilityChart from '../ProbabilityChart';

const PauliXSimulator = () => {
  const [qubitState, setQubitState] = useState('0');
  const [appliedX, setAppliedX] = useState(false);

  const applyPauliX = () => {
    setAppliedX(!appliedX);
  };

  const resetState = () => {
    setQubitState('0');
    setAppliedX(false);
  };

  const setInitialState = (state: string) => {
    setQubitState(state);
    setAppliedX(false);
  };

  const getQuantumState = () => {
    let finalState = qubitState;
    if (appliedX) {
      finalState = qubitState === '0' ? '1' : '0';
    }

    const probabilities = finalState === '0' ? { '0': 1.0, '1': 0.0 } : { '0': 0.0, '1': 1.0 };
    const blochSphere = finalState === '0' ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
    
    return {
      state: `|${finalState}⟩`,
      probabilities,
      blochSphere
    };
  };

  const currentState = getQuantumState();

  return (
    <div className="quantum-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Pauli-X Gate Simulator</h3>
        <div className="bg-gray-100 p-4 rounded-lg inline-block">
          <code className="text-lg text-red-700 font-mono">X = [[0, 1], [1, 0]]</code>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setInitialState('0')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '0' && !appliedX ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |0⟩
          </button>
          <button
            onClick={() => setInitialState('1')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '1' && !appliedX ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |1⟩
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={applyPauliX}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              appliedX ? 'bg-green-500 text-white' : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {appliedX ? 'Remove X Gate' : 'Apply X Gate'}
          </button>
          <button
            onClick={resetState}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
          {appliedX && (
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg flex items-center justify-center font-bold">
              X
            </div>
          )}
          <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
          <div className="quantum-state ml-4 font-semibold text-red-700">{currentState.state}</div>
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

export default PauliXSimulator;
