var Filters = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.fromTextInput.value,
      this.refs.toTextInput.value
    );
  },

  resetFilters: function() {
    this.props.onUserInput('', '');
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
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              placeholder="From"
              data-format="MM/dd/YYYY"
              value={this.props.fromText}
              ref="fromTextInput"
            />
          </div>
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              placeholder="To"
              value={this.props.toText}
              data-format="MM/dd/YYYY"
              ref="toTextInput"
            />
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.resetFilters}>Reset</button>
            <button type="button" className="btn btn-info" onClick={this.handleChange}>Filter</button>
          </div>
        </div>
      </form>
    );
  }
});
