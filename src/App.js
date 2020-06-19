import React, { useState, useEffect } from "react";
import "./App.css";

import CampoNumero from "./components/CampoNumero";
import CampoLista from "./components/CampoLista";

const optionsList = [
  {
    id: 1,
    descri: "Option 1",
  },
  {
    id: 2,
    descri: "Option 2",
  },
  {
    id: 3,
    descri: "Option 3",
  },
];

function App() {
  const [valor, setValor] = useState("");
  const [itemSeleccionado, setItemSeleccionado] = useState("");
  const [TRM, setTRM] = useState("");
  const [tabla, setTabla] = useState(localStorage.getItem("tabla"));

  useEffect(() => {
    const tabla = localStorage.getItem("tabla");
    if (!tabla) localStorage.setItem("tabla", JSON.stringify([]));
  }, []);

  const handleChangeValor = (newValue) => {
    setValor(newValue);
  };

  const handleChangeList = (event) => {
    const index = event.nativeEvent.target.selectedIndex;
    const newValue = event.nativeEvent.target[index].text;
    setItemSeleccionado(newValue);
  };

  const handleChangeTRM = (newValue) => {
    setTRM(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!valor || !itemSeleccionado) {
      alert("El campo valor y lista son obligatorios.");
    } else {

      const data = { valor: valor, descri: itemSeleccionado, TRM: TRM };
      
      postData("https://httpbin.org/post", data).then((data) => {

        let tabla = JSON.parse(localStorage.getItem("tabla"));
        tabla.push(data);
        localStorage.setItem("tabla", JSON.stringify(tabla));

        setTabla(JSON.stringify(tabla));
      });
    }
  };

  const handleClear = (e) => {
    e.preventDefault();

    setValor("");
    setItemSeleccionado("");
    setTRM("");

    document.getElementById("lista").selectedIndex = "0";
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return JSON.parse(json.data);
  }

  return (
    <div className="App">

      <h3>Prueba Técnica Quality Code - Freud Múnera</h3>

      <div className="container">

        <form onSubmit={handleSubmit}>
          <CampoNumero
            name="Valor"
            value={valor}
            handleChange={handleChangeValor}
          />

          <CampoLista name="Lista" options={optionsList} handleChange={handleChangeList} />

          <CampoNumero name="TRM" value={TRM} handleChange={handleChangeTRM} />

          <div className="buttons">
            <input type="submit" value="Guardar" />
            <input type="button" value="Limpiar" onClick={handleClear} />
          </div>
        </form>
      </div>

      {tabla !== null && tabla !== "[]" && (
        <>
          <h3>Datos registrados</h3>

          <div className="container">
            <table id="datosRegistrados">
              <tr>
                <th>Consecutivo</th>
                <th>Valor</th>
                <th>Descripción</th>
                <th>TRM</th>
              </tr>

              {JSON.parse(tabla).map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.valor}</td>
                  <td>{item.descri}</td>
                  <td>{item.TRM}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
