var MealForm = React.createClass({
  handleSubmit: function(ev) {
    ev.preventDefault();

    var name = this.refs.name.value.trim();
    var calories = this.refs.calories.value;
    var consumed_at = this.refs.consumed_at.value.trim();

    if(!name || !consumed_at || !calories) {
      return false;
    }

    var formData = $(this.refs.mealForm).serialize();
    this.props.onSubmit(formData, this.props.form.action, this.props.form.method, this.props.container);

    this.refs.name.value = '';
    this.refs.calories.value = '';
    this.refs.notes.value = '';
    this.refs.consumed_at.value = '';
  },

  componentDidMount: function() {
    var consumed_at = this.refs.consumed_at;

    $(document).ready(function() {
      $(consumed_at).datetimepicker({
        inline: false,
        format: 'DD/MM/YYYY hh:mm a',
        maxDate: new Date()
      });
    });

    this.refs.name.value = this.props.meal ? this.props.meal.name : '';
    this.refs.notes.value = this.props.meal ? this.props.meal.notes : '';
    this.refs.calories.value = this.props.meal ? this.props.meal.amount_of_calories : '';
    this.refs.consumed_at.value = this.props.meal ? moment(this.props.meal.consumed_at).format('DD/MM/YYYY hh:mm a') : '';
  },

  consumedAtHandler: function() {
    this.setState({
      consumed_at: this.refs.consumed_at.value
    });
  },

  render: function() {
    return (
      <form ref='mealForm' className='form-horizontal' action={this.props.form.action} acceptCharset='UTF-8' method={this.props.form.method} id={this.props.form.id} onSubmit={this.handleSubmit}>
        <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token}/>
        <div className="row">
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label" htmlFor="meal_name">Name</label>
            <div className="col-sm-6">
              <input ref='name' className="form-control" type="text" name="meal[name]" id="meal_name"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label" htmlFor="meal_notes">Notes</label>
            <div className="col-sm-6">
              <textarea ref='notes' className="form-control" name="meal[notes]" id="meal_notes"></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label" htmlFor="meal_amount_of_calories">Amount of calories</label>
            <div className="col-sm-6">
              <input ref='calories' className="form-control" type="number" name="meal[amount_of_calories]" id="meal_amount_of_calories"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-append clearfix" id="consumed-at-picker">
            <label className="col-sm-4 control-label" htmlFor="meal_consumed_at">Consumed at</label>
            <div className="col-sm-8">
              <input
                ref='consumed_at'
                data-format="DD/MM/yyyy HH:mm:ss PP"
                type="text"
                name="meal[consumed_at]"
                id="meal_consumed_at"
                onClick={this.handleConsumedAt}
                onBlur={this.handleConsumedAt}
              />
              <span className="add-on">
                <i data-date-icon="icon-calendar" data-time-icon="icon-time"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="form-group">
            <input type="submit" name="commit" value="Eat!" className="btn btn-info"/>
          </div>
        </div>
      </form>
    );
  }
});
