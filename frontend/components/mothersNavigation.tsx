'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { path: '/', name: 'Home' },
   { path: '/mothers/dashboard', name: 'Dashboard' },
  { path: '/mothers/check', name: 'Check' },
  { path: '/mothers/card', name: 'Card' },
   { path: '/mothers/selectHospital', name: 'Appointment' },
  { path: '/mothers/alert', name: 'Alerts' },
];

export default function MothersNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-[#F2EFF9] shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/navLogo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="w-40 h-auto"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-x-8 items-center">
          {links.map((link, index) => {
            const isActive = pathname === link.path;

            return (
              <Link
                href={link.path}
                key={index}
                className="relative font-normal text-[#3F2870]  transition-colors"
              >
                {link.name}

                {/* Underline animation */}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-[2px] bg-[#3F2870] w-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ type: 'tween', duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
