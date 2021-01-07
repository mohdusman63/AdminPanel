
import React, { Component } from 'react';


export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
   
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
      <form>
        <h1>userdetails</h1>
        firstname <input type="text"
           onChange={handleChange('firstName')}
              value={values.firstName}
            /><br/>
         lastname <input type="text"
           onChange={handleChange('lastName')}
              value={values.lastName}

         name=""/><br/>
          email <input type="text"
            onChange={handleChange('email')}
              value={values.email}
              name=""/><br/>

              <button onClick={this.continue}>continue</button>

      </form>
      </>

    )
  }
}
export default FormUserDetails;