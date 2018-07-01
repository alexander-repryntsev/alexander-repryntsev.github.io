import React  from 'react';
import Dropzone from 'react-dropzone';
import ListImagePlaceholder from './listImagePlaceholder';
import RaisedButton from 'material-ui/RaisedButton';
import PanelSettings from './panelSettings';

export default class UploadImages extends React.Component {
 constructor(props){
    super(props);
    this.state={
		filesToBeSent:[],
		editList: [],
		listUpload: [],
		defaultFormat: {
			colorText: '#969696',
			background: '#cccccc',
	  }
    }
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

	getEditListUploadTo = (list) => {
		console.log(list)
		// this.setState({
		// 	listUpload: list
		// })
		// console.log("delete", this.state.listUpload);
		// this.state.listUpload.push(list);
	}

	uploadImages(acceptedFiles) { 
		this.setState({
			filesToBeSent: acceptedFiles.map((item) => {
				const id = Math.floor(Math.random() * 0xFFFF);
			return { id, item};
			})
		})
}



render() {
console.log("upload", this);
let dropzoneRef;
return (
     <div className="container-uploadimage">
	 {/* <PanelSettings settingsList={this.state.editList} /> */}
     <div className="upload-buttons-wrapper">	
	 <RaisedButton label="Upload" className="btn" backgroundColor="#2962FF" onClick={() => { dropzoneRef.open() }}/>

		<button type="button" onClick={this.removeAllImage.bind(this)} className={(!this.state.filesToBeSent.length) ? "btn btn-red btn-crean btn-disable" : "btn btn-red btn-crean"  }>
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
			<ListImagePlaceholder
				filesToBeSent= {this.state.filesToBeSent}
				getEditListUpload={this.getEditListUploadTo.bind(this)}
				defaultFormat={this.state.defaultFormat}
			/>
        	{/* <button id="downloadLink" className="btn btn-disable btn-green btn-upload">download</button> */}
        	</div>	
        </Dropzone>
       
        <div>
        </div>
       </div>
    );
 }
}
