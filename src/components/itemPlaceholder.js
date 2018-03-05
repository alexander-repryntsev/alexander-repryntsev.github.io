import React  from 'react';
import SettingsImagePlaceholder from './settingsImagePlaceholder';


export default class ItemImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
    this.state={
        item: props.item,
        settings: false

    }
}


settings = (id) => {
    this.setState({
        settings: !this.state.settings
    })
}
componentWillReceiveProps(nextProps) {
    console.log(nextProps)
}

render() {
        return (
            <div className="item">
            {
                (this.state.settings) ? <div className="settings-panel"> <SettingsImagePlaceholder /> </div> : ""
            }  
              
                <div className="headline">
                    <div className="item-title" title={this.state.item.name}>
                        {this.state.item.name}	
                    </div>
                    <div className="item-remove" ></div>
                </div>
                <div className="item-preview" onClick={(e) => this.settings(e)}>

                    <img src={this.state.item.placeholder} alt={this.state.item.name}/>
                </div>
                <div className="item-download">
                 <a href={this.state.item.placeholder} download={this.state.item.name}>download</a>
                </div>
            </div>
        )

    }
}