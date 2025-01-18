'use client'

import React from "react";

export default function Signup() {
  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 px-4 sm:px-6 lg:px-8">
            <form>
              {/* Sign up section */}
              <div className="flex flex-col items-center justify-center">
                <h2 className="mb-6 text-3xl font-bold">Sign up</h2>
                <div className="flex space-x-4 mb-6">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.D6P-BO32wCApcPIIjt6p5wHaHa&pid=Api&P=0&h=220" alt="Google" className="w-8 h-8" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.eJqR2-uHIz8cSuE-OWpk-wHaHa&pid=Api&P=0&h=220" alt="Twitter" className="w-8 h-8" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <img src="https://tse4.mm.bing.net/th?id=OIP.KeKQ4RFTpLYeJgAaUdKNPgHaHa&pid=Api&P=0&h=220" alt="GitHub" className="w-8 h-8" />
                  </a>
                </div>
              </div>

              {/* Separator */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-neutral-500">
                  Or
                </p>
              </div>

              {/* Signup form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Signup button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>

              {/* Login link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

