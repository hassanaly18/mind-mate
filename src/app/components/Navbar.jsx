import React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Journal", href: "/" },
  { name: "Timeline", href: "/timeline" },
  { name: "Tracker", href: "/" },
];

const Navbar = () => {
  return (
    <nav className="w-full border-b dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold text-blue-600 dark:text-blue-400" href="/">MindMate</Link>
        <div className="hidden md:flex space-x-4">
            {navLinks.map((link)=>(
                <Link className="text-md font-medium hover:text-blue-600 transition-colors" key={link.name} href={link.href}>{link.name}</Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
