import React  from 'react';
import { BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
  }

  render() {

    
    return (
        <div>
            <BlockPicker
			      // color={ this.state.backgroundImage }
			    // onChange={ this.handleChangeComplete }
							 />
        </div>
    )
  }
}
