import React from 'react';

export default class ListEditPlaceholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editList:[]
        }
    }
render() {
    console.log(this.state.editList);
    return(<div></div>)
}
}