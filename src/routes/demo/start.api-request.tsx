import { useEffect, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

function getNames() {
  return fetch('/demo/api/names').then(res => res.json() as Promise<string[]>)
}

export const Route = createFileRoute('/demo/start/api-request')({
  component: Home,
})

function Home() {
  const [names, setNames] = useState<Array<string>>([])

  useEffect(() => {
    getNames().then(setNames).catch(console.error)
  }, [getNames])

  return (
    <div
      className="flex justify-center items-center p-4 min-h-screen text-white"
      style={{
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse 60% 60% at 0% 100%, #444 0%, #222 60%, #000 100%)',
      }}
    >
      <div className="bg-black/50 shadow-xl backdrop-blur-md p-8 border-8 border-black/10 rounded-xl w-full max-w-2xl">
        <h1 className="mb-4 text-2xl">Start API Request Demo - Names List</h1>
        <ul className="space-y-2 mb-4">
          {names.map(name => (
            <li
              key={name}
              className="bg-white/10 shadow-md backdrop-blur-sm p-3 border border-white/20 rounded-lg"
            >
              <span className="text-white text-lg">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
