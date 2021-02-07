import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1
  },
};

function LinearIndeterminate(props) {
  const { classes } = props;
  return (
    <div hidden={!props.visible} className={classes.root}>
      <LinearProgress />
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  visible: state.octouri.progress.visible
})

export default connect(mapStateToProps)(withStyles(styles)(LinearIndeterminate));