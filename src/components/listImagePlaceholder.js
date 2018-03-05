import React from 'react';
import ItemPlaceholder from './itemPlaceholder';

export default class ListPlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorText: '#969696',
            backgroundImage: '#ccc',
            list: []
        }
    }

    removeImage(event) {
        event.preventDefault();
        const self = this;
        this.setState({
            item: this.state.item.filter((item, index) => {
               return index !== this.props.id
               })
           })
    }
    
    componentWillReceiveProps(nextProps) {
        
        nextProps.filesToBeSent.map((item) => {
            const tempImageStore = new Image();
        tempImageStore.src = item.preview;
        console.log(tempImageStore.src);
        var self = this;
        tempImageStore.onload = function() {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext("2d");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            // drowing rect
            ctx.fillStyle = self.state.backgroundImage;
            ctx.fillRect(0, 0, parseInt(this.naturalWidth, 10), parseInt(this.naturalHeight, 10));
            // drowing text
              ctx.fillStyle = self.state.colorText;
              ctx.font = ((this.naturalWidth > this.naturalHeight) ? this.naturalHeight / 5 : this.naturalWidth / 5) + "px Arial";
              var txt = this.naturalWidth + " x " + this.naturalHeight;
              ctx.textBaseline="middle"; 
              ctx.fillText(txt, (this.naturalWidth / 2) - (ctx.measureText(txt).width / 2), (this.naturalHeight / 2));
            item.placeholder = canvas.toDataURL(item.preview);
            self.setState({
                list: [...self.state.list, item]
            })
            // self.state.list.push(item); 
        }

    })
        
    }
    
    render() {
        if(this.state.list >= 0) {
            return ( <div>Try dropping some files here, or click to select files to upload.</div> )
        }
        const items = this.state.list.map((item, i) => {
                    return (
                        <ItemPlaceholder key={i} item={item} id={i} removeImage={this.removeImage} />
                    )
                })
        return (
            <div>{items}</div>
        )
    }
}
