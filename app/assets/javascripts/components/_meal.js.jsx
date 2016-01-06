var MealRow = React.createClass({
  destroyMeal: function() {
    var action = this.props.form.action + '/' + this.props.meal.id + '';
    this.props.formSubmit({}, action, 'DELETE', '');
  },

  editForm: function() {
    var {action, method, ...other} = this.props.form;

    other.action = this.props.form.action + '/' + this.props.meal.id + '';
    other.method = 'PATCH';
    other.id = 'edit';
    ReactDOM.render(<MealForm form={other} meal={this.props.meal} container="edit-meal-form" onSubmit={this.props.formSubmit}/>, document.getElementById('edit-meal-form'));
  },

   render: function() {
    return (
      <tr id={"meal-" + this.props.meal.id}>
        <td></td>
        <td>{this.props.meal.name}</td>
        <td>{this.props.meal.notes}</td>
        <td>{new Date(this.props.meal.consumed_at).toDateString()}</td>
        <td>{new Date(this.props.meal.consumed_at).toTimeString()}</td>
        <td>{this.props.meal.amount_of_calories}</td>
        <td>
          <a href="#" className="btn btn-warning" onClick={this.editForm}>Edit</a>
        </td>
        <td>
          <a href="#" className="btn btn-danger" onClick={this.destroyMeal}>Delete</a>
        </td>
      </tr>
    );
   }
});
