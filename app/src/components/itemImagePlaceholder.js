import React  from 'react';
// import { SettingsImagePlaceholder } from './settingsImagePlaceholder';
// import { BlockPicker } from 'react-color';


export default class ItemImagePlaceholder extends React.Component {
 constructor(props){
    super(props);
    this.state={
		colorText: '#969696',
        backgroundImage: '#ccc',
        settings: false,
        filesToBeSent: [],
    }
  }
 removeImage(event) {
 	event.preventDefault();
 	const id = parseInt(event.target.id, 10);
 	this.setState({
			filesToBeSent: this.state.filesToBeSent.filter((item, index) => {
			return index !== id
			})
		})
 }



componentWillReceiveProps(nextProps) {
    nextProps.filesToBeSent.map((item) => {
        const tempImageStore = new Image();
    
        tempImageStore.src = item.preview;
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
            item.placeholder = canvas.toDataURL(item.preview);
            item.settings = self.state.settings;
             self.setState({
                   filesToBeSent: [...self.state.filesToBeSent, item]
           }); 
        }
    })

}
settingsHandle = (event) => {
    console.log(event.currentTarget.id);
}

    render() {
        console.log(this.state.filesToBeSent);
        if(this.state.filesToBeSent >= 0) {
           return <div>Try dropping some files here, or click to select files to upload.</div>
        }

        const items = this.state.filesToBeSent.map((item, i) => {
            return (
                <div className="item" key={"item-" + i}>
                    {/* <div className="settings-panel" id={i}>
                    </div> */}
                    <div className="headline">
                        <div className="item-title" title={item.name}>
                            {item.name}	
                        </div>
                        <div className="item-remove" id={i} onClick={(e) => this.removeImage(e) }></div>
                    </div>
                    <div className="item-preview" onClick={(e) => this.settingsHandle(e) }  id={i} >

                        <img src={item.placeholder} alt={item.name}/>
                    </div>
                    <div className="item-download">
                     <a href={item.placeholder} download={item.name}>download</a>
                    </div>
                </div>
            )
        })
        return (
            <div>{items}</div>
        )
    }
}