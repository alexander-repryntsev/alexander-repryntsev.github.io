import React from 'react';
import ItemPlaceholder from './itemPlaceholder';
import update from 'react-addons-update';

export default class ListImagePlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            defaultFormat: this.props.defaultFormat
         
        }
    }
  
    handlerRemoveImage = (id) => {
        this.setState({
            list: this.state.list.filter((item) => {
                return item.id !== id;
               })
            }, () => {
                this.props.getEditList(this.state.list);
            })
    }

    handlerCheckedImage = (id, status) => {
        console.log(id, status);
        this.state.list.map((item, index) => {
            if(item.id === id) {
               this.state.list[index].editable =  status;
                   this.forceUpdate();
                   this.props.getEditList(this.state.list);
            }
    })
}

    componentWillReceiveProps = (nextProps) => {
      
        if(nextProps.defaultFormat !== this.state.defaultFormat) {
            this.setState({
                defaultFormat: nextProps.defaultFormat
            })
        }

        if(nextProps.uploadedFiles !== this.state.list) {
            this.setState({
                list: nextProps.uploadedFiles
            })
        }
      
    }
    
    render() {
        if(this.state.list >= 0) {
            return ( <div className="dropping-text">Try dropping some files here, or click to select files to upload.</div> )
        }
        const items = this.state.list.map((el, i) => {

                    return (
                    <ItemPlaceholder defaultFormat={this.state.defaultFormat} isDownloadArchive={this.props.isDownloadArchive} handlerCheckedImage={this.handlerCheckedImage.bind(this)} key={el.id} id={el.id} item={el} handlerRemoveImage={this.handlerRemoveImage.bind(el.id)} />
                        
                    )
                })
        return (
            <div>{ items }</div>
        )
    }
}
