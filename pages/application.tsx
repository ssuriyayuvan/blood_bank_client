import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/EmployeeRegister.module.css'

type FormData = {
    name: string,
    dob: string,
    phone: string,
    bloodType: string,
    gender: string,
    qn_1: boolean,
    qn_2: boolean,
    qn_3: boolean
    
}

const Application = () => {
  // const { connectWallet } = useConnection();
  const [form, setForm] = useState<FormData>({name: '', dob: '', phone: '', bloodType: '', qn_1: false, qn_2: false, gender: '', qn_3: false})


  const submitEmployeeRegister =(e: any) => {
    e.preventDefault();
    console.log("Form Data is: ", form)
  }


  return (
    <div className={styles.empRegister}>
      <h2>Donar Form</h2>
      <form className={styles.empregForm} onSubmit={submitEmployeeRegister}>
        <input
          name="name"
          type="text "
          placeholder="Full Name"
          onChange={(e) => {
            setForm({...form, name: e.target.value});
          }}
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="DOB"
          onChange={(e) => {
            setForm({...form, dob: e.target.value});
          }}
          required
        />
        <input
          name="phone_no"
          type="text"
          placeholder="Phone Number"
          onChange={(e) => {
            setForm({...form, phone: e.target.value});
          }}
        />
        <select name="gender" onChange={(e) => setForm({...form, gender: e.target.value})}>
            <option> --- Select Gender --- </option>
            <option value={'male'}>Male</option>
            <option value={'femal'}>Female</option>
            <option value={'other'}>Other</option>
        </select>
        <select name="blood_type" onChange={(e) => setForm({...form, bloodType: e.target.value})}>
            <option> --- Select Blood Group --- </option>
            <option value={'op'}>O +ve</option>
            <option value={'on'}>O -ve</option>
            <option value={'bp'}>B +ve</option>
            <option value={'bn'}>B -ve</option>
        </select>
        <h3 style={{marginTop: '13px'}}>TEMPORARY DEFERRAL, IN THE PAST 12 MONTHS HAVE YOU</h3>
        <div>
        <label htmlFor="qn_1">
        Received Tranfusion of Blood or its products?
        </label>
        <input
          name="qn_1"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_1: !(form.qn_1)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had exposure to tattoos, acupunture or body piercing?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        ndergone any major surgery or met with any major accident?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_3: !(form.qn_3)});
          }}
        />
        </div>
        <h3>IN THE PAST 6 MONTHS HAVE YOU EVER</h3>
        <div>
        <label htmlFor="qn_2">
        Suffered from Typhoid /Cholera / Acute infection of kidney or Bladder?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had delivery / had pregnancy / any abortion / or been breast feeding?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Had any major surgery or met with any minor accident?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <h3>PERMANENT DEFERRAL</h3>
        <div>
        <label htmlFor="qn_2">
        Uncontrolled blood pressure or stroke?
        Chronic liver disease or endocrine disorders?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Chronic liver disease or endocrine disorders?
        Major surgeries for kidney, heart, liver or brain?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <div>
        <label htmlFor="qn_2">
        Major surgeries for kidney, heart, liver or brain?
        </label>
        <input
          name="qn_2"
          type="checkbox"
          placeholder="Wallet Addres"
          onChange={(e) => {
            setForm({...form, qn_2: !(form.qn_2)});
          }}
        />
        </div>
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default Application;
