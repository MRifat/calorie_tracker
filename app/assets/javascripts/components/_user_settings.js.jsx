var UserSettings = React.createClass({
  getInitialState: function() {
    return {
      form: '',
      user_name: ''
    };
  },

  renderForm: function() {
    return(
      ReactDOM.render(<UserSettingsForm form={this.props.form} user={this.props.user} container="user-settings"/>, document.getElementById('user-settings'))
    );
  },

  render: function() {
    return(
      <a href='#' form={this.props.form} onClick={this.renderForm}>{this.props.user_name}</a>
    );
  }
});
