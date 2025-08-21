import ClanMemberTable from '../tables/ClanMemberTable';
import SpouseTable from '../tables/SpouseTable';
import RetainerTable from '../tables/RetainerTable';
import ResourceTable from '../tables/ResourceTable';
import ClanMemberModal from '../modals/ClanMemberModal';
import SpouseModal from '../modals/SpouseModal';
import RetainerModal from '../modals/RetainerModal';
import ResourceModal from '../modals/ResourceModal';
import useUIStore from '../../store/useUIStore';
import useGameDataStore from '../../store/useGameDataStore';
import ClanMemberUtils from '../../utils/clanMemberUtils';
import SpouseUtils from '../../utils/spouseUtils';
import RetainerUtils from '../../utils/retainerUtils';
import ResourceUtils from '../../utils/resourceUtils';

function EditorContent() {
	// UI Store
	const {
		activeTab,
		selectedSkill,
		setActiveTab,
		setSelectedSkill
	} = useUIStore();

	// Game Data Store
	const { gameData, updateGameData } = useGameDataStore();

	// Helper functions to handle tab-specific operations
	const applySkillToNone = (activeTab, selectedSkill) => {
		if (activeTab === 'clanMembers') {
			const clanMemberUtils = new ClanMemberUtils(gameData);
			const updatedGameData = clanMemberUtils.applyClanMembersSkillToNone(selectedSkill);
			updateGameData(updatedGameData);
		} else if (activeTab === 'spouses') {
			const spouseUtils = new SpouseUtils(gameData);
			const updatedGameData = spouseUtils.applySpousesSkillToNone(selectedSkill);
			updateGameData(updatedGameData);
		}
	};

	const maxAllAttributes = (activeTab) => {
		if (activeTab === 'clanMembers') {
			const clanMemberUtils = new ClanMemberUtils(gameData);
			const updatedGameData = clanMemberUtils.maxAllClanMemberAttributes();
			updateGameData(updatedGameData);
		} else if (activeTab === 'spouses') {
			const spouseUtils = new SpouseUtils(gameData);
			const updatedGameData = spouseUtils.maxAllSpouseAttributes();
			updateGameData(updatedGameData);
		}
	};

	const handleAllRetainersBestAttributes = () => {
		const retainerUtils = new RetainerUtils(gameData);
		const updatedGameData = retainerUtils.allRetainersBestAttributes();
		updateGameData(updatedGameData);
	};

	const handleMaxAllFinance = () => {
		const resourceUtils = new ResourceUtils(gameData);
		const updatedGameData = resourceUtils.maxAllFinance();
		updateGameData(updatedGameData);
	};

	const handleMaxAllResources = () => {
		const resourceUtils = new ResourceUtils(gameData);
		const updatedGameData = resourceUtils.maxAllResources();
		updateGameData(updatedGameData);
	};

	return (
		<main className="bg-white rounded-lg shadow-lg p-6 mt-4">
			<div className="border-b border-gray-200 mb-4">
				<div className="flex justify-between items-end">
					<nav aria-label="Tabs" className="-mb-px flex space-x-8">
						{['clanMembers', 'spouses', 'retainers', 'financeResources'].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base ${activeTab === tab
									? 'border-gray-800 text-gray-900'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
									}`}
							>
								{tab === 'clanMembers' ? 'Clan Members' :
									tab === 'spouses' ? 'Spouses' :
										tab === 'retainers' ? 'Retainers' : 'Finance & Resources'}
							</button>
						))}
					</nav>
					{/* Clan Members Tab Buttons */}
					{activeTab === 'clanMembers' && (
						<div className="flex items-center space-x-4 py-4">
							<div className="flex items-center space-x-2">
								<label className="text-sm font-medium text-gray-700">Set None Skills to:</label>
								<select
									value={selectedSkill}
									onChange={(e) => setSelectedSkill(e.target.value)}
									className="w-36 py-1 px-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
								>
									<option value="Witch">Witch</option>
									<option value="Medical">Medical</option>
									<option value="Fortune">Fortune</option>
									<option value="Divination">Divination</option>
									<option value="Charm">Charm</option>
									<option value="Craft">Craft</option>
								</select>
								<button onClick={() => applySkillToNone(activeTab, selectedSkill)} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">Apply</button>
							</div>
							<div className="text-gray-300 text-sm">|</div>
							<button onClick={() => maxAllAttributes(activeTab)} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
								Max All Attributes
							</button>
						</div>
					)}

					{/* Spouses Tab Buttons */}
					{activeTab === 'spouses' && (
						<div className="flex items-center space-x-4 py-4">
							<div className="flex items-center space-x-2">
								<label className="text-sm font-medium text-gray-700">Set None Skills to:</label>
								<select
									value={selectedSkill}
									onChange={(e) => setSelectedSkill(e.target.value)}
									className="w-36 py-1 px-2 text-sm rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
								>
									<option value="Witch">Witch</option>
									<option value="Medical">Medical</option>
									<option value="Fortune">Fortune</option>
									<option value="Divination">Divination</option>
									<option value="Charm">Charm</option>
									<option value="Craft">Craft</option>
								</select>
								<button onClick={() => applySkillToNone(activeTab, selectedSkill)} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">Apply</button>
							</div>
							<div className="text-gray-300 text-sm">|</div>
							<button onClick={() => maxAllAttributes(activeTab)} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
								Max All Attributes
							</button>
						</div>
					)}

					{/* Retainers Tab Buttons */}
					{activeTab === 'retainers' && (
						<div className="flex items-center space-x-4 py-4">
							<button onClick={handleAllRetainersBestAttributes} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
								All Best Attributes
							</button>
						</div>
					)}

					{/* Resources Tab Buttons */}
					{activeTab === 'financeResources' && (
						<div className="flex items-center space-x-2 py-4">
							<div className="flex items-center">
								<button onClick={handleMaxAllFinance} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
									Max All Finance
								</button>
							</div>
							<div className="text-gray-300 text-sm">|</div>
							<div className="flex items-center">
								<button onClick={handleMaxAllResources} className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
									Max All Resources
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Characters Table (Clan Members) */}
			{activeTab === 'clanMembers' && (
				<ClanMemberTable />
			)}

			{/* Spouses Table */}
			{activeTab === 'spouses' && (
				<SpouseTable />
			)}

			{/* Retainers Table */}
			{activeTab === 'retainers' && (
				<RetainerTable />
			)}

			{/* Finance & Resources Table */}
			{activeTab === 'financeResources' && (
				<ResourceTable />
			)}

			{/* Clan Member Modal */}
			<ClanMemberModal />

			{/* Spouse Modal */}
			<SpouseModal />

			{/* Retainer Modal */}
			<RetainerModal />

			{/* Resource Modal */}
			<ResourceModal />
		</main>
	);
}

export default EditorContent;
