import logo from "./logo.svg";
import "./App.css";

export function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ "fontFamily": '"Work Sans"' }}>hello world</p>
      </header>
    </div>
  );
}

