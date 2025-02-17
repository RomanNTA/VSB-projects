import React, { useState } from "react";
import "./InputBox.css";

function InputBox({ handleAdd }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState(0);
  const [valid, setValid] = useState(false);
  const [newFish, setNewFish] = useState({
    //id: data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 1,
    name: "",
    species: "",
    size: 0,
  });

  /**
   * Data pro input Select
   */
  const dataSelect = [
    { label: "není uvedeno", value: 0 },
    { label: "malá rybička", value: 1 },
    { label: "velká ryba", value: 2 },
  ];

  /**
   * metoda handleEvent
   */
  const handleEvent = (e) => {
    console.log("Vstup -> handleEvent " + e.target.id);

    switch (e.target.id) {
      case "id-on-add": {
        handleAdd(newFish);
        break;
      }

      default:
        break;
    }
  };

  const reset = () => {
    let tmp = {
      name: "",
      species: "",
      size: 0,
    };
    setNewFish(tmp);
    isValid(tmp);
  };

  const handleChange = (e) => {
    /*     console.log("handleChange input box", e.target.id);
    console.log("handleChange input box", e.target.value);
 */
    let tmp;
    switch (e.target.id) {
      case "id-size": {
        tmp = { ...newFish, size: e.target.value };
        break;
      }
      case "id-name": {
        tmp = { ...newFish, name: e.target.value };
        break;
      }
      case "id-species": {
        tmp = { ...newFish, species: e.target.value };
        break;
      }
      default:
        break;
    }

    console.log("handleChange input box TMP", tmp);
    // handleData(e.target.value, id);
    setNewFish(tmp);
    isValid(tmp);
  };

  const isValid = (tmp) => {
    /*     console.log("is valid ... vstup");
    console.log(tmp.name.trim().length > 0);
    console.log(tmp.species.trim().length > 0);
    console.log(tmp.size);
    console.log(tmp);
 */
    let valid =
      tmp.name.trim().length > 0 &&
      tmp.species.trim().length > 0 &&
      tmp.size > 0;
    /*     console.log("is valid ... vstup " + valid); */
    setValid(valid);
  };

  /**
   * Komponenta InputBox
   */
  return (
    <div>
      <div className="row p-0 m-0">
        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-name"
          >
            Jméno ryby
          </label>
          <input
            className="form-control lead-font-size  text-uppercase py-2"
            type="text"
            placeholder="Zadej text"
            id="id-name"
            name="name"
            value={newFish.name}
            onChange={handleChange}
          />
        </div>

        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-species"
          >
            Druh ryby
          </label>
          <input
            className="form-control lead-font-size text-uppercase py-2"
            type="text"
            placeholder="Zadej text"
            id="id-species"
            name="species"
            value={newFish.species}
            onChange={handleChange}
          />
        </div>

        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-age"
          >
            Velikost
          </label>

          <select
            className="form-select lead-font-size text-uppercase py-2"
            id="id-size"
            name="size"
            value={newFish.size}
            onChange={handleChange}
          >
            {dataSelect.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              id="id-on-add"
              className="btn btn-info "
              disabled={!valid}
              onClick={() => {
                handleEvent(event);
                reset();
              }}
            >
              Přidej rybičku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
