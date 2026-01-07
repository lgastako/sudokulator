import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <section className="relative px-6 py-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-4">
            <button
              className="bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50 shadow-lg px-8 py-3 rounded-lg font-semibold text-white transition-colors"
            >
              Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
