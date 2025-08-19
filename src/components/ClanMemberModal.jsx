import useUIStore from '../store/useUIStore';
import useGameDataStore from '../store/useGameDataStore';

function ClanMemberModal() {
	const {
		showClanMemberModal,
		editingClanMember,
		editingIndex,
		closeClanMemberModal,
		updateEditingClanMember
	} = useUIStore();

	const {
		saveClanMember,
		maxClanMemberAttributes
	} = useGameDataStore();

	if (!showClanMemberModal) return null;

	const handleInputChange = (field, value) => {
		const updatedCharacter = { ...editingClanMember, [field]: field === 'age' ? Number(value) : Number(value) };
		updateEditingClanMember(updatedCharacter);
	};

	const handleSave = () => {
		saveClanMember(editingClanMember, editingIndex, 'clanMembers');
		closeClanMemberModal();
	};

	const handleMaxAttributes = () => {
		const maxedCharacter = maxClanMemberAttributes(editingClanMember);
		updateEditingClanMember(maxedCharacter);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeClanMemberModal}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
											<h2 className="text-xl font-semibold text-gray-900">{editingClanMember.name}</h2>
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
										type="number" 
										value={editingClanMember.age || ''} 
										onChange={(e) => handleInputChange('age', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Literature</label>
									<input 
										type="number" 
										value={editingClanMember.literature || ''} 
										onChange={(e) => handleInputChange('literature', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Martial</label>
									<input 
										type="number" 
										value={editingClanMember.martial || ''} 
										onChange={(e) => handleInputChange('martial', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Commerce</label>
									<input 
										type="number" 
										value={editingClanMember.commerce || ''} 
										onChange={(e) => handleInputChange('commerce', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Art</label>
									<input 
										type="number" 
										value={editingClanMember.art || ''} 
										onChange={(e) => handleInputChange('art', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Strategy</label>
									<input 
										type="number" 
										value={editingClanMember.strategy || ''} 
										onChange={(e) => handleInputChange('strategy', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Reputation</label>
									<input 
										type="number" 
										value={editingClanMember.reputation || ''} 
										onChange={(e) => handleInputChange('reputation', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Luck</label>
									<input 
										type="number" 
										value={editingClanMember.luck || ''} 
										onChange={(e) => handleInputChange('luck', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Charm</label>
									<input 
										type="number" 
										value={editingClanMember.charm || ''} 
										onChange={(e) => handleInputChange('charm', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Health</label>
									<input 
										type="number" 
										value={editingClanMember.health || ''} 
										onChange={(e) => handleInputChange('health', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Talent Value</label>
									<input 
										type="number" 
										value={editingClanMember.talentValue || ''} 
										onChange={(e) => handleInputChange('talentValue', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Skill</label>
									<select 
										value={editingClanMember.skill || 'None'} 
										onChange={(e) => updateEditingClanMember({...editingClanMember, skill: e.target.value})}
										className="w-24 px-2 py-2 border border-gray-300 rounded text-center text-xs"
									>
										<option value="None">None</option>
										<option value="Medical">Medical</option>
										<option value="Craft">Craft</option>
										<option value="Martial">Martial</option>
									</select>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Skill Value</label>
									<input 
										type="number" 
										value={editingClanMember.skillValue || ''} 
										onChange={(e) => handleInputChange('skillValue', e.target.value)}
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
						<button onClick={handleSave} className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-900">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ClanMemberModal;
