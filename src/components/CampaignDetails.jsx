import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DonateModal from './DonateModal';
import { ethers } from 'ethers';

const CampaignDetails = ({ currentAddress, campaigns, contractInstance }) => {
  const { id } = useParams();
  const campaign = campaigns.find((c) => c.id.toString() === id);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Add error handling for when campaign is not found
  if (!campaign) {
    return <Navigate to="/" replace />;
  }

  const isActiveAndNotGoalReached = campaign.state === "Active" && campaign.currentFundsRaised < campaign.goal;
  const isNotBeneficiary = campaign.beneficiary !== currentAddress;

  const containerStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    minHeight: '100vh'
  };

  const bannerStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginTop: '1.5rem'
  };

  const descriptionStyle = {
    color: '#4b5563',
    fontSize: '1.125rem',
    lineHeight: '1.75',
    marginTop: '1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginTop: '2rem',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem'
  };

  const statCardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  const requestsContainerStyle = {
    marginTop: '2rem',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.75rem'
  };

  const requestCardStyle = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const buttonStyle = {
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none'
  };

  const donateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10b981',
    color: 'white',
    marginTop: '2rem',
    '&:hover': {
      backgroundColor: '#059669'
    }
  };

  const voteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1.5rem',
    '&:hover': {
      backgroundColor: '#2563eb'
    }
  };

  const handleDonate = async (amount) => {
    if (!contractInstance) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsProcessing(true);
      const amountInWei = ethers.utils.parseEther(amount.toString());
      
      const tx = await contractInstance.donateToCampaign(campaign.id, {
        value: amountInWei
      });

      await tx.wait();
      
      alert('Donation successful!');
      setIsDonateModalOpen(false);
      // You might want to refresh the campaign data here
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={containerStyle}>
      <img src={campaign.bannerImageURL} alt={campaign.title} style={bannerStyle} />
      
      <div style={titleStyle}>{campaign.title}</div>
      <div style={descriptionStyle}>{campaign.description}</div>

      <div style={gridStyle}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Goal Amount</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>{campaign.goal} ETH</div>
        </div>
        
        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Funds Raised</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>{campaign.currentFundsRaised} ETH</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Funds Released</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>{campaign.fundsReleased} ETH</div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Start Date</div>
          <div style={{ fontSize: '1.125rem', color: '#1f2937' }}>
            {new Date(campaign.startDate * 1000).toLocaleDateString()}
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>End Date</div>
          <div style={{ fontSize: '1.125rem', color: '#1f2937' }}>
            {new Date(campaign.endDate * 1000).toLocaleDateString()}
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Creator's Wallet</div>
          <div style={{ fontSize: '1rem', color: '#1f2937', wordBreak: 'break-all' }}>{campaign.beneficiary}</div>
        </div>
      </div>

      {campaign.donors.includes(currentAddress) && (
        <div style={requestsContainerStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Fund Release Requests</h2>
          {campaign.releaseRequests.map((request, index) => (
            <div key={index} style={requestCardStyle}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Amount: {request.amount} ETH</div>
                <div style={{ color: '#6b7280' }}>Proof: {request.proofOfUsage}</div>
                <div style={{ 
                  color: request.status === 'Pending' ? '#eab308' : '#10b981',
                  fontWeight: '500',
                  marginTop: '0.5rem'
                }}>
                  Status: {request.status}
                </div>
              </div>
              {request.status === "Pending" && (
                <button style={voteButtonStyle}>Vote</button>
              )}
            </div>
          ))}
        </div>
      )}

      {isNotBeneficiary && isActiveAndNotGoalReached && (
        <div style={{ 
          textAlign: 'center',
          marginTop: '2rem',
          position: 'relative'
        }}>
          <button 
            onClick={() => setIsDonateModalOpen(true)}
            disabled={isProcessing}
            style={{
              background: 'linear-gradient(to right, #3949ab, #1e88e5)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              border: 'none',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isProcessing ? 0.7 : 1,
              transform: 'scale(1)',
              '&:hover': {
                transform: isProcessing ? 'scale(1)' : 'scale(1.05)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }
            }}
          >
            {isProcessing ? 'Processing...' : 'Donate Now'}
          </button>
        </div>
      )}

      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => !isProcessing && setIsDonateModalOpen(false)}
        onDonate={handleDonate}
        campaignTitle={campaign?.title}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default CampaignDetails;
