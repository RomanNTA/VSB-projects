import { useState } from "react";
import "./ScheduleBox.css";

function ScheduleBox({ data }) {
  const [valid, setValid] = useState(false);
  const [result, setResult] = useState("");
  const [schBox, setSchBox] = useState({
    app: 0,
    days: 0,
    volume: 0,
    need: 0,
  });

  /**
   * metoda handleChange
   */
  const handleChange = (e) => {
    const [val, name] = [e.target.value, e.target.name];
    let tmp = { ...schBox, [name]: val };

    // Programátoři vyprodukují ... řádků
    tmp.volume = data.map((d) => parseInt(d.level)).reduce((a, b) => a + b, 0);
    tmp.volume *= 100;

    // Aplikaci je možné vyrobit za ... dní.
    tmp.need = tmp.app / tmp.volume;

    setSchBox(tmp);

    console.log(tmp.need + " - " + tmp.days);
    if (tmp.need <= tmp.days) {
      setValid(true);
      setResult("Máte dostatek programátorů na splnění plánu.");
    } else {
      setValid(false);
      setResult("");
    }
  };

  return (
    <div>
      <div className="row p-0 m-0 w-100">
        <div className="row p-0 m-0">
          <div className="d-block col-12 col-md-6">
            <label
              className="col-form-label col-form-label-sm mt-4"
              htmlFor="id-name"
            >
              Počet řádků kodu aplikace
            </label>
            <input
              className="form-control lead-font-size "
              type="number"
              placeholder="Zadej šířku"
              id="id-app"
              name="app"
              value={schBox.app}
              onChange={handleChange}
              min={1}
            />
          </div>
          <div className="d-block col-12 col-md-6">
            <label
              className="col-form-label col-form-label-sm mt-4"
              htmlFor="id-species"
            >
              Časový limit (počet dnů(8h na den))
            </label>
            <input
              className="form-control lead-font-size"
              type="number"
              placeholder="Zadej délku"
              id="id-days"
              name="days"
              value={schBox.days}
              onChange={handleChange}
              min={0}
            />
          </div>

          <div className="d-flex my-5  justify-content-end">
            <button
              type="submit"
              id="id-on-add"
              className="btn btn-info "
              disabled={!valid}
              onClick={() => setResult("Potvrzení! Plán je schválen..")}
            >
              {valid ? "Schválit plán !" : "Plán je nedosažitelný"}
            </button>
          </div>
        </div>
      </div>
      <hr className="my-3"></hr>
      <div className="row mt-5 mb-1">
        <p>
          Celkem je potřeba napsat cca {schBox.app} řádků kódu nové aplikace.{" "}
        </p>

        <p>
          Programátoři ve firmě jsou schopni vyprodukovat {schBox.volume} řádků
          kódu nové aplikace.{" "}
        </p>

        <p>
          Aktuální stav: Na vyhotovení aplikace je potřeba{" "}
          {schBox.need.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          dní &nbsp;
        </p>

        <div
          className={`alert alert-info fs-5 mb-1 ${
            result.length === 0 ? `d-none` : ``
          }`}
        >
          {result}
        </div>

        <h4></h4>
      </div>
    </div>
  );
}

export default ScheduleBox;
