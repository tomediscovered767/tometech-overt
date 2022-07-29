import React, { useEffect, useState } from 'react';
import useGameList from '../../_factors/hooks/data/useGameList.js';
import { DataGrid, GridToolbar, getGridStringOperators } from '@mui/x-data-grid';

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ['equals', 'contains', 'startsWith' ].includes(value),
);

const columns = [
  { field: 'id', headerName: 'Id', minWidth: 80, flex: 0.3 },
  {
    field: 'name',
    headerName: 'Name',
    editable: true, minWidth: 100, flex: 1,
    renderCell: (params) => params.value
  },
  {
    field: 'console', type: 'singleSelect',
    valueOptions: ['GB Series', 'GB', 'GBC', 'GBA', 'SNES', 'PS1', 'Gamecube', 'N64'],
    headerName: 'Console',
    editable: true, minWidth: 100, flex: 0.3
  }
];

const GameListPage = () => {
  const { gameList } = useGameList();

  return (
    <div style={{ height: "100%" }} className="game-list-page-wrapper">
      <div style={{ height: 600 }}>
        <DataGrid disableColumnSelector sx={{
            boxShadow: 2,
            '& .MuiDataGrid-menuIcon': {
              visibility: "visible",
              width: "auto"
            },
            '& .MuiDataGrid-cell': { overflowX: "auto !important" },
          }}
          componentsProps={{ filterPanel: { linkOperators: ['and'] } }}
          rows={gameList ? gameList : []} columns={columns} />
      </div>
    </div>
  );
};

export default GameListPage;
