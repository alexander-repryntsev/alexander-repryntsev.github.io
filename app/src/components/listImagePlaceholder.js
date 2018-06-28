import React from 'react';
import ItemPlaceholder from './itemPlaceholder';

export default class ListImagePlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            editList: []
         
        }
        console.log("this.state.list", this.state.list);
    }
  
    handlerRemoveImage = (id) => {
        this.setState({
            list: this.state.list.filter((item, index) => {
                return item.id !== id;
               })
            })
            
    }

    handlerEditList = (status, id) => {
        console.log(status, id)
        // this.setState({
        //     editList: this.state.editList.map((item, index) => {
            // return item.id !== id;
        // })
        //  })
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("nextProps",nextProps);
        this.setState({
            list: [...this.state.list, ...nextProps.filesToBeSent]
        })
        console.log("list",this.state.list);
        
    }
    
    render() {
        console.log(this.state.editList);
        if(this.state.list >= 0) {
            return ( <div className="dropping-text">Try dropping some files here, or click to select files to upload.</div> )
        }
        const items = this.state.list.map((item, i) => {

                    return (
                    <ItemPlaceholder key={item.id} id={item.id} item={item.item} handlerEditList={this.handlerEditList.bind(item.id)} handlerRemoveImage={this.handlerRemoveImage.bind(item.id)} getEditList={this.handlerEditList}/>
                        
                    )
                })
        return (
            <div>{ items }</div>
        )
    }
}
