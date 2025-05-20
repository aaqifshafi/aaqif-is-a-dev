import React from "react";

export default function Footer() {
  return (
    <footer className="px-4 mb-10 text-center text-gray-500">
      <small className="block mb-2 text-xs">
        &copy; {new Date().getFullYear()} | All rights Reserved
      </small>
      <p className="text-xs">
        <span className="font-semibold">
          Developed by{" "}
          <a
            className="text-blue-600 visited:text-purple-600"
            href="https://github.com/aaqifshafi"
          >
            Aaqif
          </a>
        </span>
      </p>
    </footer>
  );
}
