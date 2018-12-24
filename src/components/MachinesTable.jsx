import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { Chip, Typography, Icon } from '@material-ui/core';
import ClickToSelect from '@mapbox/react-click-to-select';
import { openExplorer, openRDP } from '../actions/OctouriActions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3
    }
});

function getStatusColor(row) {
    if (row.status !== 'Online' || row.healthStatus === 'Unavailable') {
        return 'textSecondary';
    }

    if (row.healthStatus !== 'Healthy') {
        return 'error';
    }

    return 'default';
}

function MachinesTable(props) {
    const { classes, machines, dispatch } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>IP address</TableCell>
                        <TableCell>Role(s)</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!machines || !machines.length ? (
                        <TableRow key={1}>
                            <TableCell component="th" scope="row">{"No results. "}</TableCell>
                        </TableRow>
                    ) : null}
                    {machines && machines.map(row => {
                        return (
                            <TableRow key={row.id} hover={true}>
                                <TableCell component="th" scope="row">
                                    <Tooltip title={row.healthStatus}>
                                        <Typography variant="body2" color={getStatusColor(row)}>
                                            <ClickToSelect>
                                                {row.ip}
                                            </ClickToSelect>
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    {row.roles.map(role => (
                                        <Chip key={role} label={role} style={{ marginRight: 2 }} />))}
                                </TableCell>
                                <TableCell align="right">
                                    <span>
                                        <Tooltip title="Start RDP session">
                                            <Button onClick={() => dispatch(openRDP(row))}>RDP</Button>
                                        </Tooltip>
                                        <Tooltip title="Browse C:\">
                                            <Button onClick={() => dispatch(openExplorer(row))}>C:\</Button>
                                        </Tooltip>
                                    </span>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

MachinesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    machines: state.octouri.environment.machines
});

export default connect(mapStateToProps)(withStyles(styles)(MachinesTable));