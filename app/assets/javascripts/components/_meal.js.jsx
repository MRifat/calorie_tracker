var MealRow = React.createClass({
  editForm: function() {
    var {action, ...other} = this.props.form;
    
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
        <td></td>
        <td></td>
      </tr>
    );
   }
});
