import React  from 'react';
import { BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
 constructor(props) {
    super(props);
  }

  handleChangeComplete = (color, event) => {
    this.setState({ background: color.hex });
    console.log(color);
  };

  render() {

    
    return (
        <div>
            <BlockPicker
			      color={ this.props.background }
			    onChange={ this.handleChangeComplete }
							 />
        </div>
    )
  }
}
