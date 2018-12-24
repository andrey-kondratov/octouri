import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SettingsDialog from './SettingsDialog';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Tooltip } from '@material-ui/core';
import { retryInitialize } from '../actions/OctouriActions';
import Progress from './Progress';

const styles = theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit,
    width: '100%'
  },
  title: {
    paddingLeft: 15,
    flexGrow: 1,
  }
});

class ButtonAppBar extends Component {
  onReconnect = () => {
    this.props.dispatch(retryInitialize());
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar color="default">
          <Toolbar>
            {/* <img alt="octouri" width={48} src="octopus.png" /> */}
            <Typography variant="h5" className={classes.title}>
              {this.props.hostname}
            </Typography>
            {this.props.allowReconnect ? (
              <Tooltip title="Reconnect">
                <IconButton onClick={this.onReconnect}>
                  <Icon>refresh</Icon>
                </IconButton>
              </Tooltip>
            ) : null}
            <SettingsDialog />
          </Toolbar>
          <Progress />
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  url: state.octouri.server.url,
  hostname: state.octouri.server.hostname,
  allowReconnect: !state.octouri.server.connecting && !state.octouri.server.connected
});

export default connect(mapStateToProps)(withStyles(styles)(ButtonAppBar));