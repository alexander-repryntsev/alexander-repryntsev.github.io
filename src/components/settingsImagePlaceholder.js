import React  from 'react';
import { SketchPicker, BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
    constructor(props){
        super(props);
    }
    handleActivatedImage = (event) => {
        event.stopPropagation();
        const id = parseInt(event.currentTarget.id, 10);
        this.setState({
            settingsDefaultImage: {
                        modal: true
                     }
        })
        
      }
      handleChangeComplete = (color, id) => {

        // const id = parseInt(event.target.id, 10);
        // this.setState({ 
        // 	settingsDefaultImage: {
        // 		backgroundImage: color.hex
        // 	 }
        // });
        // this.state.filesToBeSent.map((item, i) => {
        // 	this.createPlaceholder(item);
        // })
        
        console.log(id);
      };
    render() {
        return (
            <div className="settings-panel" id={i}>
			    <BlockPicker
				    color={ this.state.settingsDefaultImage.backgroundImage }
					onChange={ this.handleChangeComplete }
			    />
			</div>
        );
    }
}
