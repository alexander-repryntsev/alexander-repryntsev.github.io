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

    setEditList = (status, id) => {
        this.state.editList.push({"id": id, "isChecked": status});
        // this.props.getEditListUpload({"id": id, "isChecked": status});
        console.log(this.state.editList);
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
        console.log("nextProps", nextProps.uploadedFiles);
        console.log("list", this.state.list);
        if(nextProps.uploadedFiles === this.state.list) {
        } else {
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
                    <ItemPlaceholder defaultFormat={this.state.defaultFormat} key={el.id} id={el.id} item={el} handlerEditList={this.handlerEditList.bind(el.id)} handlerRemoveImage={this.handlerRemoveImage.bind(el.id)} getEditList={this.handlerEditList}/>
                        
                    )
                })
        return (
            <div>{ items }</div>
        )
    }
}
