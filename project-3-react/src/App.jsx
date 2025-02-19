import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootswatch/dist/spacelab/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import Table from "./components/Table/Table";
import rawFish from "./fish.json";
import InputBox from "./components/InputBox/InputBox";
import AqBox from "./components/AqBox/AqBox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function App() {
  const [fish, setFish] = useState(rawFish.fish);
  const [activePage, setActivePage] = useState(1);
  const [value, setValue] = useState("1");

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
   * metoda handleChange
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * Aplikace
   */
  return (
    <div
      className='container-fluid d-flex flex-direction-row justify-content-center col-md-12 col-lg-8
    mt-sm-0 mt-md-3 mt-lg-5'>
      <div className='vyska nta-body-container my-auto mx-auto  d-flex rounded-5 box-shadow'>
        <div className='row d-flex '>
          {/*  */}
          <div className='row m-0'>
            <h3 className='p-0 m-0 fs-md-5 pt-5 text-info mb-4 text-center'>
              &nbsp;&nbsp;Aplikace pro plánování rozměrů akvária.
            </h3>
          </div>
          {/*  */}
          <div className='p-3'>
            <Box
              sx={{ width: "100%", minHeight: "550px", typography: "body2" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label='Rybičky' value='1' />
                    <Tab label='Akvárium' value='2' />
                  </TabList>
                </Box>
                <TabPanel value='1'>
                  <Table data={fish} handleDelete={handleDelete} />
                  <InputBox handleAdd={handleAdd} />
                </TabPanel>
                <TabPanel value='2'>
                  <AqBox data={fish} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
