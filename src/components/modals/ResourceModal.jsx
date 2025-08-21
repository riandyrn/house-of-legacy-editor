import { useRef } from 'react';
import useUIStore from '../../store/useUIStore';
import useGameDataStore from '../../store/useGameDataStore';
import ResourceUtils from '../../utils/resourceUtils';
import { maxResourceValues } from '../../constants/gameConstants';

function ResourceModal() {
	const moneyRef = useRef(null);
	const yuanbaoRef = useRef(null);
	const foodRef = useRef(null);
	const vegetablesRef = useRef(null);
	const meatRef = useRef(null);

	const { showResourceModal, closeResourceModal } = useUIStore();
	const { gameData, updateGameData } = useGameDataStore();

	if (!showResourceModal) return null;

	// Get current resource data directly from game data
	const resourceUtils = new ResourceUtils(gameData);
	const currentResource = resourceUtils.getResourcesData(); // Resources is now a single object

	const handleApply = () => {
		const updatedResource = {
			money: Number(moneyRef.current?.value) || 0,
			yuanbao: Number(yuanbaoRef.current?.value) || 0,
			food: Number(foodRef.current?.value) || 0,
			vegetables: Number(vegetablesRef.current?.value) || 0,
			meat: Number(meatRef.current?.value) || 0,
		};
		const updatedGameData = resourceUtils.setResource(updatedResource);
		updateGameData(updatedGameData);
		closeResourceModal();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeResourceModal}>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
					{/* Modal Header */}
					<div className="flex justify-between items-center p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900">Resources</h2>
						<button onClick={closeResourceModal} className="text-gray-400 hover:text-gray-600">
							<span className="material-icons">close</span>
						</button>
					</div>

					{/* Modal Body */}
					<div className="p-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Money</label>
								<input 
									ref={moneyRef}
									type="number" 
									defaultValue={currentResource?.money || 0} 
									min="0" 
									max={maxResourceValues.money}
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Yuanbao</label>
								<input 
									ref={yuanbaoRef}
									type="number" 
									defaultValue={currentResource?.yuanbao || 0} 
									min="0" 
									max={maxResourceValues.yuanbao}
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Food</label>
								<input 
									ref={foodRef}
									type="number" 
									defaultValue={currentResource?.food || 0} 
									min="0" 
									max={maxResourceValues.food}
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Vegetables</label>
								<input 
									ref={vegetablesRef}
									type="number" 
									defaultValue={currentResource?.vegetables || 0} 
									min="0" 
									max={maxResourceValues.vegetables}
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
							<div className="flex justify-between items-center">
								<label className="text-sm text-gray-700">Meat</label>
								<input 
									ref={meatRef}
									type="number" 
									defaultValue={currentResource?.meat || 0} 
									min="0" 
									max={maxResourceValues.meat}
									className="w-32 px-3 py-2 border border-gray-300 rounded text-center"
								/>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="flex justify-end items-center p-6 border-t border-gray-200 space-x-3">
						<button onClick={closeResourceModal} className="bg-gray-300 text-gray-700 px-6 py-2 rounded text-sm hover:bg-gray-400">
							Cancel
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

export default ResourceModal;
