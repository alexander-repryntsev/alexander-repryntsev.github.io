import React from 'react';
import ItemPlaceholder from './itemPlaceholder';

export default class ListImagePlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            editList: [],
            defaultFormat: this.props.defaultFormat
         
        }
    }
  
    handlerRemoveImage = (id) => {
        this.setState({
            list: this.state.list.filter((item, index) => {
                return item.id !== id;
               })
            }, () => {
                this.props.getEditList(this.state.list);
            })
            
        this.setState({
            editList: this.state.editList.filter((item, index) => {
                return item.id !== id;
                })
            })
    }

    handlerEditList = (status, id) => {
        this.state.editList.map((item, index) => {
            if(item.id === id) {
               
                this.state.editList[index].isChecked = status;
                this.forceUpdate();
            }       
        })
       
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if(nextState.list === nextProps.uploadedFiles) {
    //         console.log("nextProps", nextProps.uploadedFiles);
    //         console.log("nextState", nextState);

    //         return false;
    //     } else {
    //         this.setState({
    //             list: nextProps.uploadedFiles
    //         });
    //         return true;

    //     }
    // }

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
                    <ItemPlaceholder defaultFormat={this.state.defaultFormat} key={el.id} id={el.id} item={el} handlerRemoveImage={this.handlerRemoveImage.bind(el.id)} />
                        
                    )
                })
        return (
            <div>{ items }</div>
        )
    }
}
