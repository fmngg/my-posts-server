import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      image: req.body.image,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice();

    res.json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get tags",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { views: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Unable to get post",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    res.status(500).json({
      message: "Unable to get post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Unable to delete posts",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Post not found",
          });
        }

        res.json({ message: "Deleted" });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};

export const edit = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        image: req.body.image,
        user: req.userId,
      },
      {
        returnDocument: "after",
      }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};
