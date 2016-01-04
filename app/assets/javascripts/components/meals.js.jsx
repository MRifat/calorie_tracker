var MealRow = React.createClass({
   render: function() {
    return (
      <tr>
        <td>{this.props.meal.name}</td>
        <td>{this.props.meal.notes}</td>
        <td>{new Date(this.props.meal.consumed_at).toDateString()}</td>
        <td>{new Date(this.props.meal.consumed_at).toTimeString()}</td>
        <td>{this.props.meal.amount_of_calories}</td>
      </tr>
    );
   }
});

var MealTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.meals.forEach(function(meal) {
      console.log(new Date(this.props.fromText));
      console.log(this.props.toText);
      if(this.props.fromText !== '' && this.props.toText !== '') {
        if (new Date(meal.consumed_at) >= new Date(this.props.fromText) && new Date(meal.consumed_at) <= new Date(this.props.toText)) {
          rows.push(<MealRow meal={meal} key={meal.id} />);
        } else {
          return;
        }
      } else {
        rows.push(<MealRow meal={meal} key={meal.id} />);
      }
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Notes</th>
            <th>Consumed at (Date)</th>
            <th>Consumed at (Time)</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var Filters = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.fromTextInput.value,
      this.refs.toTextInput.value
    );
  },

  componentDidMount: function() {
    var from = this.refs.fromTextInput;
    var to = this.refs.toTextInput;
    $(document).ready(function() {
      $(from).datetimepicker({
        inline: false,
        format: 'MM/DD/YYYY hh:mm a'
      });
      $(to).datetimepicker({
        inline: false,
        format: 'MM/DD/YYYY hh:mm a'
      });

    });

  },

  render: function() {
    return (
      <form>
        <div className="row">
          <div className="input-append clearfix" id="fromFilter">
            <div className="col-sm-8">
              <input
                  type="text"
                  placeholder="From"
                  data-format="MM/dd/YYYY"
                  value={this.props.fromText}
                  ref="fromTextInput"
                  onClick={this.handleChange}
                  onBlur={this.handleChange}
              />
              <span className="add-on">
                <i data-time-icon='icon-time' data-date-icon='icon-calendar'/>
              </span>
            </div>
          </div>
          <div className="input-append clearfix" id="toFilter">
            <div className="col-sm-8">
              <input
                  type="text"
                  placeholder="To"
                  value={this.props.toText}
                  data-format="MM/dd/YYYY"
                  ref="toTextInput"
                  onClick={this.handleChange}
                  onBlur={this.handleChange}
              />
              <span className="add-on">
                <i data-time-icon='icon-time' data-date-icon='icon-calendar' />
              </span>
            </div>
          </div>
        </div>
      </form>
    );
  }
});

var FilterableMealTable = React.createClass({
  getInitialState: function() {
    return {
      fromText: '',
      toText: ''
    };
  },

  handleUserInput: function(fromText, toText) {
    this.setState({
      fromText: fromText,
      toText: toText
    });
  },

  render: function() {
    return (
      <div>
        <Filters
          fromText={this.state.fromText}
          toText={this.state.toText}
          onUserInput={this.handleUserInput}
        />
        <MealTable
          meals={this.props.meals}
          fromText={this.state.fromText}
          toText={this.state.toText}
        />
      </div>
    );
  }
});
