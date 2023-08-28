import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiConfig } from '../utils/provider'

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {isMounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}