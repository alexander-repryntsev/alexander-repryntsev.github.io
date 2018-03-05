import React  from 'react';
// import { SettingsImagePlaceholder } from './settingsImagePlaceholder';


export default class ItemImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
    this.state={
        item: props.item,
        settings: false

    }
}
removeImage(event) {
    event.preventDefault();
    const self = this;
    this.setState({
        item: this.state.item.filter((item, index) => {
           return index !== this.props.id
           })
       })
}

// settings = (id) => {
// console.log(id);
// }
  
render() {
    // const settings = 
      console.log(this.state.item)
        return (
            <div className="item">
            {/* {
                (this.state.item.settings) ? <div className="settings-panel" id={i}>
                </div>
            }   */}
              
                <div className="headline">
                    <div className="item-title" title={this.state.item.name}>
                        {this.state.item.name}	
                    </div>
                    <div className="item-remove" onClick={(e) => this.removeImage(e)} ></div>
                </div>
                <div className="item-preview" >

                    <img src={this.state.item.placeholder} alt={this.state.item.name}/>
                </div>
                <div className="item-download">
                 <a href={this.state.item.placeholder} download={this.state.item.name}>download</a>
                </div>
            </div>
        )

}
}