var CalorieTracker = React.createClass({
  render: function(){
    var percent = (this.props.currentCalories / this.props.goal) * 100;
    return(
      <div className="calorieProgress">
        <h4 className="pull-right">Progress</h4>
        <div className="progress-pie-chart" data-percent={percent}>
          <div className="ppc-progress">
            <div className="ppc-progress-fill"></div>
          </div>
          <div className="ppc-percents">
            <div className="pcc-percents-wrapper">
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
