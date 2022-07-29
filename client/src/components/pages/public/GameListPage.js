import React, { useEffect, useState } from 'react';
import useGameList from '../../_factors/hooks/data/useGameList.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const GameListPage = () => {
  const { gameList } = useGameList();
  const [displayedGames, setDisplayedGames] = useState([]);

  const [selectedGameConsoles, setSelectedGameConsoles] = useState(["GB", "GB Series"]);
  const [filterText, setFilterText] = useState(null);

  const filterList = () => {
    if(gameList){
      return gameList.filter(game => selectedGameConsoles.includes(game.console));
    }

    return [];
  };

  const filterByText = () => {

  };

  return (
    <div style={{overflow: "auto"}} className="game-list-page-wrapper">
      <Box m={0} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button style={{pull: "right !important"}} variant="contained" endIcon={<FilterAltIcon />}>
          Filter
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{
            minWidth: 650,
            backgroundColor: "rgb(200, 200, 200, 0.3) !important"
          }} aria-label="game list table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Console</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedGames.map((row) => (
              <TableRow key={row.id+"-"+row.name}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.console}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameListPage;
