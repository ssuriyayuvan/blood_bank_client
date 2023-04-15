import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './components/navbar'
import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import { useRouter } from 'next/router';
import Blood from "../lib/contracts/BloodD.json";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/apps/store';
import { updateAddress, updateContract, updateWeb3 } from '@/apps/authSlice';
// import dao from "../contracts/Dao.json"
const defaultChainId = 1337;

const ConnectionContext: any = createContext(null);

export function useConnection() {
    return useContext(ConnectionContext);
}

export const supportedNetworks = {
  1337: {
      name: 'Ganache Local',
      tokenSymbol: 'ETH',
      rpcURL: 'http://localhost:8545',
      bloodContract: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
      // daoContract: dao.networks[1337] ? dao.networks[1337].address : ''
  },
  5: {
      name: 'Mumbai Polygon Testnet',
      tokenSymbol: 'MATIC',
      rpcURL: 'https://rpc-mumbai.maticvigil.com/',
      // crowdFundingContract: crowdFunding.networks[80001] ? crowdFunding.networks[80001].address : '',
      // daoContract: dao.networks[80001] ? dao.networks[80001].address : ''
  }
}

export default function App({ Component, pageProps }: AppProps) {
  
  const { web3 } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch()
  const [connectionState, setConnectionState] = useState({
    web3: null,
    chainId: defaultChainId,
    address: null,
    bloodContract: null,
    error: null,
});

const router = useRouter()

const initiate = async () => {
    try {
        // Use local web3 object by default before user connects metamask
        const provider = new Web3.providers.HttpProvider(supportedNetworks[defaultChainId].rpcURL);
        const web3: any = new Web3(provider);

        const bloodContract = new web3.eth.Contract(
            Blood.abi,
            supportedNetworks[defaultChainId].bloodContract
        );
        // console.log(bloodContract)
        dispatch(updateWeb3(web3));
        setConnectionState({ ...connectionState, web3, bloodContract });
    } catch (e: any) {
        console.log("useConnection : initiate Error -> ", e.toString());
        setConnectionState({ ...connectionState, error: e.toString() });
    }
};

useEffect(() => {
  initiate()
},[])

const connectWallet = async () => {
    try {
      console.log("wallet connect called...")
        if ((!window as any)?.ethereum) {
            throw new Error("Browser Wallet Not Found");
        }
        console.log("web3")
        // const web3: any = new Web3((window as any).ethereum);
        const [address] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        console.log(address)
        const provider = new Web3.providers.HttpProvider(supportedNetworks[defaultChainId].rpcURL);
        const web3: any = new Web3(provider);
        dispatch(updateWeb3(web3))
        dispatch(updateAddress(address))
        const bloodContract = new web3.eth.Contract(
            Blood.abi,
            supportedNetworks[defaultChainId].bloodContract
        );
        dispatch(updateContract(bloodContract));
        console.log("bloodContract After Connect: ", address)
        localStorage.setItem('isAdmin', 'false')
        router.push('/loginas')
        const chainId = await web3.eth.net.getId();
        console.log(chainId)
        if (!(supportedNetworks as any)[chainId]) {
            throw new Error("Use Correct Network")
        }
        // const crowdFundingContract = new web3.eth.Contract(
        //     crowdFunding.abi,
        //     supportedNetworks[chainId].crowdFundingContract
        // );


        setConnectionState({ ...connectionState, web3, address, chainId , bloodContract});
    } catch (e: any) {
        if (e.code === 4001) {
            // eslint-disable-next-line 
            e = 'Denied Browser Wallet Access';
        }
        console.log("useConnection : connectWallet Error -> ", e.toString());
        setConnectionState({ ...connectionState, error: e.toString() });
    }
}

const disConnectWallet = () => {
    setConnectionState({
        ...connectionState, web3: null,
        chainId: defaultChainId,
        address: null,
        bloodContract: null,
        error: null
    });
}

  return  <>
  <Navbar owner='test...'  connectionState={connectionState} setConnectionState={setConnectionState} connectWallet={connectWallet} disConnectWallet={disConnectWallet} />
  <ConnectionContext.Provider value={{ connectionState, setConnectionState, connectWallet }}>
    <Component {...pageProps} owner="owner..." connectionState={connectionState} setConnectionState={setConnectionState} />
    </ConnectionContext.Provider>
  </>
  
}
