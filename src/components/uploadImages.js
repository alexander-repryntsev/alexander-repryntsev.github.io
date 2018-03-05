import React  from 'react';
import Dropzone from 'react-dropzone';
import SettingsImagePlaceholder from './settingsImagePlaceholder'

import { SketchPicker, BlockPicker } from 'react-color';

export default class UploadImages extends React.Component {
 constructor(props){
    super(props);
    this.state={
      filesPreview:[],
      filesToBeSent:[]
    }
  console.log(props);
  }
 createPlaceholder = (item) => {
        
    const tempImageStore = new Image();

	tempImageStore.src = item.preview;
	var self = this;
    tempImageStore.onload = function() {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		canvas.width = this.naturalWidth;
		canvas.height = this.naturalHeight;
		// drowing rect
		ctx.fillStyle = "#999";
		ctx.fillRect(0, 0, parseInt(this.naturalWidth, 10), parseInt(this.naturalHeight, 10));
		// drowing text
      	ctx.fillStyle = "#c1c1c1";
      	ctx.font = ((this.naturalWidth > this.naturalHeight) ? this.naturalHeight / 5 : this.naturalWidth / 5) + "px Arial";
      	var txt = this.naturalWidth + " x " + this.naturalHeight;
      	ctx.textBaseline="middle"; 
      	ctx.fillText(txt, (this.naturalWidth / 2) - (ctx.measureText(txt).width / 2), (this.naturalHeight / 2));
		item.placeholder = canvas.toDataURL(item.preview);
     	self.setState({
	   		filesToBeSent: [...self.state.filesToBeSent, item]
	   }); 
    }
     	
    	// return tempImageStore.placeholder;
  };



 removeImage(event) {
 	event.preventDefault();
 	const id = parseInt(event.target.id, 10);
 	this.setState({
			filesToBeSent: this.state.filesToBeSent.filter((item, index) => {
			return index !== id
			})
		})
 }

  removeAllImage(event) {
  	event.preventDefault();
	if(this.state.filesToBeSent.length) {
		this.setState({
			filesToBeSent: []
		})
	}
	else {
		return false;
	} 
  }

 uploadImages = (acceptedFiles) => {
        acceptedFiles.map((item, i) => {
			this.createPlaceholder(item);
        })

	  
   }

 render() {

let dropzoneRef;
        		console.log(this.state.filesToBeSent)

return (
     <div className="container-uploadimage">
     <div className="upload-buttons-wrapper">	
      	<button type="button" className="btn btn-green" onClick={() => { dropzoneRef.open() }}>
      		upload
  		</button>
		<button type="button" disabled={false} onClick={this.removeAllImage.bind(this)} className={(!this.state.filesToBeSent.length) ? "btn btn-red btn-crean btn-disable" : "btn btn-red btn-crean"  }>
			Clean
		</button>
		</div>
        <Dropzone 
        	ref={(node) => { dropzoneRef = node; }}
	        onDrop={this.uploadImages.bind(this)} 
	        accept="image/jpeg, image/png"
	        className="dropzone"
	        disableClick={true}>
	        <div id="files-list" className="clearfix">
        	{	 
        		(this.state.filesToBeSent>= 0) ? <div>Try dropping some files here, or click to select files to upload.</div> :
    			
    			this.state.filesToBeSent.map((item, i) => {
         			return(
			        	<div className="item" key={"item-" + i}>
							<SettingsImagePlaceholder />
						<div className="headline">
			            	<div className="item-title" title={item.name}>
			            		{item.name}	
			            	</div>
			            	<div className="item-remove" id={i} onClick={this.removeImage.bind(this)}></div>
						</div>
			            	<div className="item-preview"  id={i}>

			            		<img src={item.placeholder} alt={item.name}/>
			            	</div>
			            	<div className="item-download">
			            		<a href={item.placeholder} download={item.name}>download</a>
			            	</div>
			            </div>
        			)
    			}) 
        	}
        	</div>	
        </Dropzone>
       
        <div>
        </div>
       </div>
    );
 }
}
