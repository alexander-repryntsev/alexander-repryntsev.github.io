import React  from 'react';
import Dropzone from 'react-dropzone';
import ListPlaceholder from './listImagePlaceholder';


export default class UploadImages extends React.Component {
 constructor(props){
    super(props);
    this.state={
      filesToBeSent:[]
    }
  }

//   removeAllImage(event) {
// 	event.preventDefault();
// 	  if(this.state.filesToBeSent.length) {
// 		  this.setState({
// 			  filesToBeSent: []
// 		  })
// 	  }
// 	  else {
// 		  return false;
// 	  } 
// 	}

uploadImages(acceptedFiles) { 

	this.setState({
		filesToBeSent: acceptedFiles.map((item) => {
		return item
		})
	})
}

render() {

let dropzoneRef;

return (
     <div className="container-uploadimage">
     <div className="upload-buttons-wrapper">	
      	<button type="button" className="btn btn-green" onClick={() => { dropzoneRef.open() }}>
      		upload
  		</button>
		<button type="button" disabled={false} /*onClick={ (e) => this.removeAllImage(e) }*/ className={(!this.state.filesToBeSent.length) ? "btn btn-red btn-crean btn-disable" : "btn btn-red btn-crean"  }>
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
			<ListPlaceholder
				filesToBeSent= {this.state.filesToBeSent}
			/>
        	</div>	
        </Dropzone>
       
        <div>
        </div>
       </div>
    );
 }
}
