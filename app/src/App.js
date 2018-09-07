import React  from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import PanelSettings from '../src/components/panelSettings';
import update from 'react-addons-update';
import {apiUrl} from '../src/config';
import _ from 'lodash';
import ItemPlaceholder from '../src/components/itemPlaceholder';
import {upload} from '../src/helpers/upload';
import './App.css';


class App extends React.Component {
 constructor(props){
    super(props);
    this.state={
		uploadedFiles:[],
		rejectedFiles: [],
		defaultFormat: {
			colorText: '#969696',
			background: '#cccccc',
			editable: false
	  },
	  isCheckedAllImage: false,
	  form: {
		files: []
	  },
	  isNeedBlob: false,
	  arrayBlobs: [],
	  _id: null,
	  completing: false
	}
	this._formValidation = this._formValidation.bind(this);
  }

  	// _isTypeFile() {
		
	//   }

  	_formValidation(field = [], callback = () => {}) {
		let {form, errors} = this.state;

		const validations = {
			files: [
				{
					errorMessage: 'Files is required',
					isValid: () => {
						return form.files.length;
					}
				}
			]
		}
		_.each(field, (one) => {
			let fieldValidations = _.get(validations, one, [])

			errors[one] = null;

			_.each(fieldValidations, (fieldValidation) => {
				const isValid = fieldValidation.isValid();

				if(isValid) {
					errors[one] = fieldValidations.errorMessage;
				}
			});
		}) 

		this.setState({
			errors: errors
		}, () => {
			let isValid = true
			_.each(errors, (err) => {
				if(err != null) {
					isValid = false;
				}
			})
			return callback(isValid);
		})
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
	}

	setBackground = (hex) => {

		if(this.state.uploadedFiles) {
			
			let newBackground = update(this.state, {
				defaultFormat: {
					background: { $set: hex }
				}
			  });
			  this.setState(newBackground);

		}
	}

	setColorText = (hex) => {

		if(this.state.uploadedFiles) {
			
			let newColorText = update(this.state, {
				defaultFormat: {
					colorText: { $set: hex }
				}
			  });
			  this.setState(newColorText);

		}
	}

	uploadImages(acceptedFiles, rejectedFiles) {
		// let imagesObj = [];
			this.setState({
				rejectedFiles: rejectedFiles
			}, ()=> {
				console.log("rejectedFiles", this.state.rejectedFiles);

			})

		let files = _.get(this.state, 'form.files', [])
		acceptedFiles.map((el, i)=>{
			let image = new Image();
			image.src = el.preview;
			let self = this;
			image.onload = function() {
				let id = Math.floor(Math.random() * 0xFFFFF);
				// imagesObj.push({'el': el, 'id': id, 'editable': self.state.isCheckedAllImage, 'width': this.naturalWidth, 'height': this.naturalHeight});
				self.setState({
					uploadedFiles: [...self.state.uploadedFiles, ...[{'el': el, 'id': id, 'editable': self.state.isCheckedAllImage, 'width': this.naturalWidth, 'height': this.naturalHeight}]]
				})
			}
			// 	this.setState({
				// 	uploadedFiles: [...this.state.uploadedFiles, {'id': id, 'objectFile': el, 'editable': this.state.isCheckedAllImage }]
				// })
			})
}
handlerCheckedImage = (id, statusEditable) => {
	this.state.uploadedFiles.map((el, i)=> {
		if(el.id === id) {
			this.state.uploadedFiles[i].editable =  statusEditable;
			this.forceUpdate();
		 }
	})
}

handlerDownloadZip = () => {
	this.setState({
		isNeedBlob: true
	});
	
}
getBlob = (blob) => {
		this.state.form.files.push(blob);
		if(this.state.form.files.length == this.state.uploadedFiles.length) {
			upload(this.state.form, (response) => {
				if(response.success) {
					this.setState({
						completing: true,
						_id: response.payload._id
					})
				}
			})
		}
}

handlerIsCheckAllImages = () => {
	this.setState({
		isCheckedImage: !this.state.isCheckedImage
	}, () => {
		if(this.state.uploadedFiles) {
			this.state.uploadedFiles.map((item, index) => {
				   item.editable =  this.state.isCheckedImage;
					   this.forceUpdate();
		})
		} 
	})
}

checkedImage = () => {
    this.setState({
        editable: !this.state.editable
    })

}

render() {
let dropzoneRef;
const post = this.state;
const postsId = _.get(post, '_id', null);
return (
  <div className="App">
  <div id="main" className="clearfix">
		{
		(this.state.completing) ? 
		<div className="wrapper-completing">
	 		<a href={`${apiUrl}/api/posts/${postsId}/download`}>Download</a>
			 <div>
				Thank you for using awesome placeholder.
				I have removed all ads and all the other
				extraction to keep it as simple as possible.
				So this solo rely on donations now instead
				since many of you use adblock anyway.
			 </div>
		</div>
		 :
<div className="container-uploadimage">
	 <PanelSettings 
	 defaultFormat={this.state.defaultFormat} 
	 getBackground={this.setBackground.bind(this)}
	 getColorText={this.setColorText.bind(this)}
	 />
     <div className="upload-buttons-wrapper">
	 <RaisedButton label="Done" onClick={this.handlerDownloadZip.bind(this)} className="btn" backgroundColor="#69cc01de"/>

	 <RaisedButton label="check all" onClick={this.handlerIsCheckAllImages.bind(this)} className="btn" backgroundColor="#69cc01de"/>
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
				{
					(this.state.uploadedFiles >= 0) ? <div className="dropping-text">Try dropping some files here, or click to select files to upload.</div> :
					
					this.state.uploadedFiles.map((el, i) => {
						return (
							<ItemPlaceholder defaultFormat={this.state.defaultFormat} getBlob={this.getBlob.bind(this)} isNeedBlob={this.state.isNeedBlob} handlerCheckedImage={this.handlerCheckedImage.bind(this)} key={el.id} id={el.id} item={el} />
						)
					})
				}
        	</div>	
        </Dropzone>
       
        <div>
        </div>
		{
			this.state.rejectedFiles.map((el, i)=> {
				return <div key={i}>Файл {el.name} не загрузился</div>
			})
		}
       </div>
	   }
	   </div>
      </div>
	   
    );
 }
}

export default App;
