import React, { Component } from 'react'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import AppBar from 'material-ui/AppBar'


export class Success extends Component {
    continue = e => {
        e.preventDefault();
        // PROCESS FORM //
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
  render() {
      const { values: { firstName, lastName, email, occupation, city, bio} } = this.props;
    return (
    //   <MuiThemeProvider>
    //     <React.Fragment>
            // <AppBar title="Success" />
            <>
            <h1>Thank You For Your Submission</h1>
            <p>You will get an email with further instructions</p>
            </>
    //     </React.Fragment>
    //   </MuiThemeProvider>
    )
  }
}

export default Success