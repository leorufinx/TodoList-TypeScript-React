import React from "react";

export function Button({ href, setPage }) {
   return (
      <input type="button" className="btn" onClick={() => setPage(href)} value={href}/>
   );
}

export function Link({ href, setPage }) {
   return (
      <input type="button" className="link" onClick={() => setPage(href)} value={href}/>
   );
}