"use client";

import { AlignJustify, LogIn, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "../modeToggle/ModeToggle";
import { logout } from "@/utils/logout";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

type NavigationItem = {
  label: string;
  href: string;
};
const navigationItems: NavigationItem[] = [
  {
    label: "Concours",
    href: "/concours",
  },
  {
    label: "Participer",
    href: "/participate",
  },
  {
    label: "Archives",
    href: "/archives",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const authNavigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Créer un concours",
    href: "/dashboard/create-contest",
  },
];

export const Nav = () => {
  const user = useUser();
  const router = useRouter();

  const handleButton = () => {
    if (user) {
      logout();
      router.refresh();
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className='z-10 w-full items-center justify-between font-mono text-sm mb-4'>
      <nav className='flex w-full h-20 justify-between items-center pb-6 pt-8 px-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit bg-gray-200 lg:px-36'>
        <div className='flex flex-row justify-between items-center'>
          <a href='/'>Logo</a>
          <NavigationMenu className='hidden lg:flex ml-20'>
            <NavigationMenuList>
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link
                      href={authNavigationItems[0].href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {authNavigationItems[0].label}
                      </NavigationMenuLink>
                    </Link>
                    <Link
                      href={authNavigationItems[1].href}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {authNavigationItems[1].label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : null}
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='lg:hidden flex flex-row gap-2'>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AlignJustify />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col justify-center w-full'>
              {user
                ? authNavigationItems.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      className='px-2 py-4 cursor-pointer'
                      asChild
                    >
                      <Link href={item.href}>
                        <p>{item.label}</p>
                      </Link>
                    </DropdownMenuItem>
                  ))
                : null}
              {navigationItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className='px-2 py-4 cursor-pointer'
                  asChild
                >
                  <Link href={item.href}>
                    <p>{item.label}</p>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className=''>
                <Button
                  onClick={handleButton}
                  variant={user ? "destructive" : "ghost"}
                  className='w-full h-full'
                >
                  {user ? <LogOut /> : <LogIn />}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex-row gap-4 hidden lg:flex'>
          <ModeToggle />
          <Button
            onClick={handleButton}
            variant={user ? "destructive" : "ghost"}
            size='icon'
          >
            {/* <Link href={user ? "/auth/logout" : "/login"}>
              {user ? <LogOut /> : <LogIn />}
            </Link> */}
            {user ? <LogOut /> : <LogIn />}
          </Button>
        </div>
      </nav>
    </div>
  );
};
