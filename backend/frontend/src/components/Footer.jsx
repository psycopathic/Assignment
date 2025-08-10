import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-10 mt-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          {/* Left section */}
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Url Shortener. All rights
            reserved.
          </p>

          {/* Right section */}
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a
              href="https://github.com/psycopathic"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Twitter
            </a>
            <a href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
