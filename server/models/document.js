
const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   desciption: { type: String },
   url: { type: String, required: true },
   chidren: { type: mongoose.Schema.Types.ObjectId, ref: 'Document'}
});

module.exports = mongoose.model('Document', documentSchema);