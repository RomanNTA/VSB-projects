import { useState } from "react";
import "./AqBox.css";
import { Alert } from "bootstrap";

function AqBox({ data }) {
  const [valid, setValid] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
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
    console.log("Vstup -> handleChange----------------------------");
    console.log(">" + e.target.id + "< - >" + e.target.value + "<");
    const val = e.target.value;
    const id = e.target.id;
    let tmp;
    console.log(tmp);

    switch (id) {
      case "id-width": {
        tmp = { ...aquaBox, width: val };
        break;
      }
      case "id-height": {
        tmp = { ...aquaBox, height: val };
        break;
      }
      case "id-depth": {
        tmp = { ...aquaBox, depth: val };
        break;
      }
      default:
        break;
    }

    tmp.volume = tmp.width * tmp.height * tmp.depth;

    tmp.need = 0;
    for (let obj of data) {
      tmp.need += obj.size * 10;
    }

    //    let accm = 0;
    //    tmp.need = data.reduce((accm, b) => b.size * 10, 0);
    tmp.need = tmp.need * 10 * 10 * 10;

    console.log("tmp 3");
    console.log(tmp);
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
      <div className="row p-0 m-0">
        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-name"
          >
            šířka
          </label>
          <input
            className="form-control lead-font-size  text-uppercase py-2"
            type="number"
            placeholder="Zadej šířku"
            id="id-width"
            name="width"
            value={aquaBox.width}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-species"
          >
            délka
          </label>
          <input
            className="form-control lead-font-size text-uppercase py-2"
            type="number"
            placeholder="Zadej délku"
            id="id-height"
            name="height"
            value={aquaBox.height}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className="d-block col-4">
          <label
            className="col-form-label col-form-label-sm mt-4"
            htmlFor="id-age"
          >
            výška
          </label>
          <input
            className="form-control lead-font-size text-uppercase py-2"
            type="number"
            placeholder="Zadej výšku"
            id="id-depth"
            name="depth"
            value={aquaBox.depth}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className="row">
          <div className="d-flex my-5 justify-content-end">
            <button
              type="submit"
              id="id-on-add"
              className="btn btn-info "
              disabled={!valid}
              onClick={() => setResult("Máte dostatek vody.")}
            >
              Povoleno vložení rybičky
            </button>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <p>
          Objem akvária je {aquaBox.width} x {aquaBox.height} x {aquaBox.depth}{" "}
          = {aquaBox.volume}cm<sup>3</sup>
        </p>
        <p>
          Rybičky potřebují {aquaBox.need}cm<sup>3</sup>
        </p>
        <h4>{result}</h4>
      </div>
    </div>
  );
}

export default AqBox;
