import React from "react";

export function Link({ href, setPage }) {
   return (
      <input type="button" className="btn" onClick={() => setPage(href)} value={href} />
   );
}
