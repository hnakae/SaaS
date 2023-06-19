"use client";
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { Game } from "@prisma/client";

interface GridProps {
  games: Game[]; // Use the Prisma model type for the `games` prop
}

const Grid: React.FC<GridProps> = ({ games }) => {
  const [rowData] = useState<Game[]>(games);

  const [columnDefs] = useState<ColDef[]>([
    { field: "name", filter: true },
    { field: "player1" },
    { field: "player2" },
    { field: "result" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 900 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
      ></AgGridReact>
    </div>
  );
};

export default Grid;
