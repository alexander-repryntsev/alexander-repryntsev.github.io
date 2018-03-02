import React  from 'react';
import { SketchPicker, BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
    constructor(props){
        super(props);
        this.state = {props}
        console.log(this.state)
    }

      handleChangeComplete = (color) => {

        // const id = parseInt(event.target.id, 10);
        // this.setState({ 
        // 	settingsDefaultImage: {
        // 		backgroundImage: color.hex
        // 	 }
        // });
        // this.state.filesToBeSent.map((item, i) => {
        // 	this.createPlaceholder(item);
        // })
        
        console.log("color");
      };
    render() {
            return (
                (this.state.settingsShow) ?
                <div className="settings-panel">
                    <BlockPicker
                        color={ this.color }
                        settingsShow={this.state.settingsShow}
                        onChange={ this.handleChangeComplete }
                    />
                </div>
                : <div>asd</div>
            );
    }
}
