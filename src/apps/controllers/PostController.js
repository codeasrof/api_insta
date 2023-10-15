const Posts = require("../models/Posts")

class PostController{
    async create(req,res){
        const {image, description} = req.body

        const newPost = await Posts.create({
            image, 
            description,
            author_id: req.userId
        })

        if(!newPost){
            return res.status(400).json({message: "Created Failed!"})
        }

        return res.status(200).json({data: { image, description}})
    }

    async delete(req,res){
        const {id}  = req.params

        const verifyPost = await Posts.findOne({
            where:{
                id,
                author_id: req.userId
            }
        })

        if(!verifyPost){
            return res.status(400).json({message: "Post dont exists"})
        }

        if(verifyPost.author_id !== req.userId){
            return res.status(401).json({message:"You dont have permission."})
        }

        const deletedPost = await Posts.destroy({
            where:{
                id
            }
        })

        if(!deletedPost){
            return res.status(400).json({message:"Failed to delete"})
        }

        return res.status(200).json({message: "Post deleted!"})
    }

    async update(req,res){
        const {id} = req.params

        const verifyPost = await Posts.findOne({
            where:{
                id,
                author_id: req.userId
            }
        })

        if(!verifyPost){
            return res.status(400).json({message: "Post dont exists"})
        }

        if(verifyPost.author_id !== req.userId){
            return res.status(401).json({message:"You dont have permission."})
        }

        const postUpdate = await Posts.update(req.bod, {where: {id}})

        if(!postUpdate){
            return res.status(400).json({message: "Failed to update"})
        }

        return res.status(200).json({message: "Post updated!"})
    }

    async addLike(req,res){
        const {id} = req.params

        const verifyPost = await Posts.findOne({
            where:{
                id,
                author_id: req.userId
            }
        })

        if(!verifyPost){
            return res.status(400).json({message: "Post dont exists"})
        }

        const postUpdate = await Posts.update({number_likes: verifyPost.number_likes + 1}, {where:{id}})

        if(!postUpdate){
            return res.status(400).json({message: "Failed to update the likes"})
        }

        return res.status(200).json({message: "Like added!"})
    }

    async listPosts(req,res){
        const allPosts = await Posts.findAll({
            where:{
                author_id: req.userId
            },
        })

        if(!allPosts){
            return res.status(400).json({message: "Failed to list all posts"})
        }

        const formattedData = []
        
        for(const post of allPosts){
            formattedData.push({
                id: post.id,
                image: post.image,
                description: post.description,
                number_likes: post.number_likes
            })
        }

        return res.status(200).json({data:formattedData})


    }
}

module.exports = new PostController()