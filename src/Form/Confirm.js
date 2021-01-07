import React, { Component } from 'react';


export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, email, occupation, city, bio }
    } = this.props;
    return (

        <>
        firstname {firstName}
        <br/>
        lastName {lastName}
        <br/>
       email {email}
       <br/>
        occupation{occupation}
        <br/>
        city {city}
        <br/>
        bio{bio}
        <br/>



            <button

              onClick={this.back}
            >Back</button>

            <button

              onClick={this.continue}
            >Confirm & Continue</button>

        </>

    );
  }
}

export default Confirm;