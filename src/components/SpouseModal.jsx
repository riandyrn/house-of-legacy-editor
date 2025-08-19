import { useRef } from 'react';
import useUIStore from '../store/useUIStore';
import useGameDataStore from '../store/useGameDataStore';

function SpouseModal() {
	const ageRef = useRef(null);
	const literatureRef = useRef(null);
	const martialRef = useRef(null);
	const commerceRef = useRef(null);
	const artRef = useRef(null);
	const strategyRef = useRef(null);
	const reputationRef = useRef(null);
	const luckRef = useRef(null);
	const charmRef = useRef(null);
	const healthRef = useRef(null);
	const talentValueRef = useRef(null);
	const skillRef = useRef(null);
	const skillValueRef = useRef(null);

	const { showSpouseModal, currentSpouseIdx, closeSpouseModal } = useUIStore();
	const { setSpouse, getSpouse } = useGameDataStore();

	if (!showSpouseModal) return null;

	// Get current spouse data directly from game data
	const currentSpouse = getSpouse(currentSpouseIdx);

	const handleApply = () => {
		const updateData = {
			age: Number(ageRef.current?.value) || 18,
			literature: Number(literatureRef.current?.value) || 0,
			martial: Number(martialRef.current?.value) || 0,
			commerce: Number(commerceRef.current?.value) || 0,
			art: Number(artRef.current?.value) || 0,
			strategy: Number(strategyRef.current?.value) || 0,
			reputation: Number(reputationRef.current?.value) || 0,
			luck: Number(luckRef.current?.value) || 0,
			charm: Number(charmRef.current?.value) || 0,
			health: Number(healthRef.current?.value) || 0,
			talentValue: Number(talentValueRef.current?.value) || 0,
			skill: skillRef.current?.value || 'None',
			skillValue: Number(skillValueRef.current?.value) || 0,
		};
		setSpouse(currentSpouseIdx, updateData);
		closeSpouseModal();
	};

	const handleMaxAttributes = () => {
		// Update the form fields with maximum values
		if (ageRef.current) ageRef.current.value = 18; // Minimum age
		if (literatureRef.current) literatureRef.current.value = 100; // Maximum
		if (martialRef.current) martialRef.current.value = 100; // Maximum
		if (commerceRef.current) commerceRef.current.value = 100; // Maximum
		if (artRef.current) artRef.current.value = 100; // Maximum
		if (strategyRef.current) strategyRef.current.value = 100; // Maximum
		if (reputationRef.current) reputationRef.current.value = 100; // Maximum
		if (luckRef.current) luckRef.current.value = 100; // Maximum
		if (charmRef.current) charmRef.current.value = 100; // Maximum
		if (healthRef.current) healthRef.current.value = 100; // Maximum
		if (talentValueRef.current) talentValueRef.current.value = 100; // Maximum
		if (skillValueRef.current) skillValueRef.current.value = 100; // Maximum
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeSpouseModal}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">{currentSpouse.name}</h2>
						<button onClick={closeSpouseModal} className="text-gray-400 hover:text-gray-600">
							<span className="material-icons">close</span>
						</button>
					</div>
					
					{/* Modal Body */}
					<div className="p-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Age</label>
									<input 
										ref={ageRef}
										type="number" 
										defaultValue={currentSpouse.age || 18} 
										min="18"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Literature</label>
									<input 
										ref={literatureRef}
										type="number" 
										defaultValue={currentSpouse.literature || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Martial</label>
									<input 
										ref={martialRef}
										type="number" 
										defaultValue={currentSpouse.martial || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Commerce</label>
									<input 
										ref={commerceRef}
										type="number" 
										defaultValue={currentSpouse.commerce || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Art</label>
									<input 
										ref={artRef}
										type="number" 
										defaultValue={currentSpouse.art || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Strategy</label>
									<input 
										ref={strategyRef}
										type="number" 
										defaultValue={currentSpouse.strategy || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Reputation</label>
									<input 
										ref={reputationRef}
										type="number" 
										defaultValue={currentSpouse.reputation || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Luck</label>
									<input 
										ref={luckRef}
										type="number" 
										defaultValue={currentSpouse.luck || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Charm</label>
									<input 
										ref={charmRef}
										type="number" 
										defaultValue={currentSpouse.charm || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Health</label>
									<input 
										ref={healthRef}
										type="number" 
										defaultValue={currentSpouse.health || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Talent Value</label>
									<input 
										ref={talentValueRef}
										type="number" 
										defaultValue={currentSpouse.talentValue || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Skill</label>
									<select 
										ref={skillRef}
										defaultValue={currentSpouse.skill || 'None'} 
										className="w-32 px-2 py-2 border border-gray-300 rounded text-center text-xs"
									>
										<option value="None">None</option>
										<option value="Witch">Witch</option>
										<option value="Medical">Medical</option>
										<option value="Fortune">Fortune</option>
										<option value="Divination">Divination</option>
										<option value="Charm">Charm</option>
										<option value="Craft">Craft</option>
									</select>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Skill Value</label>
									<input 
										ref={skillValueRef}
										type="number" 
										defaultValue={currentSpouse.skillValue || 0} 
										min="0"
										max="100"
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-between items-center p-6 border-t border-gray-200">
						<button onClick={handleMaxAttributes} className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900">
							Max All Attributes
						</button>
						<button onClick={handleApply} className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-900">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SpouseModal;
