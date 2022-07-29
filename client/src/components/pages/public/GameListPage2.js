import React, { useEffect, useState } from 'react';
import useGameList from '../../_factors/hooks/data/useGameList.js';
import { DataGrid, GridToolbar, getGridStringOperators } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'Id', minWidth: 80, flex: 0.3 },
  {
    field: 'name',
    headerName: 'Name', minWidth: 100, flex: 1,
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

  // Multi-filtering is only available in MUI x Pro
  return (
    <div style={{ height: "100%" }} className="game-list-page-wrapper">
      <div style={{ height: 600 }}>
        <DataGrid disableColumnSelector
          components={{
            FilterPanelDeleteIcon: () =>
              <Button variant="outlined" style={{width: '100%'}}>
                Clear Filter
              </Button>,
            Toolbar: GridToolbar
          }}
          componentsProps={{
              panel: { sx: {
                  '& .MuiDataGrid-filterForm': {
                    display: 'flex', flexDirection: 'column'
                  },
                  '& .MuiFormControl-root': {
                    width: '100%',
                    marginBottom: 2
                  }
                },
              },
            }}
           sx={{
              boxShadow: 2,
              '& .MuiDataGrid-menuIcon': {
                visibility: "visible",
                width: "auto"
              },
              '& .MuiDataGrid-cell': { overflowX: "auto !important" },
              '& .MuiBadge-badge': {visibility: "hidden !important"}
            }}
            rows={gameList ? gameList : []} columns={columns} />
      </div>
    </div>
  );
};

export default GameListPage;
