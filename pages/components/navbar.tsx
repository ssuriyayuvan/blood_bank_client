import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Navbar.module.css'
import { useRouter } from "next/router";

const Navbar = ({connectionState, connectWallet, disConnectWallet}: any) => {
    // const {bloodContract, address} = connectionState
    // const router = useRouter()
    useEffect(() => {
        // console.log("address:", !address, address)
        // if(!address) 
        // {
        //     router.push('/')
        //     return
        // }
        // init()
    }, [])

    // const init = async () => {
    //     // console.log(await bloodContract.methods.COLLECTOR_ROLE().call())
    // }

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
      <Link href="/dashboard">Dashboard</Link>
      {/* <Search /> */}
      <div>
      {!connectionState?.address ? <a href="#">
        <button onClick={connectWallet}>Connect Wallet</button>
      </a> : 
      <>
      <Link href={"#"}>{truncateAddress(connectionState.address)}</Link>
      <button onClick={disConnectWallet}>Disconnect</button>
      </>
      }
    </div>
    </nav>
  );
};

export default Navbar;
