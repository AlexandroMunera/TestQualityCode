import React from "react";


function CampoLista({ name, options, handleChange }) {
  return (
    <div>
      <label>{name}</label>

      <select id='lista' defaultValue='0' onChange={(e) => handleChange(e)}>
        <option key='0' value='0' disabled >
          Seleccione
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.descri}</option>
        ))}
      </select>
    </div>
  );
}

export default CampoLista;
