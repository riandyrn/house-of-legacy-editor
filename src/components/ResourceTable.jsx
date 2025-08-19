function ResourceTable({ data, onEdit }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full divide-y divide-gray-200">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Money</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Yuanbao</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Food</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Vegetables</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Meat</th>
						<th className="px-3 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((resource, index) => (
						<tr key={index} className="hover:bg-gray-50">
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{(resource.money || 0).toLocaleString()}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{(resource.yuanbao || 0).toLocaleString()}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{(resource.food || 0).toLocaleString()}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{(resource.vegetables || 0).toLocaleString()}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{(resource.meat || 0).toLocaleString()}</td>
							<td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
								<button 
									onClick={() => onEdit(resource, index)} 
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

export default ResourceTable;
