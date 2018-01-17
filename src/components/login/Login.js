import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import {GOOGLE_CLIENT_ID} from '../../config';
import {gConnect} from '../../actions/auth';
import './Login.scss';

class Login extends Component {
    static propTypes = {
        gConnect: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className='login-component'>
                <div className="login-wrapper">
                    <div className="login-inner">
                        <h5>Login with Google</h5>
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            responseType='code'
                            onSuccess={this.onSuccess.bind(this)}
                            onFailure={this.onFailure.bind(this)}
                        />
                        <p id="wait" hidden>Please wait...</p>
                    </div>
                </div>
            </div>
        )
    }

    async onSuccess(res) {
        const {gConnect, history} = this.props;
        await gConnect(res.code);
        history.replace('/');
    }

    onFailure(error) {
        console.log(error);
    }
}

const mapStateToProps = () => {
    return {}
};

export default connect(mapStateToProps, {
    gConnect
})(Login);
