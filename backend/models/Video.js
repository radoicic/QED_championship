const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['narrative', 'documentary', 'experimental', 'animation', 'dystopian', 'ai-identity']
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default: '/placeholder.svg'
  },
  scriptUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Validate duration format (HH:MM:SS or MM:SS)
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$|^[0-5]?[0-9]:[0-5][0-9]$/.test(v);
      },
      message: props => `${props.value} is not a valid duration format! Use HH:MM:SS or MM:SS`
    }
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
videoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video; 