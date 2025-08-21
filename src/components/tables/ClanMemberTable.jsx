import useUIStore from '../../store/useUIStore';
import useClanMemberStore from '../../store/useClanMemberStore';
import useGameDataStore from '../../store/useGameDataStore';

function ClanMemberTable() {
	const { openClanMemberModal } = useUIStore();
	const { getClanMembersData } = useClanMemberStore();
	const { gameData } = useGameDataStore(); // Subscribe to gameData changes to trigger re-renders

	// Re-compute data when gameData changes (reactive)
	const data = gameData ? getClanMembersData() : [];

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
					{data.map((character, index) => (
						<tr key={character.name + index} className="hover:bg-gray-50">
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{character.name}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.age}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.literature}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.martial}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.commerce}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.art}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.strategy}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.reputation}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.luck}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.charm}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.health}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.talent}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.talentValue}</td>
							<td className={`px-3 py-4 whitespace-nowrap text-sm ${character.skill === 'None' ? 'text-gray-500' : 'text-gray-600'}`}>{character.skill}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{character.skillValue}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
								<button 
									onClick={() => openClanMemberModal(index)} 
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

export default ClanMemberTable;
