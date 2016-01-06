var FilterableMealsTable = React.createClass({
  getInitialState: function() {
    return {
      fromText: '',
      toText: '',
      meals: this.props.data.meals,
      form: this.props.data.form
    };
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
          this.setState({meals: resp.data.meals, form: resp.data.form});
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
