import Post from "../models/post.model.js";

export async function createPost(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).send({
            post
        })
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
        
    }
}

export async function readPosts(req, res) {
    const {search} = req.query;
    try {
        const title = new RegExp(search, 'i');
        const posts = await Post.find({ name: {$in: title} })
        res.status(200).send({
            posts
        })
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
    }
}

export async function readPost(req, res) {
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        res.status(200).send({
            post
        })
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
        
    }
}

export async function updatePost(req, res) {
    try {
        const {id} = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).send({
            post
        })
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
        
    }
}

export async function deletePost(req, res) {
    try {
        const {id} = req.params;
        await Post.findByIdAndRemove(id);
        res.status(200).send({
            message: [`${id} idli post silindi.`]
        })
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
    }
}
