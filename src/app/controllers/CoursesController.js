const Course = require('../models/Course')

const { mongooseToObjectongooseToObject, mongooseToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course =>
                res.render('courses/show',
                    { course: mongooseToObject(course) })
            )
            .catch(next)
    }
    //[GET]
    create(req, res, next) {
        res.render('courses/create')
    }

    //[POST]
    store(req, res, next) {
        req.body.img = `https://i.ytimg.com/vi/${req.body.videoID}/maxresdefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    //

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => res.render('courses/edit', {
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
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'Delete':
                Course.delete({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'DeleteMany':
                Course.deleteMany({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'Restore':
                Course.restore({ _id: { $in: req.body.courseID } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ error: 'Invalid Action' })

        }
    }
}

module.exports = new CourseController()