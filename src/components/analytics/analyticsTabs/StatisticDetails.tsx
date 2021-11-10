// react
import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// THIS PROJECT
// components
import AccordionPaper from '../../common/AccordionPaper';
import FormatTime from '../../common/FormatTime';
import FullNameDialog from './FullNameDialog';
import { FlexStart } from '../../common/flex';
// types
import { DetailedAssignmentStats } from '../../../types/Statistics';

const useStyles = makeStyles({
  list: {
    width: '100%',
  },
  accordionDetails: {
    padding: 0,
  },
  shortData: {
    minWidth: 50,
    textAlign: 'left',
  },
  longData: {
    minWidth: 50,
  },
  personPlaceLabel: {
    width: 'clamp(150px, 50vw, 200px)',
    whiteSpace: 'nowrap',
  },
  subLabel: {
    maxWidth: 175,
    maxHeight: 20,
    overflowWrap: 'break-word',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    marginRight: 4,
  },
  timeDifferenceLabel: {
    fontSize: 10,
  },
  tableContainer: {
    width: '100%',
  },
  table: {
    minWidth: 450,
  },
});

interface StatisticDetailsProps {
  statistics: DetailedAssignmentStats[];
};
export default function StatisticDetails(props: StatisticDetailsProps): React.ReactElement {
  const classes = useStyles();
  const { statistics } = props;

  const [openFullNameDialog, setOpenFullNameDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClickFullName = (value: string): void => {
    setOpenFullNameDialog(true);
    setSelectedValue(value);
  };

  const handleClose = () => {
    setOpenFullNameDialog(false);
    setSelectedValue('');
  };

  return (
    <>
      <List className={classes.list}>
        {statistics.map((doc: DetailedAssignmentStats) => {
          return <div key={doc.name}>
            <AccordionPaper>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{doc.name} ({doc.count})</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <TableContainer className={classes.tableContainer} component={Paper}>
                  <Table className={classes.table} size='small' aria-label='stage statistics table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Person/Place</TableCell>
                        <TableCell>Avg</TableCell>
                        <TableCell>Median</TableCell>
                        <TableCell>Mode  <span className={classes.timeDifferenceLabel}>(days)</span></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component='th' scope='row'>All ({doc.count})</TableCell>
                        <TableCell>
                          <div className={classes.shortData}>
                            <FormatTime milliseconds={doc.average} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.shortData}>
                            <FormatTime milliseconds={doc.median} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.longData}>
                            {doc.mode} / {doc.modePercent}%
                          </div>
                        </TableCell>
                      </TableRow>
                      {doc.portions.map(doc => {
                        return <TableRow key={doc.name}>
                          <TableCell component='th' scope='row' onClick={() => handleClickFullName(doc.name)}>
                            <div className={classes.personPlaceLabel}>
                              <FlexStart whiteSpace='nowrap'>
                                <div className={classes.subLabel}>{doc.name} </div>
                                <div> ({doc.count})</div>
                              </FlexStart>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={classes.shortData}>
                              <FormatTime milliseconds={doc.average} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={classes.shortData}>
                              <FormatTime milliseconds={doc.median} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={classes.longData}>
                              {doc.mode} / {doc.modePercent}%
                            </div>
                          </TableCell>
                        </TableRow>;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </AccordionPaper>
          </div>;
        })}
      </List>
      <FullNameDialog selectedValue={selectedValue} open={openFullNameDialog} onClose={handleClose} />
    </>
  );
}