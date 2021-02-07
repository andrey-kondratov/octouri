import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon'
import { Tooltip } from '@material-ui/core';

import { initialize, hideSettings, showSettings } from '../actions/OctouriActions';
import { DEFAULT_URL, DEFAULT_API_KEY } from '../constants/defaults';
const settings = window.require('electron-settings');

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
            url: props.url || settings.get('url', DEFAULT_URL),
            apiKey: props.apiKey || settings.get('apiKey', DEFAULT_API_KEY)
        }

        this.onChange = this.onChange.bind(this);
        this.onApply = this.onApply.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initialize(this.state.url, this.state.apiKey));
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onOpen = () => {
        this.props.dispatch(showSettings());
    };

    onClose = () => {
        this.props.dispatch(hideSettings());
    };

    onApply = () => {
        const url = this.state.url;
        const apiKey = this.state.apiKey;

        settings.set('url', url);
        settings.set('apiKey', apiKey);

        this.props.dispatch(initialize(url, apiKey));
    };

    render() {
        const { open, url, apiKey } = this.state;

        return (
            <div>
                <Tooltip title="Connection settings">
                    <Button color="inherit" onClick={this.onOpen} >
                        <Icon>settings</Icon>
                    </Button>
                </Tooltip>
                <Dialog
                    open={open}
                    onClose={this.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Connection settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Octouri uses Octopus Deploy HTTP API to fetch data for you. Please, enter the URL and an API key.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="URL"
                            placeholder="https://octopus.example.com"
                            helperText="The URL of your Octopus installation, starting with http:// or https://"
                            type="url"
                            defaultValue={url}
                            onChange={this.onChange}
                            name="url"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            id="apiKey"
                            label="API key"
                            placeholder="API-123456789ABCDEFGHJKLMNOPQ"
                            helperText="You can get your API key from your profile page on the Octopus web portal."
                            type="text"
                            defaultValue={apiKey}
                            onChange={this.onChange}
                            name="apiKey"
                            fullWidth
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose}>Cancel</Button>
                        <Button onClick={this.onApply} color="primary">Apply</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.octouri.showSettings,
    url: state.octouri.server.url,
    apiKey: state.octouri.user.apiKey
});

export default connect(mapStateToProps)(SettingsDialog);