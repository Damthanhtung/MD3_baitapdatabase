const homeHandleRouter = require('./handle/StudentRouting');
const router = {
    'home': homeHandleRouter.showHome,
    'student/create': homeHandleRouter.showFormCreate,
    'student/edit': homeHandleRouter.showFormEdit,
    'student/delete': homeHandleRouter.deleteStudent

}
module.exports = router;