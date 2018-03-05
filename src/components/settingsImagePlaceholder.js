import React  from 'react';
import { SketchPicker, BlockPicker } from 'react-color';

export default class SettingsImagePlaceholder extends React.Component {
    constructor(props){
        super(props);
            this.state= {
				settingsDefaultImage: {
					colorText: '#969696',
					backgroundImage: '#ccc',
					modal: false
			}
    	}
    }

  handleActivatedImage = (event) => {
	event.stopPropagation();
	const id = parseInt(event.currentTarget.id, 10);
	
		this.setState({
			...this.state.settingsDefaultImage,
			modal: this.state.filesToBeSent.map((item, i) => {
				return true
			})
		})
}

    render() {
            return (
                (this.props.settingsShow) ?
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
