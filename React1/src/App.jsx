import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootswatch/dist/spacelab/bootstrap.min.css";
import Table from "./components/Table/Table";
import rawFish from "./fish.json";
import InputBox from "./components/InputBox/InputBox";
import AqBox from "./components/AqBox/AqBox";

function App() {
  const [fish, setFish] = useState(rawFish.fish);
  const [activePage, setActivePage] = useState(1);

  /**
   * metoda handleDelete
   */
  const handleDelete = (idDelete) => {
    console.log("Vstup -> handleDelete " + idDelete);
    const temp = fish.filter((m) => m.id !== idDelete);
    setFish(temp);
  };

  /**
   * metoda handleChange
   */
  const handleChange = (e) => {
    console.log("Vstup -> handleChange");
    console.log(e.target.id);
  };

  /**
   * metoda handleEvent
   */
  const handleEvent = (e) => {
    console.log("Vstup -> handleEvent");
    console.log(e.target.id);
  };

  /**
   * metoda handleAdd
   */
  const handleAdd = (addFish) => {
    console.log("Vstup -> handleAdd");

    let tmp = addFish;
    console.log("tmp in");
    tmp = {
      ...addFish,
      id: fish.length > 0 ? Math.max(...fish.map((d) => d.id)) + 1 : 1,
    };
    let tmp2 = [...fish, tmp];
    setFish(tmp2);
  };

  /**
   * Aplikace
   */
  return (
    <div className="container vw-100 vh-100 d-flex flex-direction-row justify-content-center ">
      <div className="nta-body-container my-auto mx-auto  d-flex rounded-5 box-shadow">
        <div className="row p-5 d-flex ">
          <div className="row p-0 m-0">
            <h3 className="p-0 m-0">Aplikace pro plánování rozměrů akvária.</h3>
          </div>
          <div className="py-5">
            <button
              onClick={() => setActivePage(1)}
              className={`btn ${
                activePage === 1 ? "btn-info" : " btn-outline-info"
              }`}
            >
              Rybičky
            </button>

            <button
              onClick={() => setActivePage(2)}
              className={`btn ${
                activePage === 2 ? "btn-info" : "btn-outline-info"
              }`}
            >
              Akvárium
            </button>
          </div>

          {/*  */}
          <div className="p-0 m-0">
            <div className="row p-0 m-0">
              <h5 className="p-0 m-0">seznam rybiček</h5>
            </div>

            {activePage === 1 && (
              <>
                <div>
                  <Table
                    data={fish}
                    handleDelete={handleDelete}
                    handleEvent={handleEvent}
                  />
                </div>
                <div className="w-100">
                  <InputBox handleAdd={handleAdd} />
                </div>
              </>
            )}
          </div>
          {/*  */}
          <div className="p-0 m-0 ">
            {activePage === 2 && <AqBox data={fish} />}
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default App;
