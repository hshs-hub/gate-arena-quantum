
import React, { useState } from 'react';
import BlochSphere from '../BlochSphere';
import ProbabilityChart from '../ProbabilityChart';

const PhaseGateSimulator = () => {
  const [qubitState, setQubitState] = useState('0');
  const [gateType, setGateType] = useState('S');
  const [appliedGate, setAppliedGate] = useState(false);

  const applyPhaseGate = () => {
    setAppliedGate(!appliedGate);
  };

  const resetState = () => {
    setQubitState('0');
    setAppliedGate(false);
  };

  const setInitialState = (state: string) => {
    setQubitState(state);
    setAppliedGate(false);
  };

  const getQuantumState = () => {
    // Phase gates don't change probabilities, only phases
    const probabilities = qubitState === '0' ? { '0': 1.0, '1': 0.0 } : { '0': 0.0, '1': 1.0 };
    
    let blochSphere;
    let stateLabel;
    
    if (qubitState === '0') {
      // Phase gates don't affect |0⟩ state
      blochSphere = { x: 0, y: 0, z: 1 };
      stateLabel = '|0⟩';
    } else {
      // Phase gates add phase to |1⟩ state
      if (!appliedGate) {
        blochSphere = { x: 0, y: 0, z: -1 };
        stateLabel = '|1⟩';
      } else {
        switch (gateType) {
          case 'S':
            blochSphere = { x: 0, y: -1, z: 0 };
            stateLabel = 'i|1⟩';
            break;
          case 'T':
            blochSphere = { x: -0.707, y: -0.707, z: 0 };
            stateLabel = 'e^(iπ/4)|1⟩';
            break;
          default:
            blochSphere = { x: 0, y: 0, z: -1 };
            stateLabel = '|1⟩';
        }
      }
    }
    
    return {
      state: stateLabel,
      probabilities,
      blochSphere
    };
  };

  const currentState = getQuantumState();

  const getGateMatrix = () => {
    switch (gateType) {
      case 'S':
        return 'S = [[1, 0], [0, i]]';
      case 'T':
        return 'T = [[1, 0], [0, e^(iπ/4)]]';
      default:
        return '';
    }
  };

  return (
    <div className="quantum-card p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interactive Phase Gate Simulator</h3>
        <div className="bg-gray-100 p-4 rounded-lg inline-block">
          <code className="text-lg text-indigo-700 font-mono">{getGateMatrix()}</code>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="text-center">
          <h6 className="font-semibold text-gray-700 mb-2">Select Phase Gate</h6>
          <div className="space-x-2">
            <button
              onClick={() => setGateType('S')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gateType === 'S' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              S Gate (π/2)
            </button>
            <button
              onClick={() => setGateType('T')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                gateType === 'T' ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              T Gate (π/4)
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setInitialState('0')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '0' && !appliedGate ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |0⟩
          </button>
          <button
            onClick={() => setInitialState('1')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              qubitState === '1' && !appliedGate ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Start with |1⟩
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={applyPhaseGate}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              appliedGate ? 'bg-green-500 text-white' : `${gateType === 'S' ? 'bg-indigo-500' : 'bg-pink-500'} text-white hover:opacity-80`
            }`}
          >
            {appliedGate ? `Remove ${gateType} Gate` : `Apply ${gateType} Gate`}
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
          {appliedGate && (
            <div className={`w-12 h-12 bg-gradient-to-r ${gateType === 'S' ? 'from-indigo-500 to-indigo-600' : 'from-pink-500 to-pink-600'} text-white rounded-lg flex items-center justify-center font-bold`}>
              {gateType}
            </div>
          )}
          <div className="qubit-wire w-32 h-1 bg-gray-800 mx-4"></div>
          <div className="quantum-state ml-4 font-semibold text-indigo-700">{currentState.state}</div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Bloch Sphere</h5>
          <BlochSphere position={currentState.blochSphere} />
          {qubitState === '0' && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Phase gates don't affect |0⟩ state
            </p>
          )}
        </div>
        <div className="quantum-card p-4">
          <h5 className="font-semibold text-gray-700 mb-2">Measurement Probabilities</h5>
          <ProbabilityChart probabilities={currentState.probabilities} />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Phase gates don't change measurement probabilities
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhaseGateSimulator;
