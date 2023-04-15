import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/HandleRequest.module.css'

type RequestData = {
    form_id: number,
    blood_group: string,
    unit: number
}

const ApplicationRequest = ({connectionState, connectWallet}: any) => {
    const [RequestTable, setRequestTable] = useState<RequestData[]>([]);

    useEffect(() => {
        setRequestTable([{
            form_id: 100,
            blood_group: 'O+ve',
            unit: 1
        },
        {
            form_id: 101,
            blood_group: 'B+ve',
            unit: 1
        }
    ])
    }, [])

  return (
    <div className={styles.handleRequest}>
      <h1>APPLICATION REQUEST TABLE</h1>
      <table className={styles.reqTable}>
        <thead>
          <th>ID</th>
          {/* <th>BLOOD GROUP</th> */}
          <th>FORM ID</th>
        </thead>
        <tbody>
          {RequestTable.map((request: any, i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                {/* <td>{request.blood_group}</td> */}
                <td>{request.form_id}</td>
                <button>
                  ACCEPT   
                </button>
                <button>
                  REJECT
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationRequest;
