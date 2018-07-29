import React  from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import PanelSettings from './panelSettings';
import update from 'react-addons-update';
import _ from 'lodash';
import ItemPlaceholder from './itemPlaceholder';
import {upload} from '../helpers/upload';



export default class UploadImages extends React.Component {
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
	  arrayBlobs: []
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
		let imagesObj = [];
			this.setState({
				rejectedFiles: rejectedFiles
			}, ()=> {
				console.log("rejectedFiles", this.state.rejectedFiles);

			})

		let files = _.get(this.state, 'form.files', [])
		acceptedFiles.map((el, i)=>{
				let id = Math.floor(Math.random() * 0xFFFFF);
			imagesObj.push({'el': el, 'id': id, 'editable': this.state.isCheckedAllImage});
		// 	this.setState({
		// 	uploadedFiles: [...this.state.uploadedFiles, {'id': id, 'objectFile': el, 'editable': this.state.isCheckedAllImage }]
		// })
		})
		this.setState({
			uploadedFiles: [...this.state.uploadedFiles, ...imagesObj]
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
			console.log("this.state.form.files", this.state.form.files);
			upload(this.state.form, (event) => {
				console.log("Callback event", event);
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
return (
     <div className="container-uploadimage">
	 <PanelSettings 
	 defaultFormat={this.state.defaultFormat} 
	 getBackground={this.setBackground.bind(this)}
	 getColorText={this.setColorText.bind(this)}
	 />
     <div className="upload-buttons-wrapper">
	 <RaisedButton label="Download all" onClick={this.handlerDownloadZip.bind(this)} className="btn" backgroundColor="#69cc01de"/>

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
				console.log(el)
				return <div key={i}>Файл {el.name} не загрузился</div>
			})
		}
       </div>
    );
 }
}
