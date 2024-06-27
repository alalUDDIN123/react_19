import { useState } from "react";
import "./App.css";

const App = () => {
  return (
    <>
      <ToggleSwitch />
    </>
  );
};

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false)

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  const isToogle = isOn ? 'on' : 'off';
  return (
    <>
      <h2 className="switch-state">Toggle Switch</h2>
      <div className="toggle-switch" onClick={handleToggle} >
        <div className={`switch ${isToogle}`}></div>
      </div>
    </>
  );
};

export default App;
