import { useState } from "react";
import "./AqBox.css";

function AqBox({ data }) {
  const [valid, setValid] = useState(false);
  const [result, setResult] = useState("");
  const [aquaBox, setAquaBox] = useState({
    width: 0,
    height: 0,
    depth: 0,
    volume: 0,
    need: 0,
  });

  /**
   * metoda handleChange
   */
  const handleChange = (e) => {
    const [val, name] = [e.target.value, e.target.name];
    let tmp = { ...aquaBox, [name]: val };

    // objem akvária
    tmp.volume = tmp.width * tmp.height * tmp.depth;

    // Potřeba vody pro rybičky
    tmp.need = data.map((d) => parseInt(d.size)).reduce((a, b) => a + b, 0);
    tmp.need *= Math.pow(10, 4);

    setAquaBox(tmp);
    if (tmp.need < tmp.volume) {
      setValid(true);
      setResult("Máte dostatek vody.");
    } else {
      setValid(false);
      setResult("");
    }
  };

  return (
    <div>
      <div className='row p-0 m-0'>
        <div className='d-block col-4'>
          <label
            className='col-form-label col-form-label-sm mt-4'
            htmlFor='id-name'>
            šířka
          </label>
          <input
            className='form-control lead-font-size  text-uppercase py-2'
            type='number'
            placeholder='Zadej šířku'
            id='id-width'
            name='width'
            value={aquaBox.width}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className='d-block col-4'>
          <label
            className='col-form-label col-form-label-sm mt-4'
            htmlFor='id-species'>
            délka
          </label>
          <input
            className='form-control lead-font-size text-uppercase py-2'
            type='number'
            placeholder='Zadej délku'
            id='id-height'
            name='height'
            value={aquaBox.height}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className='d-block col-4'>
          <label
            className='col-form-label col-form-label-sm mt-4'
            htmlFor='id-age'>
            výška
          </label>
          <input
            className='form-control lead-font-size text-uppercase py-2'
            type='number'
            placeholder='Zadej výšku'
            id='id-depth'
            name='depth'
            value={aquaBox.depth}
            onChange={handleChange}
            min={0}
          />
        </div>
        <hr className='my-5'></hr>
        <div className='row'>
          <div className='d-flex my-2 justify-content-end'>
            <button
              type='submit'
              id='id-on-add'
              className='btn btn-info '
              disabled={!valid}
              onClick={() => setResult("Máte dostatek vody.")}>
              Povoleno vložení rybičky
            </button>
          </div>
        </div>
      </div>
      <div className='row my-5'>
        <p>
          Objem akvária je {aquaBox.width} x {aquaBox.height} x {aquaBox.depth}{" "}
          ={" "}
          {aquaBox.volume.toLocaleString(undefined, {
            minimumFractionDigits: 0,
          })}
          &nbsp;cm<sup>3</sup>
        </p>
        <p>
          Rybičky potřebují{" "}
          {aquaBox.need.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          cm<sup>3</sup>
          &nbsp;&nbsp;&nbsp;
          {(aquaBox.need / 1000).toLocaleString(undefined, {
            minimumFractionDigits: 1,
          })}
          &nbsp;dm<sup>3</sup> (litrů)
        </p>

        <div
          class={`alert alert-dismissible alert-info fs-4 ${
            result.length === 0 ? `d-none` : ``
          }`}>
          {result}
        </div>

        <h4></h4>
      </div>
    </div>
  );
}

export default AqBox;
