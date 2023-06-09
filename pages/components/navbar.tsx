import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Navbar.module.css'
import { useRouter } from "next/router";
import Web3 from "web3";
import Blood from "../../lib/contracts/BloodD.json";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, updateContract, updateDisconnect, updateUserId, updateWeb3 } from "@/apps/authSlice";
import { RootState } from "@/apps/store";

const defaultChainId = 1337;

export const supportedNetworks = {
  1337: {
      name: 'Ganache Local',
      tokenSymbol: 'ETH',
      rpcURL: 'http://localhost:8545',
      bloodContract: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
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

const Navbar = () => {
const dispatch = useDispatch();
const { address } = useSelector((state: RootState) => state.authReducer)

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
        // setConnectionState({ ...connectionState, web3, bloodContract });
    } catch (e: any) {
        console.log("useConnection : initiate Error -> ", e.toString());
        // setConnectionState({ ...connectionState, error: e.toString() });
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
        let userId = await bloodContract.methods.address2DonorID(address).call();
        console.log("user ID", userId)
        dispatch(updateContract(bloodContract));
        dispatch(updateUserId(userId));
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


        // setConnectionState({ ...connectionState, web3, address, chainId , bloodContract});
    } catch (e: any) {
        if (e.code === 4001) {
            // eslint-disable-next-line 
            e = 'Denied Browser Wallet Access';
        }
        console.log("useConnection : connectWallet Error -> ", e.toString());
        // setConnectionState({ ...connectionState, error: e.toString() });
    }
}

const disConnectWallet = () => {
    dispatch(updateDisconnect());
    // setConnectionState({
    //     ...connectionState, web3: null,
    //     chainId: defaultChainId,
    //     address: null,
    //     bloodContract: null,
    //     error: null
    // });
  }

    const truncateAddress = (fullAddress: string) => {
        // const address = formatAddress(fullAddress)
        const address = fullAddress;
        const hex = address.slice(0, 2)
        const start = address.slice(2, 6)
        const end = address.slice(-4)
        return `${hex}${start}...${end}`
      }

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image src="/assets/img/bdrop.png" alt="bdroplogo" width={45} height={45} />
      </Link>
      <Link href="/donate">DONATE/REQUEST</Link>
      <Link href="/loginas">Dashboard</Link>
      <Link href='/buy'>Buy</Link>
      {/* <Search /> */}
      <div>
      {!address ? <a href="#">
        <button onClick={connectWallet}>Connect Wallet</button>
      </a> : 
      <>
      <Link href={"#"}>{truncateAddress(address)}</Link>
      <button onClick={disConnectWallet}>Disconnect</button>
      </>
      }
    </div>
    </nav>
  );
};

export default Navbar;
