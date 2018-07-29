import React  from 'react';
// import { BlockPicker } from 'react-color';
// import firebase from 'firebase';
import {upload} from '../helpers/upload';
// import {URL} from 'url';
import update from 'react-addons-update';


export default class ItemPlaceholder extends React.Component {
 constructor(props){
     super(props);
    this.state = {
        id: props.item.id,
        item: props.item.el,
        imageProperty: this.props.defaultFormat,
        editable: props.item.editable,
        loading: false,
        blob: null
    }
}


b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  
  
  
//   var blob = b64toBlob(b64Data, contentType);
//   var blobUrl = URL.createObjectURL(blob);
  
//   var img = document.createElement('img');
//   img.src = blobUrl;
//   document.body.appendChild(img);

renderPlaceholder() {
    const tempImageStore = new Image();
    tempImageStore.src = this.state.item.preview;
    var self = this;
    tempImageStore.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        // drowing rect
        ctx.fillStyle = self.state.imageProperty.background;
        ctx.fillRect(0, 0, parseInt(this.naturalWidth, 10), parseInt(this.naturalHeight, 10));
        // drowing text
          ctx.fillStyle = self.state.imageProperty.colorText;
          ctx.font = ((this.naturalWidth > this.naturalHeight) ? this.naturalHeight / 5 : this.naturalWidth / 5) + "px Arial";
          var txt = this.naturalWidth + " x " + this.naturalHeight;
          ctx.textBaseline="middle"; 
          ctx.fillText(txt, (this.naturalWidth / 2) - (ctx.measureText(txt).width / 2), (this.naturalHeight / 2));
          self.state.item.placeholder = canvas.toDataURL(self.state.item.preview);

          const realData = self.state.item.placeholder.split(",")[1]; 
          var blob =  self.b64toBlob(realData, self.state.item.type);
          blob.name =  self.state.item.name;
          var blobUrl = window.URL.createObjectURL(blob);
        console.log("blob", blob);
        // upload(blob, (event) => {
        //     console.log("Callback event",event);
        //     })
        
        self.setState({
            loading: true,
            blob: blob
        })
    }
}

checkedImage = () => {

    this.setState({
        editable: !this.state.editable
    }, () => {
        this.props.handlerCheckedImage(this.state.id, this.state.editable);
    })

}

componentWillMount() {
    this.renderPlaceholder();

}

componentWillReceiveProps = (nextProps) => {
    if(nextProps.isNeedBlob) {
        this.props.getBlob(this.state.blob);
    }

    if(nextProps.defaultFormat.background !== this.state.imageProperty.background) {
        let newBackground = update(this.state, {
            imageProperty: {
                background: {$set: nextProps.defaultFormat.background}
            }
        })
        this.setState(newBackground);
    }

    if(nextProps.defaultFormat.colorText !== this.state.imageProperty.colorText) {
        let newColorText = update(this.state, {
            imageProperty: {
                colorText: {$set: nextProps.defaultFormat.colorText}
            }
        })
        this.setState(newColorText);
    }

    if(nextProps.item.editable !== this.state.editable) {
        this.setState({
            editable: nextProps.item.editable
        })
    }
        if(this.state.editable) {
            this.renderPlaceholder();
        }
    
}

render() {
        return (
            <div className={`item ${(this.state.editable) ? 'checked' : ''}`} onClick={this.checkedImage.bind(this)}>
              
                <div className="headline">
                
                    <div className="item-title" title={this.state.item.name}>
                        {this.state.item.name}	
                    </div>
                    {/* <div className="item-remove" onClick={() => this.props.handlerRemoveImage(this.state.id) }></div> */}
                </div>
                <div className="item-preview">
                    {(!this.state.loading) ? <div>Loading...</div> : <img src={this.state.item.placeholder} alt={this.state.item.name}/> }
                </div>
                <div className="item-download">
                 <a href={this.state.item.placeholder}  download={this.state.item.name}>download</a>
                </div>
                
                {/* <div className="item-upload">
                 <a href={this.state.item.placeholder} data-blow={this.state.item.placeholder}>upload to firebase</a>
                </div> */}
            </div>
        )

    }
}