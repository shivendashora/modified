// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { WalletProvider } from "./components/WalletProvider";
import Header from "./components/Header";
import CampaignCard from './components/CampaignCard.jsx';
import CampaignDetails from './components/CampaignDetails';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('0');

  const connectWallet = async () => {
    // Implement wallet connection logic here
    setIsConnected(true);
    setAccountAddress('0x123...'); // Example address
    setAccountBalance('1.5'); // Example balance
  };

  // Sample campaign data array
  const sampleCampaigns = [
    {
      id: 1,
      title: "Clean Energy Project",
      description: "A project to promote clean energy solutions and sustainable development in rural areas through solar power implementation.",
      state: "Active",
      currentFundsRaised: 2.5,
      goal: 5.0,
      startDate: Math.floor(Date.now() / 1000), // Unix timestamp
      endDate: Math.floor(new Date('2024-12-31').getTime() / 1000), // Unix timestamp
      bannerImageURL: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop",
      beneficiary: "0x123...", // Add beneficiary address
      fundsReleased: 0,
      donors: [],
      releaseRequests: []
    },
    {
      id: 2,
      title: "Community Garden Initiative",
      description: "Creating sustainable community gardens to promote food security and bring communities together.",
      state: "Active",
      currentFundsRaised: 1.2,
      goal: 3.0,
      startDate: Math.floor(Date.now() / 1000), // Unix timestamp
      endDate: Math.floor(new Date('2024-11-30').getTime() / 1000), // Unix timestamp
      bannerImageURL: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
      beneficiary: "0x123...", // Add beneficiary address
      fundsReleased: 0,
      donors: [],
      releaseRequests: []
    },
    {
      id: 3,
      title: "Tech Education for Youth",
      description: "Providing coding and technology education to underprivileged youth to bridge the digital divide.",
      state: "Active",
      currentFundsRaised: 4.0,
      goal: 6.0,
      startDate: Math.floor(Date.now() / 1000), // Unix timestamp
      endDate: Math.floor(new Date('2024-10-15').getTime() / 1000), // Unix timestamp
      bannerImageURL: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop",
      beneficiary: "0x123...", // Add beneficiary address
      fundsReleased: 0,
      donors: [],
      releaseRequests: []
    }
  ];

  const containerStyle = {
    padding: '2rem',
    marginTop: '100px', // Add margin to account for fixed header
    minHeight: 'calc(100vh - 80px)', // Adjust height
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1565c0',
    marginBottom: '2rem',
    textAlign: 'center',
    maxWidth: '1400px',
    margin: '0 auto 2rem auto',
    padding: '0 1rem'
  };

  const cardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1400px', // Add max-width for larger screens
    margin: '0 auto',
    padding: '1rem'
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <WalletProvider>
            <Header 
              isConnected={isConnected}
              connectWallet={connectWallet}
              accountAddress={accountAddress}
              accountBalance={accountBalance}
            />
            <div style={containerStyle}>
              <h1 style={titleStyle}>Active Campaigns</h1>
              <div style={cardGridStyle}>
                {sampleCampaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          </WalletProvider>
        } />
        <Route 
          path="/campaign/:id" 
          element={
            <WalletProvider>
              <Header 
                isConnected={isConnected}
                connectWallet={connectWallet}
                accountAddress={accountAddress}
                accountBalance={accountBalance}
              />
              <CampaignDetails 
                currentAddress={accountAddress}
                campaigns={sampleCampaigns}
              />
            </WalletProvider>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
