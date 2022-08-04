const express = require("express");
const router = express.Router();
const { Post} = require("../models");

const authMiddleware = require("../middlewares/auth-middleware");

//게시글 생성
router.post("/posts", async(req,res)=>{
   const{title,content} =req.body;
    // console.log(title,content);
    
   await Post.create({ title,content});
//    await posts.save()
   res.status(201).send({message :"게시글을 생성했습니다."});
//    res.json({message: "게시글을 생성했습니다."});
return;
});


//게시글 전체조회
router.get("/posts",async(req,res)=>{
    const posts = await Post.find().sort({ createdAt: -1 });
    
    const postList = [];
    
    for(const post of posts){
        postList.push({
            postId: post.postId+1,
            userid: post.userid+1,
            nickname: post.nickname,
            title: post.title,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
            
        });
    

    }
    res.status(200).json({data: postList})
    
    // res.send("posts page");
});

//게시글 상세조회
router.get("/posts/:postId",async(req,res)=>{
    const _id = req.params.postId;
    // const userId=req.params.userId;
    const post = await Post.findOne({_id})
    

    
    const detail={
        postId: post.postId+1,
        userid: post.userid+1,
        nickname: post.nickname,
        content: post.content,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }
    res.status(200).json({ data: detail });
});

//게시글 수정
router.put("/posts/:postId",authMiddleware,async (req,res)=>{
        const _id=req.params.postId;
        const {title,content}=req.body;

        // if(!userId || !title|| !content){
        //     res.status(400).json({message: '데이터 같지 않습니다.'});
        // return;
        // }

        // const exist = await Post.findOne({userId});
        // if (!exist) {
        //   res.status(404).json({message: '게시글 조회가 안됩니다.'});
        //   return;
        // }

        await Post.updateOne({_id},{$set:{ title, content }});
        res.status(201).json({message: "게시글을 수정하였습니다."});
})





module.exports = router;