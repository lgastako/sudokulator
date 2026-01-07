import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getPunkSongs } from '@/data/demo.punk-songs'

export const Route = createFileRoute('/demo/start/ssr/spa-mode')({
  ssr: false,
  component: RouteComponent,
})

function RouteComponent() {
  const [punkSongs, setPunkSongs] = useState<
    Awaited<ReturnType<typeof getPunkSongs>>
  >([])

  useEffect(() => {
    getPunkSongs().then(setPunkSongs).catch(console.error)
  }, [getPunkSongs])

  return (
    <div
      className="flex justify-center items-center bg-gradient-to-br from-zinc-800 to-black p-4 min-h-screen text-white"
      style={{
        backgroundImage:
          'radial-gradient(50% 50% at 20% 60%, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
      }}
    >
      <div className="bg-black/50 shadow-xl backdrop-blur-md p-8 border-8 border-black/10 rounded-xl w-full max-w-2xl">
        <h1 className="mb-6 font-bold text-green-400 text-3xl">
          SPA Mode - Punk Songs
        </h1>
        <ul className="space-y-3">
          {punkSongs.map(song => (
            <li
              key={song.id}
              className="bg-white/10 shadow-md backdrop-blur-sm p-4 border border-white/20 rounded-lg"
            >
              <span className="font-medium text-white text-lg">
                {song.name}
              </span>
              <span className="text-white/60"> - {song.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
