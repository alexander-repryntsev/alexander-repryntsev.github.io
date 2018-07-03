import React  from 'react';
// import { BlockPicker } from 'react-color';
// import firebase from 'firebase';
// import {upload} from '../helpers/upload';
// import {URL} from 'url';

export default class ItemPlaceholder extends React.Component {
 constructor(props){
     super(props);
    this.state = {
        item: props.item,
        colorText: this.props.defaultFormat.colorText,
        background: this.props.defaultFormat.background,
        loading: false,
        progress: 0,
        id: props.id,
        editable: this.props.defaultFormat.editable
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
        ctx.fillStyle = self.state.background;
        ctx.fillRect(0, 0, parseInt(this.naturalWidth, 10), parseInt(this.naturalHeight, 10));
        // drowing text
          ctx.fillStyle = self.state.colorText;
          ctx.font = ((this.naturalWidth > this.naturalHeight) ? this.naturalHeight / 5 : this.naturalWidth / 5) + "px Arial";
          var txt = this.naturalWidth + " x " + this.naturalHeight;
          ctx.textBaseline="middle"; 
          ctx.fillText(txt, (this.naturalWidth / 2) - (ctx.measureText(txt).width / 2), (this.naturalHeight / 2));
          self.state.item.placeholder = canvas.toDataURL(self.state.item.preview);

        //   const realData = self.state.item.placeholder.split(",")[1]; commented by me later  
        //   var blob =  self.b64toBlob(realData, self.state.item.type); commented by me later
        //   var blobUrl = window.URL.createObjectURL(blob);
        // upload(blob, (event) => {
        //     console.log("Callback event",event);
        //     })
        
        self.setState({
            loading: true
        })
    }
}

componentWillMount() {
    this.renderPlaceholder();

}
componentWillReceiveProps = (nextProps) => {
      console.log("nextProps", nextProps)
    if(nextProps.defaultFormat.background !== this.state.background) {
        this.setState({
            background: nextProps.defaultFormat.background
        }, () => {
            this.renderPlaceholder();
        })
    }
}
// handleChangeComplete = (color, event) => {
//     this.setState({ 
//         background: color.hex 
//     });
//     this.renderPlaceholder();
//   };


render() {
        return (
            <div className={`item ${(this.state.checked) ? 'checked' : ''}`} onClick={this.checkItem}>
              
                <div className="headline">
                
                    <div className="item-title" title={this.state.item.name}>
                        {this.state.item.name}	
                    </div>
                    <div className="item-remove" onClick={() => this.props.handlerRemoveImage(this.state.id) }></div>
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