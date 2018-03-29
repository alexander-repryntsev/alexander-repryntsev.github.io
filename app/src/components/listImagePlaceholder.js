import React from 'react';
import ItemPlaceholder from './itemPlaceholder';

export default class ListPlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    // removeImage(event) {
    //     event.preventDefault();
    //     const self = this;
    //     this.setState({
    //         item: this.state.item.filter((item, index) => {
    //            return index !== this.props.id
    //            })
    //        })
    // }
    
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
                        <ItemPlaceholder key={i} item={item}  />
                    )
                })
        return (
            <div>{items}</div>
        )
    }
}
