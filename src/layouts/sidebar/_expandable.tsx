'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import cn from '@/utils/cn';
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import LogoIcon from '@/components/ui/logo-icon';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Button from '@/components/ui/button';
import { useDrawer } from '@/components/drawer-views/context';
import { useLayout } from '@/lib/hooks/use-layout';
import { Close } from '@/components/icons/close';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { defaultMenuItems } from '@/layouts/sidebar/_menu-items';
import routes from '@/config/routes';
import SimpleBar from '@/components/ui/simplebar';

//images
import AuthorImage from '@/assets/images/author.jpg';
import { LAYOUT_OPTIONS } from '@/lib/constants';

const layoutOption = '';
const sideBarMenuItems = defaultMenuItems.map((item) => ({
  name: item.name,
  icon: item.icon,
  href: '/' + LAYOUT_OPTIONS.CLASSIC + (item.href === '/' ? '' : item.href),
  ...(item.dropdownItems && {
    dropdownItems: item?.dropdownItems?.map((dropdownItem: any) => ({
      name: dropdownItem.name,
      ...(dropdownItem?.icon && { icon: dropdownItem.icon }),
      href:
        item.name === 'Authentication'
          ? layoutOption + dropdownItem.href
          : '/' + LAYOUT_OPTIONS.CLASSIC + dropdownItem.href,
    })),
  }),
}));

export default function Sidebar({ className }: { className?: string }) {
  const router = useRouter();
  const { layout } = useLayout();
  const pathname = usePathname();
  const { closeDrawer } = useDrawer();
  const [open, setOpen] = useState(false);

  // Estado para la imagen de perfil dinámica
  const [profileImage, setProfileImage] = useState<string>(AuthorImage);
  const [user, setUser] = useState<any>(null);

  // Obtener datos del usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      if (userData.profileImage) setProfileImage(userData.profileImage);
    }
  }, []);

  // Sincronizar imagen de perfil con backend si hay userId
  useEffect(() => {
    if (!user?.id) return;
    fetch(`https://blackrockdpto.net/api/users`)
      .then((res) => res.json())
      .then((data) => {
        const backendUser = data.users.find((u: any) => u.id === user.id);
        if (backendUser?.profileImage) {
          setProfileImage(backendUser.profileImage);
          // Actualiza también en localStorage para mantener sincronizado
          const storedUser = localStorage.getItem('userData');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            userData.profileImage = backendUser.profileImage;
            localStorage.setItem('userData', JSON.stringify(userData));
          }
        }
      })
      .catch((err) => {
        console.error('Error al obtener la imagen de perfil:', err);
      });
  }, [user?.id]);

  const ref = useRef<HTMLElement>(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  function isSubMenuActive(
    submenu: Array<{ name: string; icon?: JSX.Element; href: string }>,
  ) {
    return submenu?.map((item) => item.href).includes(pathname);
  }

  return (
    <aside
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        open
          ? 'border-0 shadow-expand xs:w-80 xl:w-72 2xl:w-80 '
          : 'w-24 border-dashed border-gray-200 2xl:w-28 ltr:border-r rtl:border-l',
        'top-0 z-40 h-full max-w-full  bg-body duration-200 dark:border-gray-700 dark:bg-dark  xl:fixed ltr:left-0 rtl:right-0',
        className,
      )}
    >
      <div
        className={cn(
          'relative flex h-24 items-center  overflow-hidden px-6 py-4 pt-0 2xl:px-8 3xl:pt-6',
          open ? 'flex-start' : 'justify-center',
        )}
      >
        {!open ? (
          <div onClick={() => setOpen(!open)}>
            <LogoIcon />
          </div>
        ) : (
          <Logo />
        )}

        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <SimpleBar
        className={cn(open ? 'h-[calc(100%-190px)]' : 'h-[calc(100%-170px)]')}
      >
        <div className="px-6 pb-5 2xl:px-8">
          {!open ? (
            <div className="mt-5 2xl:mt-8" onClick={() => setOpen(!open)}>
              {sideBarMenuItems.map((item, index) => (
                <MenuItem
                  isActive={
                    item.href === pathname ||
                    isSubMenuActive(item.dropdownItems!)
                  }
                  key={'drawer' + item.name + index}
                  href=""
                  icon={item.icon}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 2xl:mt-8">
              {sideBarMenuItems.map((item, index) => (
                <MenuItem
                  key={'drawer-full' + item.name + index}
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                  dropdownItems={item.dropdownItems}
                />
              ))}
            </div>
          )}
        </div>
      </SimpleBar>
      <div className={cn('sticky bottom-5 mt-3 2xl:mt-12 pl-4', open && 'px-8')}>
        {!open ? (
          <motion.div
            initial={{ x: 50, y: -5 }}
            animate={{
              x: 0,
              y: 0,
            }}
            className="cursor-pointer pb-2"
          >
            <AuthorCard
              image={profileImage}
              onClick={() => {
                const newPath =
                  layout === LAYOUT_OPTIONS.MODERN
                    ? routes.profile
                    : `/${layout}${routes.profile}`;
                router.push(newPath);
              }}
            />
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ y: '80%' }}
              animate={{
                y: 0,
                transition: {
                  delay: 0.1,
                },
              }}

            >
              <AuthorCard
                image={profileImage}
                name={user?.username || "Cameron Williamson"}
                role={user?.role || "admin"}
                onClick={() => {
                  const newPath =
                    layout === LAYOUT_OPTIONS.MODERN
                      ? routes.profile
                      : `/${layout}${routes.profile}`;
                  router.push(newPath);
                }}
              />
            </motion.div>
          </div>
        )}
      </div>
    </aside>
  );
}