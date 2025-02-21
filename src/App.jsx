// App.jsx
import React from "react";
import "./App.css";
import { WalletProvider } from "./components/WalletProvider";
import Header from "./components/Header";

function App() {
  return (
    <WalletProvider>
      <Header />
    </WalletProvider>
  );
}

export default App;
