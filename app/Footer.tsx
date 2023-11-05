import Link from "next/link";
import React from "react";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export default function Footer() {
  const size = 25;
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="gradient_text">
              <h1 className="text-3xl font-bold ">Excel Rank</h1>
            </div>

            <p className="mt-4 max-w-xs text-gray-500">
              Grow your presence, reputation and revenue.
            </p>

            <ul className="mt-8 flex gap-6 items-center">
              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <BsFacebook size={size} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <AiFillInstagram size={size} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <AiFillTwitterCircle size={size} />
                </a>
              </li>

              <li>
                <a
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Lindedin</span>

                  <AiFillLinkedin size={size} />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-gray-900">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    href={{ pathname: "/reviews" }}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Reviews Management
                  </Link>
                </li>

                <li>
                  <Link
                    href={{ pathname: "/localranking" }}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Local Ranking
                  </Link>
                </li>

                <li>
                  <Link
                    href={{ pathname: "/socialmonitor" }}
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Social Monitor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Company</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Meet the Team
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Customer Support
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-900">Legal</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          &copy; 2023. Excel Rank. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
