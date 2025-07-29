import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectWallet, loginWithWallet } from "../../redux/action/user";
import walletService from "../../utils/walletService";
import toast from "react-hot-toast";

const WalletLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching } = useSelector((state) => state.user);

  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkMetaMaskInstallation();
    checkWalletConnection();
  }, []);

  const checkMetaMaskInstallation = () => {
    const installed = walletService.isMetaMaskInstalled();
    setIsMetaMaskInstalled(installed);
  };

  const checkWalletConnection = async () => {
    try {
      const account = await walletService.getCurrentAccount();
      if (account) {
        setIsWalletConnected(true);
        setConnectedAccount(account);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const handleConnectWallet = async () => {
    if (!isMetaMaskInstalled) {
      toast.error("MetaMask is not installed. Please install MetaMask to use wallet login.");
      return;
    }

    setIsConnecting(true);
    try {
      const result = await dispatch(connectWallet());
      
      if (result.success) {
        setIsWalletConnected(true);
        setConnectedAccount(result.account);
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLoginWithWallet = async () => {
    if (!isWalletConnected || !connectedAccount) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      await dispatch(loginWithWallet(connectedAccount, navigate));
    } catch (error) {
      console.error("Error logging in with wallet:", error);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="font-primary">
      <div className="md:opacity-100 opacity-0 left-0 bottom-10 absolute h-[53%] w-[28%]">
        <img src="/images/login-1.png" />
      </div>
      <div className="w-full h-screen">
        <div className="flex justify-center pt-16">
          <img className="h-12" src="/background/A-consultant-logo.png" />
        </div>
        <div className="flex justify-center pt-6 pl-0 ml-0 rounded-lg">
          <div className="w-96 h-auto shadow-xl rounded bg-white">
            <p className="text-xl text-slate-500 tracking-wide flex justify-center pt-8">
              Connect Your Wallet
            </p>
            
            <div className="flex flex-col gap-6 w-auto pl-[2rem] pt-[2rem] pr-[2rem]">
              
              {/* MetaMask Installation Check */}
              {!isMetaMaskInstalled && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-yellow-800">MetaMask Required</h3>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    MetaMask is not installed. Please install MetaMask extension to use wallet login.
                  </p>
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Download MetaMask →
                  </a>
                </div>
              )}

              {/* Connect Wallet Button */}
              {isMetaMaskInstalled && !isWalletConnected && (
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-center gap-3 p-3 rounded-lg transition-all text-white font-medium tracking-wider ${
                    isConnecting 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-[#20aee3] hover:bg-[#45b8e2]"
                  }`}
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </button>
              )}

              {/* Wallet Connected Status */}
              {isWalletConnected && connectedAccount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-green-800">Wallet Connected</h3>
                  </div>
                  <p className="text-green-700 text-sm mb-3">
                    Address: {formatAddress(connectedAccount)}
                  </p>
                  
                  <button
                    onClick={handleLoginWithWallet}
                    disabled={isFetching}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all text-white font-medium tracking-wider ${
                      isFetching 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isFetching ? "Logging in..." : "Login with Wallet"}
                  </button>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Traditional Login Link */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  Prefer traditional login?
                </p>
                <button
                  onClick={() => navigate('/auth/login')}
                  className="text-[#20aee3] hover:text-[#45b8e2] font-medium text-sm"
                >
                  Login with Username & Password
                </button>
              </div>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate('/auth/register')}
                    className="text-[#20aee3] hover:text-[#45b8e2] font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletLogin; 