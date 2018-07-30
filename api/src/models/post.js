import _ from 'lodash';

class Post{
    constructor(app) {
        this.app = app;

        this.model = {
            files: [],
            created: new Date()
        }
    }

    initWithObject(obj) {
        this.model.files = _.get(obj, 'files', []);
        this.model.created = _.get(obj, 'created', new Date());

        return this;
    }

    toJSON() {
        return this.model;
    }
}
export default Post;