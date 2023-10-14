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
}

module.exports = new PostController()