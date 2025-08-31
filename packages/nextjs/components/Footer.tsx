"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommandLineIcon, GiftIcon, MagnifyingGlassIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { DappConsoleButton, FaucetButton, SuperchainFaucetButton } from "~~/components/scaffold-eth";

/**
 * Site footer - Tab-Tamer edition with hidden Dev Mode
 */
export const Footer = () => {
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  const [showDevTools, setShowDevTools] = useState(false);

  return (
    <footer className="min-h-0 py-6 px-4 border-t border-[#252442] bg-[#0b0b15] text-gray-300">
      {/* Top row: branding + quick nav */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Branding / tagline */}
        <div className="text-sm text-center md:text-left">
          <span className="font-semibold text-white">📑 Tab-Tamer</span> · Tame your tabs, earn your coins.
        </div>

        {/* Quick nav links */}
        <ul className="flex gap-4 text-sm">
          <li>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/rewards" className="flex items-center gap-1 hover:text-white transition">
              <GiftIcon className="h-4 w-4" />
              Rewards
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/NellyNakhero/tab-tamer-lisk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://discord.com/invite/7EKWJ7b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Support
            </a>
          </li>
        </ul>
      </div>

      {/* Dev Mode row */}
      {devMode && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {/* Toggle button */}
          <button
            onClick={() => setShowDevTools(!showDevTools)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
          >
            <CommandLineIcon className="h-4 w-4" />
            {showDevTools ? "Hide Dev Tools" : "Show Dev Tools"}
          </button>

          {/* Collapsible content */}
          {showDevTools && (
            <div className="flex flex-wrap justify-center gap-3 p-3 bg-[#1a1a2e] rounded-xl shadow-lg w-full md:w-auto">
              {/* Local faucet */}
              <FaucetButton />

              {/* Superchain faucet */}
              <SuperchainFaucetButton />

              {/* Block explorer */}
              <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal gap-1">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Block Explorer</span>
              </Link>

              {/* Debug contracts */}
              <Link href="/debug" passHref className="btn btn-secondary btn-sm font-normal gap-1">
                <WrenchIcon className="h-4 w-4" />
                <span>Debug Contracts</span>
              </Link>

              {/* Dapp console */}
              <DappConsoleButton />
            </div>
          )}
        </div>
      )}

      {/* Bottom row */}
      <div className="mt-4 text-xs text-center text-gray-500">Made with ❤️ for the Lisk & Aleph Hackathon</div>
    </footer>
  );
};
