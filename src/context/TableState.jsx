/* eslint-disable */
import React, { createContext, useState } from "react";

export const authContext = createContext();

export default function TableState({ children }) {
  const [upaValayaTable, setUpaValayaTable] = useState(false);
  const [valayaTable, setValayaTable] = useState(false);
  const [areaTable, setAreaTable] = useState(false);
  const { branchinAreaTable, setBranchinAreaTable } = useState(false);;


  return (
    <authContext.Provider
      value={{
        upaValayaTable,
        setUpaValayaTable,
        valayaTable,
        setValayaTable,
        areaTable,
        setAreaTable,
        branchinAreaTable, setBranchinAreaTable,

      }}
    >
      {children}
    </authContext.Provider>
  );
}
