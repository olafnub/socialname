import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// Even if you're app doesn't use mainnet ETH, you still need it in this array for ENS
export const chains = [mainnet, goerli]

const { publicClient } = configureChains(chains, [publicProvider()])

const { connectors } = getDefaultWallets({
  // Get your own WalletConnect ID: https://cloud.walletconnect.com/sign-in
  projectId: '5b174783b284ce69143ceabe389a6513',
  appName: 'socialname',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})