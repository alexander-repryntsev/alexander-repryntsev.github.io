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
            })
            this.setState({
                editList: this.state.editList.filter((item, index) => {
                    return item.id !== id;
                   })
                })
    }

    setEditList = (status, id) => {
        this.state.editList.push({"id": id, "isChecked": status});
        this.props.getEditListUpload({"id": id, "isChecked": status});
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

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            list: [...this.state.list, ...nextProps.filesToBeSent]
        })
    }
    
    render() {
        if(this.state.list >= 0) {
            return ( <div className="dropping-text">Try dropping some files here, or click to select files to upload.</div> )
        }
        const items = this.state.list.map((item, i) => {

                    return (
                    <ItemPlaceholder defaultFormat={this.state.defaultFormat} key={item.id} id={item.id} item={item.item} setEditList={this.setEditList.bind(item.id)} handlerEditList={this.handlerEditList.bind(item.id)} handlerRemoveImage={this.handlerRemoveImage.bind(item.id)} getEditList={this.handlerEditList}/>
                        
                    )
                })
        return (
            <div>{ items }</div>
        )
    }
}
