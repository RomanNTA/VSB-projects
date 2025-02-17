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
    const temp = fish.filter((m) => m.id !== idDelete);
    setFish(temp);
  };

  /**
   * metoda handleAdd
   */
  const handleAdd = (addFish) => {
    let tmp = addFish;
    tmp = {
      ...addFish,
      id: fish.length > 0 ? Math.max(...fish.map((d) => d.id)) + 1 : 1,
    };
    let tmp2 = [...fish, tmp];
    setFish(tmp2);



  };

  /**
   * metoda activePageClass
   */
  const activePageClass = (bol) => {
    return bol ? "btn btn-info mx-2" : "btn btn-outline-info mx-2";
  };

  /**
   * Aplikace
   */
  return (
    <div className='container vw-100 vh-100 d-flex flex-direction-row justify-content-center '>
      <div className='vyska nta-body-container my-auto mx-auto  d-flex rounded-5 box-shadow'>
        <div className='row p-5 d-flex '>
          <div className='row p-0 m-0'>
            <h3 className='p-0 m-0 text-info'>
              Aplikace pro plánování rozměrů akvária.
            </h3>
          </div>
          <div className='py-5 '>
            <button
              onClick={() => setActivePage(1)}
              className={activePageClass(activePage === 1)}>
              Rybičky
            </button>

            <button
              onClick={() => setActivePage(2)}
              className={activePageClass(activePage === 2)}>
              Akvárium
            </button>
          </div>

          {/*  */}
          {activePage === 1 && (
            <>
              <div className='p-0 m-0'>
                <div>
                  <Table data={fish} handleDelete={handleDelete} />
                </div>
                <div className='w-100'>
                  <InputBox handleAdd={handleAdd} />
                </div>
              </div>
            </>
          )}
          {/*  */}
          {activePage === 2 && (
            <>
              <div className='p-0 m-0 '>
                <AqBox data={fish} />
              </div>
            </>
          )}
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default App;
