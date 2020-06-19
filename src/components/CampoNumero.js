import React from "react";
import NumberFormat from "react-number-format";

function CampoNumero({ name, value, handleChange }) {
  return (
    <div>
      <label>{name}</label>

      <NumberFormat
        value={value}
        displayType="input"
        decimalSeparator=","
        thousandSeparator="."
        placeholder={name}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default CampoNumero;
