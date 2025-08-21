import { useRef } from 'react';
import useUIStore from '../../store/useUIStore';
import useRetainerStore, { rangeAttrs } from '../../store/useRetainerStore';

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
	const { setRetainer, getRetainer } = useRetainerStore();

	if (!showRetainerModal) return null;

	// Get current retainer data directly from game data
	const currentRetainer = getRetainer(currentRetainerIdx);

	const handleApply = () => {
		const updateData = {
			age: Number(ageRef.current?.value) || rangeAttrs.age[0],
			literature: Number(literatureRef.current?.value) || rangeAttrs.literature[0],
			martial: Number(martialRef.current?.value) || rangeAttrs.martial[0],
			commerce: Number(commerceRef.current?.value) || rangeAttrs.commerce[0],
			art: Number(artRef.current?.value) || rangeAttrs.art[0],
			strategy: Number(strategyRef.current?.value) || rangeAttrs.strategy[0],
			reputation: Number(reputationRef.current?.value) || rangeAttrs.reputation[0],
			monthlySalary: Number(monthlySalaryRef.current?.value) || rangeAttrs.monthlySalary[0],
		};
		setRetainer(currentRetainerIdx, updateData);
		closeRetainerModal();
	};

	const handleSetBestAttributes = () => {
		// Update the form fields with best values
		// Age and salary: minimum (youngest age, lowest cost)
		// All other attributes: maximum (best performance)
		if (ageRef.current) ageRef.current.value = rangeAttrs.age[0]; // Minimum age
		if (literatureRef.current) literatureRef.current.value = rangeAttrs.literature[1]; // Maximum
		if (martialRef.current) martialRef.current.value = rangeAttrs.martial[1]; // Maximum
		if (commerceRef.current) commerceRef.current.value = rangeAttrs.commerce[1]; // Maximum
		if (artRef.current) artRef.current.value = rangeAttrs.art[1]; // Maximum
		if (strategyRef.current) strategyRef.current.value = rangeAttrs.strategy[1]; // Maximum
		if (reputationRef.current) reputationRef.current.value = rangeAttrs.reputation[1]; // Maximum
		if (monthlySalaryRef.current) monthlySalaryRef.current.value = rangeAttrs.monthlySalary[0]; // Minimum salary
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
									defaultValue={currentRetainer.age || rangeAttrs.age[0]} 
									min={rangeAttrs.age[0]}
									max={rangeAttrs.age[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Literature</label>
								<input 
									ref={literatureRef}
									type="number" 
									defaultValue={currentRetainer.literature || rangeAttrs.literature[0]} 
									min={rangeAttrs.literature[0]}
									max={rangeAttrs.literature[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Martial</label>
								<input 
									ref={martialRef}
									type="number" 
									defaultValue={currentRetainer.martial || rangeAttrs.martial[0]} 
									min={rangeAttrs.martial[0]}
									max={rangeAttrs.martial[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Commerce</label>
								<input 
									ref={commerceRef}
									type="number" 
									defaultValue={currentRetainer.commerce || rangeAttrs.commerce[0]} 
									min={rangeAttrs.commerce[0]}
									max={rangeAttrs.commerce[1]}
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
									defaultValue={currentRetainer.art || rangeAttrs.art[0]} 
									min={rangeAttrs.art[0]}
									max={rangeAttrs.art[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Strategy</label>
								<input 
									ref={strategyRef}
									type="number" 
									defaultValue={currentRetainer.strategy || rangeAttrs.strategy[0]} 
									min={rangeAttrs.strategy[0]}
									max={rangeAttrs.strategy[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Reputation</label>
								<input 
									ref={reputationRef}
									type="number" 
									defaultValue={currentRetainer.reputation || rangeAttrs.reputation[0]} 
									min={rangeAttrs.reputation[0]}
									max={rangeAttrs.reputation[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Monthly Salary</label>
								<input 
									ref={monthlySalaryRef}
									type="number" 
									defaultValue={currentRetainer.monthlySalary || rangeAttrs.monthlySalary[0]} 
									min={rangeAttrs.monthlySalary[0]}
									max={rangeAttrs.monthlySalary[1]}
									className="w-24 px-3 py-2 border border-gray-300 rounded text-center"
								/>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-between items-center p-6 border-t border-gray-200">
						<button onClick={handleSetBestAttributes} className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900">
							Set Best Attributes
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
