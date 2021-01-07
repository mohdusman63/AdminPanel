import React, { Component } from 'react';
export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return(
        <>
      <form>
          <h1>personal details</h1>
        occupation <input type="text"
           onChange={handleChange('occupation')}
              value={values.occupation}
            /><br/>
        city <input type="text"
           onChange={handleChange('city')}
              value={values.city}

         name=""/><br/>
          bio<input type="text"
            onChange={handleChange('bio')}
              value={values.bio}
              name=""/><br/>

              <button onClick={this.continue}>continue</button>
               <button onClick={this.back}>back</button>

      </form>
        </>

    )
  }}
  export default FormPersonalDetails;