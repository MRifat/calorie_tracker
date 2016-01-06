var MealTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.meals.forEach(function(meal) {
      if(this.props.fromText !== '' && this.props.toText !== '') {
        if (new Date(meal.consumed_at) >= new Date(this.props.fromText) && new Date(meal.consumed_at) <= new Date(this.props.toText)) {
          rows.push(<MealRow meal={meal} key={meal.id} form={this.props.form} formSubmit={this.props.formSubmit} />);
        } else {
          return;
        }
      } else {
        rows.push(<MealRow meal={meal} key={meal.id} form={this.props.form} formSubmit={this.props.formSubmit} />);
      }
    }.bind(this));

    return (
      <div className="row">
        <div className="row" id="edit-meal-form"></div>
        <table className="table-responsive table-condensed table-hover meals-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Notes</th>
              <th>Consumed at (Date)</th>
              <th>Consumed at (Time)</th>
              <th>Calories</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});
