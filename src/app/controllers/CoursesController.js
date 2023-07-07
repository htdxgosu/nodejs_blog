const Course = require('../models/Course')

const { mongooseToObjectongooseToObject, mongooseToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>
                res.render('courses/show', { course: mongooseToObject(course) })
            )
            .catch(next)
    }
    //[GET]
    create(req, res, next) {
        res.render('courses/create')
    }

    //[POST]
    store(req, res, next) {
        const formData = req.body
        formData.img = `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            })
    }
    //

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    //
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController