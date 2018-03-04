import React  from 'react';
import { BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
    this.state={
		colorText: '#969696',
		backgroundImage: '#ccc',
    }
  }

  render() {

    
    return (
        <div>
            <BlockPicker
			    color={ this.state.backgroundImage }
			    // onChange={ this.handleChangeComplete }
							 />
        </div>
    )
  }
}