import React  from 'react';
import Dropzone from 'react-dropzone';
import ListImagePlaceholder from './listImagePlaceholder';
import RaisedButton from 'material-ui/RaisedButton';
import PanelSettings from './panelSettings';

export default class UploadImages extends React.Component {
 constructor(props){
    super(props);
    this.state={
		uploadedFiles:[],
		availabilityImages: false,
		editList: [],
		listUpload: [],
		defaultFormat: {
			colorText: '#969696',
			background: '#cccccc',
	  }
    }
  }

	handlerRemoveAllImage() {
		if(this.state.uploadedFiles.length) {
			this.setState({
				uploadedFiles: []
			})
		}
		else {
			return false;
		}
	}
	getEditList = (editList) => {
		
		this.setState({
			uploadedFiles: editList
		})
		this.forceUpdate();

		console.log("editList", editList)
		console.log("this.state.uploadedFiles", this.state.uploadedFiles)
		// console.log("delete", this.state.listUpload);
		// this.state.listUpload.push(list);
	}

	uploadImages(acceptedFiles) { 
		acceptedFiles.map((el, i)=>{
			el.id = Math.floor(Math.random() * 0xFFFFF);
		})
		this.setState({
			uploadedFiles: [...this.state.uploadedFiles, ...acceptedFiles]
		})
}


render() {
let dropzoneRef;
return (
     <div className="container-uploadimage">
	 {/* <PanelSettings settingsList={this.state.editList} /> */}
     <div className="upload-buttons-wrapper">	
	 <RaisedButton label="Upload" className="btn" backgroundColor="#2962FF" onClick={() => { dropzoneRef.open() }}/>

		<button type="button" onClick={this.handlerRemoveAllImage.bind(this)} className={(!this.state.uploadedFiles.length) ? "btn btn-red btn-crean btn-disable" : "btn btn-red btn-crean"  }>
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
				uploadedFiles= {this.state.uploadedFiles}
				getEditList={this.getEditList.bind(this)}
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
