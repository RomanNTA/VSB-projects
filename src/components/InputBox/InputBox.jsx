import React, { useState } from "react";
import "./InputBox.css";

function InputBox({ handleAdd }) {
  const [valid, setValid] = useState(false);
  const [newFish, setNewFish] = useState({
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
   * metoda reset
   */
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
    const [val, name] = [e.target.value, e.target.name];
    let tmp = { ...newFish, [name]: val };
    setNewFish(tmp);
    isValid(tmp);
  };

  const isValid = (tmp) => {
    let valid =
      tmp.name.trim().length > 0 &&
      tmp.species.trim().length > 0 &&
      tmp.size > 0;
    setValid(valid);
  };

  /**
   * Komponenta InputBox
   */
  return (
    <div>
      <div className='row p-0 m-0'>
        <div className='d-block col-12 col-md-4'>
          <label
            className='col-form-label col-form-label-sm mt-1'
            htmlFor='id-name'>
            Jméno ryby
          </label>
          <input
            className='form-control lead-font-size  py-2'
            type='text'
            placeholder='Zadejte jméno nové rybičky'
            id='id-name'
            name='name'
            value={newFish.name}
            onChange={handleChange}
          />
        </div>

        <div className='d-block col-12 col-md-4'>
          <label
            className='col-form-label col-form-label-sm mt-1'
            htmlFor='id-species'>
            Druh ryby
          </label>
          <input
            className='form-control lead-font-size py-2'
            type='text'
            placeholder='Zadej druh rybičky'
            id='id-species'
            name='species'
            value={newFish.species}
            onChange={handleChange}
          />
        </div>

        <div className='d-block col-12 col-md-4'>
          <label
            className='col-form-label col-form-label-sm mt-1'
            htmlFor='id-age'>
            Velikost
          </label>

          <select
            className='form-select lead-font-size py-2'
            id='id-size'
            name='size'
            value={newFish.size}
            onChange={handleChange}>
            {dataSelect.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className='row mt-4'>
          <div className='d-flex justify-content-end'>
            <button
              type='submit'
              id='id-on-add'
              className='btn btn-info '
              disabled={!valid}
              onClick={() => {
                handleAdd(newFish);
                reset();
              }}>
              Přidej rybičku
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
