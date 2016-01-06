var FilterableMealsTable = React.createClass({
  getInitialState: function() {
    return {
      fromText: '',
      toText: '',
      meals: this.props.data.meals,
      form: this.props.data.form,
      calories: this.props.data.goal
    };
  },

  componentDidMount: function() {
    var comp = this;
    $(document).ready(function() {
      ReactDOM.render(<CalorieTracker currentCalories={comp.state.calories.current_calories} container="calorie-tracker" goal={comp.state.calories.goal}/>, document.getElementById('calorie-tracker'));
      drawProgress();
    });
  },

  resetProgress: function() {
    ReactDOM.render(<CalorieTracker currentCalories={this.state.calories.current_calories} container="calorie-tracker" goal={this.state.calories.goal}/>, document.getElementById('calorie-tracker'));
  },

  handleUserInput: function(fromText, toText) {
    this.setState({
      fromText: fromText,
      toText: toText
    });
  },

  formSubmit: function(formData, action, method, container) {
    $.ajax({
      url: action,
      data: formData,
      type: method,
      dataType: 'JSON',
      success: function(resp) {
        if (resp.success) {
          if(container !== '') {
            ReactDOM.unmountComponentAtNode(document.getElementById(container));
          }
          this.setState({meals: resp.data.meals, form: resp.data.form, calories: resp.data.goal});
          ReactDOM.unmountComponentAtNode(document.getElementById('calorie-tracker'));
          this.resetProgress();
          drawProgress();
        }
      }.bind(this)
    });
  },

  renderForm: function() {
    ReactDOM.render(<MealForm form={this.state.form} container="meal-form" onSubmit={this.formSubmit}/>, document.getElementById('meal-form'));
  },

  render: function() {
    return (
      <div>
        <Filters
          fromText={this.state.fromText}
          toText={this.state.toText}
          onUserInput={this.handleUserInput}
        />
        <hr/>
        <MealTable
          meals={this.state.meals}
          form={this.state.form}
          formSubmit= {this.formSubmit}
          fromText={this.state.fromText}
          toText={this.state.toText}
        />
        <hr/>
        <button className="btn btn-success" onClick={this.renderForm}>Add new meal</button>
        <div id="meal-form"></div>
      </div>
    );
  }
});
