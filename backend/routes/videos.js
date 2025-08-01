const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
    if (!file.originalname.match(/\.(mp4)$/)) {
      return cb(new Error('Only MP4 files are allowed for videos'));
    }
  } else if (file.fieldname === 'script') {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error('Only PDF files are allowed for scripts'));
    }
  } else if (file.fieldname === 'thumbnail') {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only JPG, JPEG, and PNG files are allowed for thumbnails'));
    }
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: fileFilter
});

// Upload a new video
router.post('/upload', 
  auth,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'script', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, description, category, duration } = req.body;

      // Check if user is an agent
      if (req.user.role !== 'agent') {
        return res.status(403).json({ message: 'Only agents can upload videos' });
      }

      // Validate required fields
      if (!title || !description || !category || !duration) {
        return res.status(400).json({ message: 'Title, description, category, and duration are required' });
      }

      // Validate duration format
      const durationRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$|^[0-5]?[0-9]:[0-5][0-9]$/;
      if (!durationRegex.test(duration)) {
        return res.status(400).json({ message: 'Invalid duration format. Use HH:MM:SS or MM:SS' });
      }

      // Validate required files
      if (!req.files || !req.files.video || !req.files.script) {
        return res.status(400).json({ message: 'Video and script files are required' });
      }

      // Create new video
      const video = new Video({
        title,
        description,
        category,
        duration,
        videoUrl: req.files.video[0].path,
        scriptUrl: req.files.script[0].path,
        thumbnailUrl: req.files.thumbnail ? req.files.thumbnail[0].path : '/placeholder.svg',
        uploader: req.user._id
      });

      // Save to database
      const savedVideo = await video.save();
      
      // Populate uploader details
      await savedVideo.populate('uploader', 'username email');

      res.status(201).json({
        message: 'Video uploaded successfully',
        video: savedVideo
      });
    } catch (error) {
      console.error('Video upload error:', error);
      
      // Clean up uploaded files if database save fails
      if (req.files) {
        Object.values(req.files).forEach(files => {
          files.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        });
      }

      res.status(500).json({
        message: 'Error uploading video',
        error: error.message
      });
    }
  }
);

// Get all videos (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploader', 'username email');

    const total = await Video.countDocuments({ status: 'approved' });

    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});

// Get videos by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find({ 
      category,
      status: 'approved'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploader', 'username email');

    const total = await Video.countDocuments({ 
      category,
      status: 'approved'
    });

    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total
    });
  } catch (error) {
    console.error('Error fetching videos by category:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});

// Get user's videos
router.get('/my-videos', auth, async (req, res) => {
  try {
    const videos = await Video.find({ uploader: req.user._id })
      .sort({ createdAt: -1 })
      .populate('uploader', 'username email');

    res.json(videos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Error fetching user videos', error: error.message });
  }
});

// Delete a video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if user is the uploader
    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    // Delete files from storage
    const videoPath = video.videoUrl;
    const scriptPath = video.scriptUrl;
    const thumbnailPath = video.thumbnailUrl;

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }
    if (fs.existsSync(scriptPath)) {
      fs.unlinkSync(scriptPath);
    }
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
});

// Update a video
router.put('/:id', 
  auth,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'script', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const videoId = req.params.id;

      // Find the video
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }

      // Check if user is the uploader
      if (video.uploader.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to edit this video' });
      }

      // Update video details
      video.title = title || video.title;
      video.description = description || video.description;
      video.category = category || video.category;

      // Handle file updates if provided
      if (req.files) {
        if (req.files.video) {
          // Delete old video file
          const oldVideoPath = video.videoUrl;
          if (fs.existsSync(oldVideoPath)) {
            fs.unlinkSync(oldVideoPath);
          }
          video.videoUrl = req.files.video[0].path;
        }

        if (req.files.script) {
          // Delete old script file
          const oldScriptPath = video.scriptUrl;
          if (fs.existsSync(oldScriptPath)) {
            fs.unlinkSync(oldScriptPath);
          }
          video.scriptUrl = req.files.script[0].path;
        }

        if (req.files.thumbnail) {
          // Delete old thumbnail file
          const oldThumbnailPath = video.thumbnailUrl;
          if (fs.existsSync(oldThumbnailPath)) {
            fs.unlinkSync(oldThumbnailPath);
          }
          video.thumbnailUrl = req.files.thumbnail[0].path;
        }
      }

      // Save the updated video
      const updatedVideo = await video.save();
      await updatedVideo.populate('uploader', 'username email');

      res.json({
        message: 'Video updated successfully',
        video: updatedVideo
      });
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({ message: 'Error updating video', error: error.message });
    }
  }
);

// Get featured videos (most voted from each category)
router.get('/featured', async (req, res) => {
  try {
    const categories = ['narrative', 'documentary', 'experimental', 'animation', 'dystopian', 'ai-identity'];
    const featuredVideos = [];

    // Get top voted video from each category
    for (const category of categories) {
      const video = await Video.findOne({ 
        category,
        status: 'approved'
      })
        .sort({ votes: -1, createdAt: -1 })
        .populate('uploader', 'username email')
        .limit(1);

      if (video) {
        featuredVideos.push(video);
      }
    }

    // If we don't have enough featured videos, get additional approved videos
    if (featuredVideos.length < 6) {
      const additionalVideos = await Video.find({
        status: 'approved',
        _id: { $nin: featuredVideos.map(v => v._id) }
      })
        .sort({ votes: -1, createdAt: -1 })
        .populate('uploader', 'username email')
        .limit(6 - featuredVideos.length);

      featuredVideos.push(...additionalVideos);
    }

    res.json(featuredVideos);
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    res.status(500).json({ 
      message: 'Error fetching featured videos', 
      error: error.message 
    });
  }
});

// Get a single video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username email');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
});

// Vote for a video
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id;

    // Find the video
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Check if video is approved
    if (video.status !== 'approved') {
      return res.status(400).json({ message: 'Cannot vote for unapproved videos' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has already voted this week
    if (user.lastVotedAt) {
      const lastVoteDate = new Date(user.lastVotedAt);
      const now = new Date();
      const diffTime = Math.abs(now - lastVoteDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // if (diffDays < 7) {
      //   return res.status(400).json({ 
      //     message: 'You can only vote once per week',
      //     daysUntilNextVote: 7 - diffDays
      //   });
      // }
    }

    // Check if user has votes available
    if (user.votes <= 0) {
      return res.status(400).json({ message: 'No votes available' });
    }

    // Update video votes
    video.votes += 1;
    await video.save();

    // Update user's vote count and last voted timestamp
    user.votes -= 1;
    user.lastVotedAt = new Date();
    user.points = (user.points || 0) + 10;
    await user.save();

    res.json({
      message: 'Vote recorded successfully',
      video: {
        id: video._id,
        votes: video.votes
      },
      user: {
        votes: user.votes,
        points: user.points
      }
    });
  } catch (error) {
    console.error('Error voting for video:', error);
    res.status(500).json({ 
      message: 'Error voting for video', 
      error: error.message 
    });
  }
});

module.exports = router; 