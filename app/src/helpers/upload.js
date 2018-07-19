import axios from 'axios';
import {apiUrl} from '../config';
import _ from 'lodash';
import URL from 'url';

export const upload = (form, callback = () => {}) => {
    const url = `${apiUrl}`;
       console.log(form);
    let data = new FormData();
    data.append('files', form, 'test.jpg');
    _.each(form, (file) => {
        data.append('files', file);
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
