import useUIStore from '../../store/useUIStore';
import useRetainerStore from '../../store/useRetainerStore';
import useGameDataStore from '../../store/useGameDataStore';

function RetainerTable() {
	const { openRetainerModal } = useUIStore();
	const { getRetainersData } = useRetainerStore();
	const { gameData } = useGameDataStore(); // Subscribe to gameData changes to trigger re-renders
	
	// Re-compute data when gameData changes (reactive)
	const data = gameData ? getRetainersData() : [];

	return (
		<div className="overflow-x-auto">
			<table className="w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Age</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Literature</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Martial</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Commerce</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Art</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Strategy</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Reputation</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Monthly Salary</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((retainer) => (
						<tr key={retainer.name + retainer.retainerIdx} className="hover:bg-gray-50">
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{retainer.name}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.age}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.literature}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.martial}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.commerce}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.art}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.strategy}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.reputation}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{retainer.monthlySalary}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
								<button 
									onClick={() => openRetainerModal(retainer.retainerIdx)} 
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

export default RetainerTable;
