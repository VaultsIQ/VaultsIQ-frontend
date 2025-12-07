'use client'

import { WagmiProvider, type State } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { config, projectId, networks, wagmiAdapter } from '@/config/wagmi'

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'VaultsIQ',
    description: 'Decentralized vault platform for automated yield generation',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: [],
  },
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
})

export function Providers({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

