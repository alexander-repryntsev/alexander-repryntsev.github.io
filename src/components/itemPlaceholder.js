import React  from 'react';
import SettingsImagePlaceholder from './settingsImagePlaceholder';


export default class ItemImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
    this.state={
        item: props.item,
        settings: false,
        loading: false
    }
}


settings = (id) => {
    this.setState({
        settings: !this.state.settings
    })
}
componentWillMount() {
      const tempImageStore = new Image();
        tempImageStore.src = this.state.item.preview;
        var self = this;
        tempImageStore.onload = function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            // drowing rect
            ctx.fillStyle = self.state.backgroundImage;
            ctx.fillRect(0, 0, parseInt(this.naturalWidth, 10), parseInt(this.naturalHeight, 10));
            // drowing text
              ctx.fillStyle = self.state.colorText;
              ctx.font = ((this.naturalWidth > this.naturalHeight) ? this.naturalHeight / 5 : this.naturalWidth / 5) + "px Arial";
              var txt = this.naturalWidth + " x " + this.naturalHeight;
              ctx.textBaseline="middle"; 
              ctx.fillText(txt, (this.naturalWidth / 2) - (ctx.measureText(txt).width / 2), (this.naturalHeight / 2));
              self.state.item.placeholder = canvas.toDataURL(self.state.item.preview);
              self.setState({
                  loading: true
              })
}
}
render() {
    if(this.state.loading) {

        console.log("there");
    }
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