import { Request, Response } from "express";
import Post from "@/schema/posts.js";
import { createPostDto, updatePostDto } from "@/helpers/joi-validations.js";

class PostController {
  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
        search,
      } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const filter: any = {};

      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      const sort: any = {};
      if (sortBy === "createdAt") {
        sort.createdAt = order === "asc" ? 1 : -1;
      } else if (sortBy === "title") {
        sort.title = order === "asc" ? 1 : -1;
      }

      const [posts, total] = await Promise.all([
        Post.find(filter)
          .select("-__v")
          .sort(sort)
          .skip(skip)
          .limit(limitNum)
          .populate("user", "name username email"),
        Post.countDocuments(filter),
      ]);

      res.status(200).json({
        success: true,
        data: posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching posts",
        error: error.message,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const post = await Post.findById(id)
        .select("-__v")
        .populate("user", "name username email");

      if (!post) {
        res.status(404).json({ success: false, message: "Post not found" });
        return;
      }

      res.status(200).json({ success: true, data: post });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Error fetching post",
        error: error.message,
      });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const { error, value = {} } = createPostDto.validate(req.body);
      if (error)
        return res.status(400).json({
          message:
            error?.details[0]?.message || "Unable to validate request body",
        });
      const { title, body } = value;

      const newPost = await Post.create({ title, body, user: req.user._id });
      const populatedPost = await Post.findById(newPost._id).populate(
        "user",
        "name username email"
      );

      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: populatedPost,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error creating post",
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { error, value = {} } = updatePostDto.validate(req.body);
      if (error)
        return res.status(400).json({
          message:
            error?.details[0]?.message || "Unable to validate request body",
        });
      const { title, body } = value;

      const post = await Post.findById(id);

      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });

      if (post?.user?._id.toString() !== req.user._id.toString())
        return res.status(400).json({
          success: false,
          message: "Do not have access to edit other user posts",
        });

      if (title !== undefined) post.title = title;
      if (body !== undefined) post.body = body;

      await post.save();

      const updatedPost = await Post.findById(id).populate(
        "user",
        "name username email"
      );

      return res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error updating post",
        error: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndDelete(id);

      if (!post) {
        res.status(404).json({ success: false, message: "Post not found" });
        return;
      }

      if (post?.user?._id.toString() !== req.user._id.toString())
        return res.status(400).json({
          success: false,
          message: "Do not have access to delete other user posts",
        });

      return res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: post,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error deleting post",
        error: error.message,
      });
    }
  }
}

export default PostController;
