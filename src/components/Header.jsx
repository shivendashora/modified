import React from "react";
import { useWallet } from "./WalletProvider";
import { Button } from "@/components/ui/button"

export default function Header() {
  const { account, connectWallet } = useWallet();

  return (
    <header>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <Button onClick={connectWallet}>Connect</Button>
      )}
    </header>
  );
}