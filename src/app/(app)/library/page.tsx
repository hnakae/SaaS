"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

export default function Library() {
  //   const gridRef = useRef<AgGridReact | null>(null); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price", filter: true },
    { field: "result", filter: true },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from server
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  //   DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  // Example using Grid's API
  //   const buttonListener = useCallback(() => {
  //     if (gridRef.current && gridRef.current.api) {
  //       // Add null and undefined check
  //       gridRef.current.api.deselectAll();
  //     }
  //   }, []);

  return (
    <div className="min-h-screen flex flex-col py-6 px-12 ">
      <div>
        {/* Example using Grid's API */}
        {/* <button onClick={buttonListener}>Deselect all</button> */}

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine" style={{ width: 700, height: 500 }}>
          <AgGridReact
            // ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid
          />
        </div>
      </div>
      <div>
        <button className="bg-slate-300 px-4 py-2 mt-4 rounded-sm">
          {" "}
          Add Kifu
        </button>
      </div>
    </div>
  );
}
