import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootswatch/dist/pulse/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import Table from "./components/Table/Table";
import rawDeveloper from "./developer.json";
import InputBox from "./components/InputBox/InputBox";
import ScheduleBox from "./components/ScheduleBox/ScheduleBox";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function App() {
  const [dev, setDev] = useState(rawDeveloper.developer);
  const [value, setValue] = useState("1");

  /**
   * metoda handleDelete
   */
  const handleDelete = (idDelete) => {
    const temp = dev.filter((m) => m.id !== idDelete);
    setDev(temp);
  };

  /**
   * metoda handleAdd
   */
  const handleAdd = (addDev) => {
    let tmp = addDev;
    tmp = {
      ...addDev,
      id: dev.length > 0 ? Math.max(...dev.map((d) => d.id)) + 1 : 1,
    };
    let tmp2 = [...dev, tmp];
    setDev(tmp2);
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
      className="container-fluid d-flex flex-direction-row justify-content-center col-md-12 col-lg-8
    mt-sm-0 mt-md-3 mt-lg-5"
    >
      <div className="vyska nta-body-container my-auto mx-auto  d-flex rounded-5 box-shadow">
        <div className="row d-flex ">
          {/*  */}
          <div className="row m-0">
            <h3 className="p-0 m-0 fs-md-5 pt-5 text-info mb-4 text-center">
              &nbsp;&nbsp;Aplikace pro plánování programování
            </h3>
          </div>
          {/*  */}
          <div className="p-3">
            <Box
              sx={{ width: "100%", minHeight: "550px", typography: "body2" }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Programátoři" value="1" />
                    <Tab label="Plánování aplikací" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Table data={dev} handleDelete={handleDelete} />
                  <InputBox handleAdd={handleAdd} />
                </TabPanel>
                <TabPanel value="2">
                  <ScheduleBox data={dev} />
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
