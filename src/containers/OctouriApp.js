import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { ButtonAppBar, EnvironmentSelect, MachinesTable } from '../components';

class OctouriApp extends Component {
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <ButtonAppBar />
          </Grid>
          <Grid item xs={4}>
            <EnvironmentSelect />
          </Grid>
          <Grid item xs={12}>
            <MachinesTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default OctouriApp;