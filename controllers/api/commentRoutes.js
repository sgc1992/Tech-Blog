const router = require('express').Router();
const { comment } = require('../../models'); 
const withAuth = require('../../utils/auth'); 

router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const newComment = await comment.create({
            ...req.body,
            user_id: req.session.user_id, 
        }); 
        res.status(200).json(newComment); 
    } catch (err) {
        console.log(err)
        res.status(400).json(err); 
    }
}); 

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id, 
            }
        }); 

        if (!commentData) {
            res.status(404).json({ message: 'no comment found with that id' });
            return; 
        }; 

        res.status(200).json(commentData); 
    } catch (err) {
        res.status(500).json(err); 
    }
});
//write a get route that gets the comment based on the blod id

module.exports = router; 