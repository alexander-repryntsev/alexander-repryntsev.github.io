import React from 'react';
import { TwitterPicker } from 'react-color';

// import classnames from 'classnames';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import SettingsImagePlaceholder  from './settingsImagePlaceholder';
// import ListEditPlaceholder  from './listEditPlaceholder';

export default class PanelSettings extends React.Component {

  constructor(props) {
  super(props);
  
  this.state = {
    background: this.props.defaultFormat.background,
    colorText: this.props.defaultFormat.colorText
  };
}
handleChangeCompleteBackground = (background) => {
  this.setState({ background: background.hex }, () => {
    this.props.getBackground(this.state.background);
  });
};

handleChangeCompleteColorText = (colorText) => {
  this.setState({ colorText: colorText.hex }, () => {
    this.props.getColorText(this.state.colorText);
  });
};

render() {  

    return (
        <div className="panel-settings">
            <div className="block-setting">
            <h2>Background</h2>
            <TwitterPicker
			      color={ this.state.background }
			      onChange={ this.handleChangeCompleteBackground }
							 />
            </div>
            <div className="block-setting">
            <h2>Color text</h2>
            <TwitterPicker
			      color={ this.state.colorText }
			      onChange={ this.handleChangeCompleteColorText }
							 />
            </div>
        </div>
    );
  }
}

