'use client';

const statsData = [
	{ value: '127', label: 'Trajets sûrs', color: 'primary' },
	{ value: '99.8%', label: 'Fiabilité', color: 'secondary' },
	{ value: '2.4s', label: 'Réponse IA', color: 'accent' },
];

const activities = [
	{
		message: 'Trajet sécurisé - Marie D.',
		time: 'Il y a 2 minutes',
		status: 'success',
	},
	{
		message: 'Alerte évitée - Thomas L.',
		time: 'Il y a 5 minutes',
		status: 'info',
	},
];

export default function InteractiveDashboard() {
	return (
		<div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 dark:from-gray-800/95 dark:to-gray-900/95 rounded-3xl overflow-hidden shadow-2xl border border-gray-600/30 dark:border-gray-500/30 backdrop-blur-xl">
			<div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 dark:border-gray-400/20">
				<div className="space-y-6">
					{/* Header */}
					<div className="flex items-center justify-between">
						<h4 className="text-white dark:text-gray-100 font-bold">
							Dashboard Temps Réel
						</h4>
						<div className="flex items-center space-x-2">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							<span className="text-green-400 text-sm">ACTIF</span>
						</div>
					</div>

					{/* Mini stats */}
					<div className="grid grid-cols-3 gap-4">
						{statsData.map(stat => (
							<div
								key={stat.label}
								className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-3 border border-white/10 dark:border-gray-600/20 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors duration-300"
							>
								<div
									className={`text-2xl font-bold ${
										stat.color === 'primary'
											? 'text-blue-400 dark:text-blue-300'
											: stat.color === 'secondary'
											? 'text-indigo-400 dark:text-indigo-300'
											: 'text-purple-400 dark:text-purple-300'
									}`}
								>
									{stat.value}
								</div>
								<div className="text-xs text-white/70 dark:text-gray-300/70">
									{stat.label}
								</div>
							</div>
						))}
					</div>

					{/* Live activity */}
					<div className="space-y-3">
						<h5 className="text-white/90 dark:text-gray-200 text-sm font-medium mb-3">
							Activité récente
						</h5>
						{activities.map((activity, index) => (
							<div
								key={index}
								className="flex items-start bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 border border-white/10 dark:border-gray-600/20 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors duration-300"
							>
								<div
									className={`w-3 h-3 rounded-full mr-3 mt-1 ${
										activity.status === 'success'
											? 'bg-green-400 animate-pulse'
											: 'bg-blue-400 dark:bg-blue-300'
									}`}
								></div>
								<div className="flex-1">
									<div className="text-white dark:text-gray-100 text-sm">
										{activity.message}
									</div>
									<div className="text-white/60 dark:text-gray-400 text-xs">
										{activity.time}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Progress indicator */}
					<div className="mt-6 p-3 bg-white/5 dark:bg-gray-800/20 rounded-xl border border-white/10 dark:border-gray-600/20">
						<div className="flex items-center justify-between mb-2">
							<span className="text-white/90 dark:text-gray-200 text-sm">
								Sécurité globale
							</span>
							<span className="text-green-400 text-sm font-bold">98.7%</span>
						</div>
						<div className="w-full bg-white/10 dark:bg-gray-700/30 rounded-full h-2">
							<div
								className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-1000"
								style={{ width: '98.7%' }}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
