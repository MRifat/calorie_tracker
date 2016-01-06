var UserSettingsForm = React.createClass({
  removeForm: function(ev) {
    var container = this.props.container;
    ev.preventDefault();
    ReactDOM.unmountComponentAtNode(document.getElementById(container));
  },

  handleSubmit: function(ev) {
    ev.preventDefault();
    // TODO:
    // Validate form then to5 ajax to server and handle call back

    var first_name = this.refs.firstName.value.trim();
    var last_name = this.refs.lastName.value.trim();
    var calories = this.refs.calorieGoal.value;
    var email = this.refs.email.value.trim();
    var password = this.refs.password.value;
    var password_conf = this.refs.passwordConfirmation.value;
    var current_password = this.refs.currentPassword.value;

    if(!current_password || !first_name || !last_name || !calories || !email) {
      return false;
    } else if((password && !password_conf) || (!password && password_conf)) {
      return false;
    } else {
      var formData = $(this.refs.editUserForm).serialize();
      this.formSubmit(formData, this.props.form.action, this.props.container);
    }
  },

  componentDidMount: function() {
    // Get User Info
    this.refs.firstName.value = this.props.user ? this.props.user.first_name : '';
    this.refs.lastName.value = this.props.user ? this.props.user.last_name : '';
    this.refs.calorieGoal.value = this.props.user ? this.props.user.daily_calorie_goal : '';
    this.refs.email.value = this.props.user ? this.props.user.email : '';
  },

  formSubmit: function(formData, action, container) {
    $.ajax({
      url: action,
      data: formData,
      type: 'PATCH',
      dataType: 'JSON',
      success: function(resp) {
        if (resp.success) {
          ReactDOM.unmountComponentAtNode(document.getElementById(container));
        }
        ReactDOM.unmountComponentAtNode(document.getElementById('calorie-tracker'));
        ReactDOM.render(<CalorieTracker currentCalories={resp.goal.current_calories} container="calorie-tracker" goal={resp.goal.goal}/>, document.getElementById('calorie-tracker'));
        drawProgress();
      }.bind(this)
    });
  },


  render: function() {
    return (
      <div className="container">
        <form ref="editUserForm" className="edit_user" id="edit_user" action="/users" acceptCharset="UTF-8" method="POST" onSubmit={this.handleSubmit}>
          <input type="hidden" name={this.props.form.csrf_param} value={this.props.form.csrf_token}/>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_first_name">First name</label>
              <div className="col-sm-6">
                <input ref="firstName" className="form-control" type="text" name="user[first_name]" id="user_first_name"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_last_name">Last name</label>
              <div className="col-sm-6">
                <input ref="lastName" className="form-control" type="text" name="user[last_name]" id="user_last_name"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_daily_calorie_goal">Daily calorie goal</label>
              <div className="col-sm-6">
                <input ref="calorieGoal" className="form-control" type="number" name="user[daily_calorie_goal]" id="user_daily_calorie_goal"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_email">Email</label>
              <div className="col-sm-6">
                <input ref="email" className="form-control" autofocus="autofocus" type="email" name="user[email]" id="user_email"/>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_password">Password</label>
              <i>(leave blank if you don't want to change it)</i>
              <div className="col-sm-6">
                <input ref="password" className="form-control" autoComplete="off" type="password" name="user[password]" id="user_password"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_password_confirmation">Password confirmation</label>
              <div className="col-sm-6">
                <input ref="passwordConfirmation" className="form-control" autoComplete="off" type="password" name="user[password_confirmation]" id="user_password_confirmation"/>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="form-group clearfix">
              <label className="col-sm-2 control-label" htmlFor="user_current_password">Current password</label>
              <i>(we need your current password to confirm your changes)</i>
              <div className="col-sm-6">
                <input ref="currentPassword" className="form-control" autoComplete="off" type="password" name="user[current_password]" id="user_current_password"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="actions">
              <input className="btn btn-default margin-left" type="submit" name="commit" value="Update"/>
              <input className="btn btn-danger margin-left" type="submit" name="commit" value="Cancel" onClick={this.removeForm}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
