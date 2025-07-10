import { NextResponse } from 'next/server';
import usersData from '@/data/users.json'; // Importa el JSON directamente

export async function GET(request: Request) {
  // Simplemente devuelve los datos importados.
  // Next.js se encarga de que el archivo esté disponible.
  return NextResponse.json(usersData);
}

const routes = {
  coinAll: '/coinAll',
  home: '/account',
  minimal: '/minimal',
  livePricing: '/live-pricing',
  retro: '/retro',
  swap: '/swap',
  liquidity: '/liquidity',
  card: '/liquidity',
  solicitud: '/solicitud',
  liquidityPosition: '/liquidity-position',
  farms: '/farms',
  createNft: '/create-nft',
  nftDetails: '/nft-details',
  search: '/search',
  notification: '/notifications',
  vote: '/vote',
  proposals: '/proposals',
  createProposal: '/proposals/create',
  charts: '/charts',
  profile: '/profile',
  users: '/users',
  portfolio: '/profile?view=portfolio',
  history: '/profile?view=history',
  classic: '/classic',
  coinDetails: '/coin-details',
  signIn: '/authentication',
  signUp: '/authentication/sign-up',
  resetPin: '/authentication/reset-pin',
  forgetPassword: '/authentication/forget-password',
  tradingBot: '/trading-bot',
  tradingBotSpotGrid: '/spot-grid-bot',
  tradingBotFuturesGrid: '/futures-grid-bot',
  tradingBotMartingale: '/martingale-bot',
  tradingBotInfinityGrid: '/infinity-grid-bot',
  pages: '/pages',
};

export default routes;
