'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import cn from '@/utils/cn';
import Button from '@/components/ui/button';
import { Menu, MenuButton, MenuItems, MenuItem } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';

export default function WalletConnect({ btnClassName, anchorClassName }: { btnClassName?: string; anchorClassName?: string }) {
  const { address } = useAccount();
  const { open } = useAppKit();
  const { data } = useBalance({ address });
  const { disconnect } = useDisconnect();
  const balance = data?.formatted;

  // 📌 Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('userData'); // 🗑️ Borra los datos de usuario almacenados
    window.location.href = '/'; // 🔄 Redirige al usuario al login
  };

  return (
    <>
      {address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <MenuButton className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></MenuButton>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <MenuItems className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <MenuItem>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        <span className="grow uppercase">Ver Perfil</span>
                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">Balance</span>
                        <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                          {address.slice(0, 6)}{'...'}{address.slice(address.length - 6)}
                        </span>
                      </div>
                      <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                        {balance} ETH
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={() => disconnect()}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Desconectar</span>
                      </div>
                    </div>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          </div>

          <ActiveLink href="/create-nft" className={cn(anchorClassName)}>
            <Button className={cn('shadow-main hover:shadow-large', btnClassName)}>
              CREAR
            </Button>
          </ActiveLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button onClick={() => window.open('https://es.tradingview.com/chart/', '_blank')} className={cn('shadow-main hover:shadow-large', btnClassName)}>
            OPERAR
          </Button>
          
          {/* 📌 Botón para cerrar sesión */}
          <Button onClick={logout} className={cn('shadow-main hover:shadow-large bg-red-500 hover:bg-red-600', btnClassName)}>
            Cerrar Sesión
          </Button>
        </div>
      )}
    </>
  );
}