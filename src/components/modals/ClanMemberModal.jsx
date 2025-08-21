import { useRef } from 'react';
import useUIStore from '../../store/useUIStore';
import useGameDataStore from '../../store/useGameDataStore';
import ClanMemberUtils from '../../utils/clanMemberUtils';
import { rangeAttrs } from '../../constants/gameConstants';

function ClanMemberModal() {
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

	const { showClanMemberModal, currentClanMemberIdx, closeClanMemberModal } = useUIStore();
	const { gameData, updateGameData } = useGameDataStore();

	if (!showClanMemberModal) return null;

	// Get current clan member data directly from game data
	const clanMemberUtils = new ClanMemberUtils(gameData);
	const currentClanMember = clanMemberUtils.getClanMember(currentClanMemberIdx);

	const handleApply = () => {
		const updateData = {
			age: Number(ageRef.current?.value) || rangeAttrs.age[0],
			literature: Number(literatureRef.current?.value) || rangeAttrs.literature[0],
			martial: Number(martialRef.current?.value) || rangeAttrs.martial[0],
			commerce: Number(commerceRef.current?.value) || rangeAttrs.commerce[0],
			art: Number(artRef.current?.value) || rangeAttrs.art[0],
			strategy: Number(strategyRef.current?.value) || rangeAttrs.strategy[0],
			reputation: Number(reputationRef.current?.value) || rangeAttrs.reputation[0],
			luck: Number(luckRef.current?.value) || rangeAttrs.luck[0],
			charm: Number(charmRef.current?.value) || rangeAttrs.charm[0],
			health: Number(healthRef.current?.value) || rangeAttrs.health[0],
			talentValue: Number(talentValueRef.current?.value) || rangeAttrs.talentValue[0],
			skill: skillRef.current?.value || 'None',
			skillValue: Number(skillValueRef.current?.value) || rangeAttrs.skillValue[0],
		};
		const updatedGameData = clanMemberUtils.setClanMember(currentClanMemberIdx, updateData);
		updateGameData(updatedGameData);
		closeClanMemberModal();
	};

	const handleMaxAttributes = () => {
		// Update the form fields with maximum values from rangeAttrs
		if (literatureRef.current) literatureRef.current.value = rangeAttrs.literature[1]; // Maximum
		if (martialRef.current) martialRef.current.value = rangeAttrs.martial[1]; // Maximum
		if (commerceRef.current) commerceRef.current.value = rangeAttrs.commerce[1]; // Maximum
		if (artRef.current) artRef.current.value = rangeAttrs.art[1]; // Maximum
		if (strategyRef.current) strategyRef.current.value = rangeAttrs.strategy[1]; // Maximum
		if (reputationRef.current) reputationRef.current.value = rangeAttrs.reputation[1]; // Maximum
		if (luckRef.current) luckRef.current.value = rangeAttrs.luck[1]; // Maximum
		if (charmRef.current) charmRef.current.value = rangeAttrs.charm[1]; // Maximum
		if (healthRef.current) healthRef.current.value = rangeAttrs.health[1]; // Maximum
		if (talentValueRef.current) talentValueRef.current.value = rangeAttrs.talentValue[1]; // Maximum
		if (skillValueRef.current) skillValueRef.current.value = rangeAttrs.skillValue[1]; // Maximum
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeClanMemberModal}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">{currentClanMember.name}</h2>
						<button onClick={closeClanMemberModal} className="text-gray-400 hover:text-gray-600">
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
										defaultValue={currentClanMember.age || rangeAttrs.age[0]}
										min={rangeAttrs.age[0]}
										max={rangeAttrs.age[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Literature</label>
									<input
										ref={literatureRef}
										type="number"
										defaultValue={currentClanMember.literature || rangeAttrs.literature[0]}
										min={rangeAttrs.literature[0]}
										max={rangeAttrs.literature[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Martial</label>
									<input
										type="number"
										ref={martialRef}
										defaultValue={currentClanMember.martial || rangeAttrs.martial[0]}
										min={rangeAttrs.martial[0]}
										max={rangeAttrs.martial[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Commerce</label>
									<input
										type="number"
										ref={commerceRef}
										defaultValue={currentClanMember.commerce || rangeAttrs.commerce[0]}
										min={rangeAttrs.commerce[0]}
										max={rangeAttrs.commerce[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Art</label>
									<input
										type="number"
										ref={artRef}
										defaultValue={currentClanMember.art || rangeAttrs.art[0]}
										min={rangeAttrs.art[0]}
										max={rangeAttrs.art[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Strategy</label>
									<input
										type="number"
										ref={strategyRef}
										defaultValue={currentClanMember.strategy || rangeAttrs.strategy[0]}
										min={rangeAttrs.strategy[0]}
										max={rangeAttrs.strategy[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Reputation</label>
									<input
										type="number"
										ref={reputationRef}
										defaultValue={currentClanMember.reputation || rangeAttrs.reputation[0]}
										min={rangeAttrs.reputation[0]}
										max={rangeAttrs.reputation[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Luck</label>
									<input
										type="number"
										ref={luckRef}
										defaultValue={currentClanMember.luck || rangeAttrs.luck[0]}
										min={rangeAttrs.luck[0]}
										max={rangeAttrs.luck[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Charm</label>
									<input
										type="number"
										ref={charmRef}
										defaultValue={currentClanMember.charm || rangeAttrs.charm[0]}
										min={rangeAttrs.charm[0]}
										max={rangeAttrs.charm[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Health</label>
									<input
										type="number"
										ref={healthRef}
										defaultValue={currentClanMember.health || rangeAttrs.health[0]}
										min={rangeAttrs.health[0]}
										max={rangeAttrs.health[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Talent Value</label>
									<input
										type="number"
										ref={talentValueRef}
										defaultValue={currentClanMember.talentValue || rangeAttrs.talentValue[0]}
										min={rangeAttrs.talentValue[0]}
										max={rangeAttrs.talentValue[1]}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Skill</label>
									<select
										ref={skillRef}
										defaultValue={currentClanMember.skill || 'None'}
										className="w-24 px-2 py-2 border border-gray-300 rounded text-center text-xs"
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
										type="number"
										ref={skillValueRef}
										defaultValue={currentClanMember.skillValue || rangeAttrs.skillValue[0]}
										min={rangeAttrs.skillValue[0]}
										max={rangeAttrs.skillValue[1]}
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

export default ClanMemberModal;
