import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy;2024 | All rights Reserved
      </small>
      <p className="text-xs">
        <span className="font-semibold">
          Developed by{" "}
          <a className="text-blue-600 visited:text-purple-600" href="/">
            Aaqif
          </a>
        </span>
      </p>
    </footer>
  );
}
