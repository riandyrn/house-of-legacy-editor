function ResourceModal({ isOpen, resource, onClose, onSave }) {
	if (!isOpen) return null;

	const handleInputChange = (field, value) => {
		onSave({ ...resource, [field]: Number(value) || 0 });
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Resources</h2>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
							<span className="material-icons">close</span>
						</button>
					</div>

					{/* Modal Body */}
					<div className="p-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Money</label>
								<input 
									type="number" 
									value={resource.money || ''} 
									onChange={(e) => handleInputChange('money', e.target.value)}
									min="0" 
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Yuanbao</label>
								<input 
									type="number" 
									value={resource.yuanbao || ''} 
									onChange={(e) => handleInputChange('yuanbao', e.target.value)}
									min="0" 
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Food</label>
								<input 
									type="number" 
									value={resource.food || ''} 
									onChange={(e) => handleInputChange('food', e.target.value)}
									min="0" 
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Vegetables</label>
								<input 
									type="number" 
									value={resource.vegetables || ''} 
									onChange={(e) => handleInputChange('vegetables', e.target.value)}
									min="0" 
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Meat</label>
								<input 
									type="number" 
									value={resource.meat || ''} 
									onChange={(e) => handleInputChange('meat', e.target.value)}
									min="0" 
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-end items-center p-6 border-t border-gray-200">
						<button onClick={onClose} className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-900">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResourceModal;
