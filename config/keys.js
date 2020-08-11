dbPassword = 'mongodb+srv://<username>:'+ encodeURIComponent(<password>) + '@<cluster name>.mongodb.net/<database name>?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword
};
