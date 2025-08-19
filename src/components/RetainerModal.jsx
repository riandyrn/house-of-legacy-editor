import { useRef } from 'react';
import useUIStore from '../store/useUIStore';
import useGameDataStore from '../store/useGameDataStore';

function RetainerModal() {
	const ageRef = useRef(null);
	const literatureRef = useRef(null);
	const martialRef = useRef(null);
	const commerceRef = useRef(null);
	const artRef = useRef(null);
	const strategyRef = useRef(null);
	const reputationRef = useRef(null);
	const monthlySalaryRef = useRef(null);

	const { showRetainerModal, currentRetainerIdx, closeRetainerModal } = useUIStore();
	const { setRetainer, maxRetainerAttributes, getRetainer } = useGameDataStore();

	if (!showRetainerModal) return null;

	// Get current retainer data directly from game data
	const currentRetainer = getRetainer(currentRetainerIdx);

	const handleApply = () => {
		const updateData =  {
			age: Number(ageRef.current?.value) || 0,
			literature: Number(literatureRef.current?.value) || 0,
			martial: Number(martialRef.current?.value) || 0,
			commerce: Number(commerceRef.current?.value) || 0,
			art: Number(artRef.current?.value) || 0,
			strategy: Number(strategyRef.current?.value) || 0,
			reputation: Number(reputationRef.current?.value) || 0,
			monthlySalary: Number(monthlySalaryRef.current?.value) || 0,
		};
		setRetainer(currentRetainerIdx, updateData);
		closeRetainerModal();
	};

	const handleMaxAttributes = () => {
		const maxedRetainer = maxRetainerAttributes(currentRetainer);
		// Update the form fields with maxed values
		if (ageRef.current) ageRef.current.value = maxedRetainer.age;
		if (literatureRef.current) literatureRef.current.value = maxedRetainer.literature;
		if (martialRef.current) martialRef.current.value = maxedRetainer.martial;
		if (commerceRef.current) commerceRef.current.value = maxedRetainer.commerce;
		if (artRef.current) artRef.current.value = maxedRetainer.art;
		if (strategyRef.current) strategyRef.current.value = maxedRetainer.strategy;
		if (reputationRef.current) reputationRef.current.value = maxedRetainer.reputation;
		if (monthlySalaryRef.current) monthlySalaryRef.current.value = maxedRetainer.monthlySalary;
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeRetainerModal}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">{currentRetainer.name}</h2>
						<button onClick={closeRetainerModal} className="text-gray-400 hover:text-gray-600">
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
									defaultValue={currentRetainer.age || 0} 
									min="0"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Literature</label>
								<input 
									ref={literatureRef}
									type="number" 
									defaultValue={currentRetainer.literature || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Martial</label>
								<input 
									ref={martialRef}
									type="number" 
									defaultValue={currentRetainer.martial || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Commerce</label>
								<input 
									ref={commerceRef}
									type="number" 
									defaultValue={currentRetainer.commerce || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
								</div>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<label className="text-sm text-gray-700">Art</label>
																	<input 
									ref={artRef}
									type="number" 
									defaultValue={currentRetainer.art || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Strategy</label>
								<input 
									ref={strategyRef}
									type="number" 
									defaultValue={currentRetainer.strategy || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Reputation</label>
								<input 
									ref={reputationRef}
									type="number" 
									defaultValue={currentRetainer.reputation || 0} 
									min="0"
									max="100"
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Monthly Salary</label>
								<input 
									ref={monthlySalaryRef}
									type="number" 
									defaultValue={currentRetainer.monthlySalary || 0} 
									min="0"
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

export default RetainerModal;
