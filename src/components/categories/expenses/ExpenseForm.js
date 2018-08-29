import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {

  state = {
    name: '',
    amount: ''
  };

  static propTypes = {
    expense: PropTypes.object,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  componentDidMount() {
    const { expense } = this.props;
    if(!expense) return;

    this.setState(expense);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onComplete(this.state);
    this.setState({ name: '', amount: '' });
  };

  render() { 
    const { name, amount } = this.state;
    const { onCancel, expense } = this.props;

    return ( 
      <form onSubmit={this.handleSubmit}>
        <InputControl name="name" value={name} onChange={this.handleChange}/>
        <InputControl name="amount" value={amount} onChange={this.handleChange} type="number"/>
        <p>
          <button type="submit">{expense ? 'Update' : 'Add' }</button>
          {expense && <button type="button" onClick={onCancel}>Cancel</button>}
        </p>
      </form>
    );
  }
}

const InputControl = (props) => (
  <p>
    <label>
      {props.name}:
      <input {...props} required/>
    </label>
  </p>
);
 
export default ExpenseForm;