const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')
const slug = require('mongoose-slug-generator')

const Schema = mongoose.Schema

const Course = new Schema({
    name: { type: String, require: true },
    description: { type: String, },
    img: { type: String, },
    videoID: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: 'name', require: true, unique: true },
}, {
    timestamps: true,
},
);

//
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course)