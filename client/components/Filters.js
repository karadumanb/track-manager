import React from 'react'
import { Segment, Button } from 'semantic-ui-react'


class Filters extends React.Component {
  constructor () {
    super()

    this.state = {
        titleQuery: '',
        sinceCheckbox: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
        if (e.target.name == "title-filter") {
            this.props.onTextChange(e.target.value);
            this.setState({
                titleQuery: e.target.value
            });
        }
        if (e.target.name == "since-checkbox") {
            this.props.onCheckboxChange(e.target.checked);
            this.setState({
                sinceCheckbox: e.target.checked
            });
        }
    }
  render () {
      return(
        <div className="filters-container">
            <div className="title-filter">
                <h4>Filters: </h4>
                <input type="text" name="title-filter" id="title-filter"  value={this.state.titleQuery} onChange={this.handleChange} placeholder="Search in titles"/>
            </div>
            <div className="since-options">
                <div className="center-label">
                    <a className="active">All tracks</a>
                    <label className="scroll-options">
                        <input type="checkbox" name="since-checkbox" id="since-checkbox" value={this.state.sinceCheckbox} onChange={this.handleChange}/>
                    </label>
                    <a>Stopped</a>
                </div>
            </div>
        </div>
      );
  }
}

export default Filters
