import React, { useState } from "react";

export function InputField({ id, title, type, value, onChange }) {

   return (
      <div className="column">
         <div>
            <label htmlFor={id} className="lbl">{title}</label>
         </div>
         <div>
            <input id={id} type={type} className="formInput" value={value} onChange={(e) => onChange(e.target.value)} />
         </div>
      </div>
   );
}

export function InputArea({ id, title, value, onChange }) {

   return (
      <div className="column">
         <div>
            <label htmlFor={id} className="lbl">{title}</label>
         </div>
         <div>
            <textarea rows="4" id={id} className="formInput" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
         </div>
      </div>
   );
}
