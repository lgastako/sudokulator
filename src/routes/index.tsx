import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <section className="relative px-6 py-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-5xl">
          <div className="flex justify-center items-center gap-6 mb-6">
            <img
              src="/tanstack-circle-logo.png"
              alt="TanStack Logo"
              className="w-24 md:w-32 h-24 md:h-32"
            />
            <h1 className="font-black text-white text-6xl md:text-7xl [letter-spacing:-0.08em]">
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent">
                SUDOKU
              </span>{' '}
              <span className="text-gray-300">LATOR</span>
            </h1>
          </div>
          <p className="mb-4 font-light text-gray-300 text-2xl md:text-3xl">
            The framework for next generation AI applications
          </p>
          <p className="mx-auto mb-8 max-w-3xl text-gray-400 text-lg">
            Full-stack framework powered by TanStack Router for React and Solid.
            Build modern applications with server functions, streaming, and type
            safety.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50 shadow-lg px-8 py-3 rounded-lg font-semibold text-white transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
