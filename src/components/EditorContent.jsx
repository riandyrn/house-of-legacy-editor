import CharacterTable from './CharacterTable';
import RetainerTable from './RetainerTable';
import ResourceTable from './ResourceTable';
import CharacterModal from './CharacterModal';
import RetainerModal from './RetainerModal';
import ResourceModal from './ResourceModal';
import useAppStore from '../store/useAppStore';

function EditorContent() {
	const {
		// State
		activeTab,
		selectedSkill,
		
		// Modal state
		showCharacterModal,
		showRetainerModal, 
		editingCharacter,
		editingRetainer,
		
		// Actions
		setActiveTab,
		setSelectedSkill,
		getCurrentData,
		applySkillToNone,
		maxAllAttributes,
		maxAllResources,
		
		// Character modal actions
		openCharacterModal,
		closeCharacterModal,
		saveCharacter,
		maxCharacterAttributes,
		
		// Retainer modal actions
		openRetainerModal,
		closeRetainerModal,
		saveRetainer,
		maxRetainerAttributes
	} = useAppStore();
	
	const showSkillsSelector = activeTab === 'clanMembers' || activeTab === 'spouses';
	const maxButtonText = activeTab === 'resources' ? 'Max All Resources' : 'Max All Attributes';
	const handleMaxAllClick = () => {
		if (activeTab === 'resources') {
			maxAllResources();
		} else {
			maxAllAttributes();
		}
	};


	return (
		<main className="bg-white rounded-lg shadow-lg p-6 mt-4">
			<div className="border-b border-gray-200 mb-4">
				<div className="flex justify-between items-end">
					<nav aria-label="Tabs" className="-mb-px flex space-x-8">
						{['clanMembers', 'spouses', 'retainers', 'resources'].map((tab) => (
							<button 
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${
									activeTab === tab 
										? 'border-gray-800 text-gray-900' 
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{tab === 'clanMembers' ? 'Clan Members' : 
								 tab === 'spouses' ? 'Spouses' :
								 tab === 'retainers' ? 'Retainers' : 'Resources'}
							</button>
						))}
					</nav>
					<div className="flex items-center space-x-4 py-4">
						{showSkillsSelector && (
							<>
								<div className="flex items-center space-x-2">
									<label className="text-sm font-medium text-gray-700">Set None Skills to:</label>
									<select 
										value={selectedSkill} 
										onChange={(e) => setSelectedSkill(e.target.value)}
										className="w-36 py-1 px-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
									>
										<option value="Medical">Medical</option>
										<option value="Craft">Craft</option>
										<option value="Martial">Martial</option>
									</select>
									<button onClick={applySkillToNone} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">Apply</button>
								</div>
								<div className="text-gray-300 text-sm">|</div>
							</>
						)}
						<button onClick={handleMaxAllClick} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
							{maxButtonText}
						</button>
					</div>
				</div>
			</div>

			{/* Characters Table (Clan Members & Spouses) */}
			{(activeTab === 'clanMembers' || activeTab === 'spouses') && (
				<CharacterTable data={getCurrentData()} onEdit={openCharacterModal} />
			)}

			{/* Retainers Table */}
			{activeTab === 'retainers' && (
				<RetainerTable data={getCurrentData()} onEdit={openRetainerModal} />
			)}

			{/* Resources Table */}
			{activeTab === 'resources' && (
				<ResourceTable />
			)}

			{/* Character Modal */}
			<CharacterModal 
				isOpen={showCharacterModal}
				character={editingCharacter}
				onClose={closeCharacterModal}
				onSave={saveCharacter}
				onMaxAttributes={maxCharacterAttributes}
			/>

			{/* Retainer Modal */}
			<RetainerModal 
				isOpen={showRetainerModal}
				retainer={editingRetainer}
				onClose={closeRetainerModal}
				onSave={saveRetainer}
				onMaxAttributes={maxRetainerAttributes}
			/>

			{/* Resource Modal */}
			<ResourceModal />
		</main>
	);
}

export default EditorContent;
