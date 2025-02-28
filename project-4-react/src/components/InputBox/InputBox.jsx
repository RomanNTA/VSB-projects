import React, { useState } from "react";
import "./InputBox.css";

function InputBox({ handleAdd }) {
  const [valid, setValid] = useState(false);
  const [newDev, setNewDev] = useState({
    name: "",
    surname: "",
    level: 0,
  });

  /**
   * Data pro input Select
   */
  const dataSelect = [
    { label: "není uvedeno", value: 0 },
    { label: "Junior", value: 1 },
    { label: "Senior", value: 2 },
  ];

  /**
   * metoda reset
   */
  const reset = () => {
    let tmp = {
      name: "",
      surname: "",
      level: 0,
    };
    setNewDev(tmp);
    isValid(tmp);
  };

  const handleChange = (e) => {
    const [val, name] = [e.target.value, e.target.name];
    let tmp = { ...newDev, [name]: val };
    setNewDev(tmp);
    isValid(tmp);
  };

  const isValid = (tmp) => {
    let valid =
      tmp.name.trim().length > 0 &&
      tmp.surname.trim().length > 0 &&
      tmp.level > 0;
    setValid(valid);
  };

  /**
   * Komponenta InputBox
   */
  return (
    <div>
      <div className="row p-0 m-0">
        <div className="d-block col-12 col-md-4">
          <label
            className="col-form-label col-form-label-sm mt-1"
            htmlFor="id-name"
          >
            Jméno
          </label>
          <input
            className="form-control lead-font-size  py-2"
            type="text"
            placeholder="Zadejte jméno nového programátora"
            id="id-name"
            name="name"
            value={newDev.name}
            onChange={handleChange}
          />
        </div>

        <div className="d-block col-12 col-md-4">
          <label
            className="col-form-label col-form-label-sm mt-1"
            htmlFor="id-surname"
          >
            Příjmení
          </label>
          <input
            className="form-control lead-font-size py-2"
            type="text"
            placeholder="Zadejte příjmení nového programátora"
            id="id-surname"
            name="surname"
            value={newDev.surname}
            onChange={handleChange}
          />
        </div>

        <div className="d-block col-12 col-md-4">
          <label
            className="col-form-label col-form-label-sm mt-1"
            htmlFor="id-level"
          >
            Dosažená úroveň
          </label>

          <select
            className="form-select lead-font-size py-2"
            id="id-level"
            name="level"
            value={newDev.level}
            onChange={handleChange}
          >
            {dataSelect.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="row mt-4">
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              id="id-on-add"
              className="btn btn-info "
              disabled={!valid}
              onClick={() => {
                handleAdd(newDev);
                reset();
              }}
            >
              Vložit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
