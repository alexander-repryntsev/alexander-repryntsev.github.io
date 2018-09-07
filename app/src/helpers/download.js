import axios from 'axios';
import {apiUrl} from '../config';
import _ from 'lodash';
import URL from 'url';

export const downloadZip = (id, callback = () => {}) => {
    const url = `${apiUrl}/api/posts/${id}/download`;
    // console.log("form", form);
    // let files = _.get(form, 'files', []);
    
    // let data = new FormData();
    // // data.append('files', form, 'blob.jpg');
    // _.each(files, (file) => {
    //     data.append('files', file, file.name);
    // });

    // const config = {
    //     onUploadProgress: (event) => {
    //         console.log("Upload event", event);

    //         return callback({
    //             type: 'onUploadProgress',
    //             payload: event
    //         })
    //     }
    // }

    axios.get(url).then((response) => {
        // upload successful
        return callback({
            type: 'success',
            payload: response.data
        })
    }).catch((err) => {
        return callback({
            type: 'error',
            payload: err
        })
    });
};
