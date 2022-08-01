import React, { useEffect, useState } from 'react';
import useGameList from '../../_factors/hooks/data/useGameList.js';
import { DataGrid, GridToolbarContainer, GridToolbarExport,
         GridToolbarDensitySelector, GridToolbarFilterButton,
         GridToolbarColumnsButton, getGridStringOperators } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

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
  },
  { field: 'status', headerName: 'Status', minWidth: 80, flex: 0.3 },
];

function RemovePrintToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton style={{ color: '#00008B' }} />
      <GridToolbarFilterButton style={{ color: '#00008B' }} />
      <GridToolbarDensitySelector style={{ color: '#00008B' }} />
      <GridToolbarExport style={{ color: '#00008B' }} printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

const GameListPage = () => {
  const { gameList } = useGameList();

  useEffect(() => {
    document.title = 'Tometech - Game List';
  }, []);

  // Multi-filtering is only available in MUI x Pro
  return (
    <div style={{ height: "100%" }} className="game-list-page-wrapper">
      <div style={{ height: 600, backgroundColor: 'rgb(255,188,217, 0.4)' }}>
        <DataGrid
          components={{
            FilterPanelDeleteIcon: () => <FilterAltOffIcon />,
            Toolbar: RemovePrintToolbar
          }}
          componentsProps={{
              panel: { sx: {
                  '& .MuiDataGrid-filterForm': { display: 'flex', flexDirection: 'column' },
                  '& .MuiFormControl-root': { width: '100%', marginBottom: 2 }
              }}
            }}
           sx={{
              '& .MuiDataGrid-menuIcon': { visibility: "visible", width: "auto" },
              '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid #a0a0a0', borderTop: '1px solid #a0a0a0' },
              '& .MuiDataGrid-cell': { borderBottom: '1px solid #c0c0c0', overflowX: "auto !important" },
              '& .MuiBadge-badge': {visibility: "hidden !important"},
              '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #a0a0a0' }
            }}
            rows={gameList ? gameList : []} columns={columns} />
      </div>
    </div>
  );
};

export default GameListPage;
