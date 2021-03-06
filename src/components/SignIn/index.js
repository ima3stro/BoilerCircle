import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants';
import './index.css'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


const SignInPage = ({ history }) =>
  <div className="pageBackground">
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;
    const style = {
      height: 500,
      width: 350,
      margin: 50,
      padding: 60,
      textAlign: 'center',
      display: 'inline-block'
    };
    const isInvalid =
      password === '' ||
      email === '';
      const muiTheme = getMuiTheme({
      	"palette": {
              "primary1Color": "#ffeb3b",
              "primary2Color": "#ffeb3b",
              "primary3Color": "#212121",
              "accent1Color": "#fff9c4",
              "accent2Color": "#eceff1",
              "accent3Color": "rgba(255, 255, 255, 0.87)",
              "borderColor": "#ffdc52",
              "canvasColor": "#424242",
              "textColor": "#ffdc52"
          },
          "appBar": {
              "textColor": "#ffdc52",
              "color": "#616161"
          },
          "menuItem": {
              "selectedTextColor": "rgba(0, 0, 0, 0.26)",
              "hoverColor": "#616161",
              "rightIconDesktopFill": "rgba(0, 0, 0, 0.26)"
          }
      });
      const buttonStyle = {
        margin: 12,
      }
    return (
      <div>
      <div>

         </div>
        <div className='loginBackground'>
        <h1 className="loginHeader">LOG IN</h1>
          <form onSubmit={this.onSubmit}>
           <div className="emailBar">
              <input
                value={email}
                className="textBox"
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
              />
           </ div>
           <div className="emailBar">
              <input
                className="textBox"
                value={password}
                onChange={event => this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"
              />
           </ div>
           <div className = "passLink">
           <PasswordForgetLink />
           </div>
          <div className="centerLogIn">
           <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton backgroundColor = "#424242" label="Log In" style={buttonStyle} onClick={this.onSubmit}/>
            </MuiThemeProvider>
           </div>

         </form>

       </div>
       <div className="move">
         <SignUpLink />
         { error && <h1>{error.message}</h1> }
         </div>
      </div>

    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
