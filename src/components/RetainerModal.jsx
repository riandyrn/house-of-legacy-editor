function RetainerModal({ isOpen, retainer, onClose, onSave, onMaxAttributes }) {
	if (!isOpen) return null;

	const handleInputChange = (field, value) => {
		onSave({ ...retainer, [field]: Number(value) });
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">{retainer.name}</h2>
						<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
										value={retainer.age || ''} 
										onChange={(e) => handleInputChange('age', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Literature</label>
									<input 
										type="number" 
										value={retainer.literature || ''} 
										onChange={(e) => handleInputChange('literature', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Martial</label>
									<input 
										type="number" 
										value={retainer.martial || ''} 
										onChange={(e) => handleInputChange('martial', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Commerce</label>
									<input 
										type="number" 
										value={retainer.commerce || ''} 
										onChange={(e) => handleInputChange('commerce', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Art</label>
									<input 
										type="number" 
										value={retainer.art || ''} 
										onChange={(e) => handleInputChange('art', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Strategy</label>
									<input 
										type="number" 
										value={retainer.strategy || ''} 
										onChange={(e) => handleInputChange('strategy', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Reputation</label>
									<input 
										type="number" 
										value={retainer.reputation || ''} 
										onChange={(e) => handleInputChange('reputation', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Monthly Salary</label>
									<input 
										type="number" 
										value={retainer.monthlySalary || ''} 
										onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
										className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-between items-center p-6 border-t border-gray-200">
						<button onClick={onMaxAttributes} className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900">
							Max All Attributes
						</button>
						<button onClick={onClose} className="bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-900">
							Apply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RetainerModal;
