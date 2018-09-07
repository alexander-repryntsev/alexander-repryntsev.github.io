import axios from 'axios';
import {apiUrl} from '../config';
import _ from 'lodash';
import URL from 'url';

export const upload = (form, callback = () => {}) => {
    const url = `${apiUrl}`;
    let files = _.get(form, 'files', []);
    
    let data = new FormData();
    _.each(files, (file) => {
        data.append('files', file, file.name);
    });

    const config = {
        onUploadProgress: (event) => {
            console.log("Upload event", event);

            return callback({
                type: 'onUploadProgress',
                payload: event
            })
        }
    }

    axios.post(url, data, config).then((response) => {

        // upload successful
        return callback({
            success: true,
            payload: response.data
        })
    }).catch((err) => {
        return callback({
            success: false,
            payload: err
        })
    });
};
