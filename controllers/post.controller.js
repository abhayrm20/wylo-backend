const Post = require('../models/post.model');
const Common = require('./common');

exports.add = (req, res) => {
    new Post({
        text: req.body.postText,
    }).save((err, savedPost) => {
        if (err) Common.error500(err, res);
        else {
            if (req.files) {
                let file = req.files.image;
                let fileName = file.name;
                let ext = fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
                if (ext != "") ext = "." + ext;
                let newFile = `uploads/posts/${savedPost.id}${ext}`;
                file.mv('public/' + newFile, function (err) {
                    if (err) Common.error500(err, res);
                    else {
                        Post.updateOne(
                            {_id: savedPost.id},
                            {$set: {image: newFile, hasImage: true}},
                            {new: true},
                            (err, updatedPost) => {
                                if (err) Common.error500(err, res);
                                else res.json({
                                    code: 200,
                                    message: "Image post saved.",
                                    post: updatedPost,
                                });
                            }
                        );
                    }

                });
            } else {
                res.json({
                    code: 200,
                    message: "Text post saved.",
                    post: savedPost,
                });
            }
        }
    });
}

exports.fetch = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) Common.error500(err, res);
        else {
            if (posts.length == 0) {
                res.json({
                    code: 404,
                    message: "No posts available.",
                    posts: [],
                })
            }
            else res.json({
                code: 200,
                message: "Fetched all posts.",
                posts: posts,
            })
        }
    })
}