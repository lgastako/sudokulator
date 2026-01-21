import type { SavedConfiguration } from '@/hooks/useSavedConfigurations'
import { StaticSudokuConfiguration } from './StaticSudokuConfiguration'

interface SavedConfigurationsAreaProps {
  savedConfigs: SavedConfiguration[]
  newlySavedId: string | null
  onDelete: (configId: string) => void
}

export function SavedConfigurationsArea({ savedConfigs, newlySavedId, onDelete }: SavedConfigurationsAreaProps) {
  if (savedConfigs.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500 bg-gray-50 border border-gray-200 rounded-lg p-8">
        <div className="mb-2">
          Click the Save Icon{' '}
          <svg
            className="w-5 h-5 inline-block mx-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>{' '}
          above to save configurations here.
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Saved Configurations</h2>
      <div>
        {savedConfigs.map((config) => (
          <StaticSudokuConfiguration
            key={config.id}
            config={config}
            isPulsingNew={config.id === newlySavedId}
            onDelete={() => onDelete(config.id)}
          />
        ))}
      </div>
    </div>
  )
}