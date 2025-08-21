import useUIStore from '../../store/useUIStore';
import useGameDataStore from '../../store/useGameDataStore';
import SpouseUtils from '../../utils/spouseUtils';

function SpouseTable() {
	const { openSpouseModal } = useUIStore();
	const { gameData } = useGameDataStore(); // Subscribe to gameData changes
	
	const spouseUtils = new SpouseUtils(gameData);
	const spousesData = spouseUtils.getSpousesData();

	return (
		<div className="overflow-x-auto">
			<table className="w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Lit.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Mar.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Com.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Art</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Strat.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rep.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Luck</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Charm</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Health</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Talent</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Talent Val.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Skill</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Skill Val.</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{spousesData.map((spouse, index) => (
						<tr key={spouse.name + index} className="hover:bg-gray-50">
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{spouse.name}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.age}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.literature}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.martial}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.commerce}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.art}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.strategy}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.reputation}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.luck}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.charm}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.health}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.talent}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.talentValue}</td>
							<td className={`px-3 py-4 whitespace-nowrap text-sm ${spouse.skill === 'None' ? 'text-gray-500' : 'text-gray-600'}`}>{spouse.skill}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{spouse.skillValue}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
								<button 
									onClick={() => openSpouseModal(index)} 
									className="text-gray-800 hover:text-gray-900 underline hover:no-underline cursor-pointer"
								>
									Edit
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default SpouseTable;
