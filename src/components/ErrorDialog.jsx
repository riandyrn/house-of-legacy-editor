import useUIStore from '../store/useUIStore';

function ErrorDialog() {
	const { showErrorDialog, errorMessage, closeErrorDialog } = useUIStore();

	if (!showErrorDialog) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
				<div className="flex items-center mb-4">
					<span className="material-icons text-red-500 text-2xl mr-3">error</span>
					<h2 className="text-lg font-semibold text-gray-900">Error</h2>
				</div>
				
				<div className="mb-6">
					<p className="text-gray-700 whitespace-pre-line leading-relaxed">
						{errorMessage}
					</p>
				</div>
				
				<div className="flex justify-end">
					<button 
						onClick={closeErrorDialog}
						className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg transition-colors"
					>
						OK
					</button>
				</div>
			</div>
		</div>
	);
}

export default ErrorDialog;
