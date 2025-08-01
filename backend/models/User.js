const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'agent'],
    default: 'user'
  },
  votes: {
    type: Number,
    default: 10, // Starting votes
    min: 0
  },
  votesUsed: {
    type: Number,
    default: 0,
    min: 0
  },
  lastVotedAt: {
    type: Date,
    default: null
  },
  badges: [{
    type: String,
    enum: [
      'newcomer',
      'early_supporter',
      'regular_voter',
      'super_voter',
      'voter_10',
      'voter_50',
      'voter_100'
    ]
  }],
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 10
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user can vote
userSchema.methods.canVote = function() {
  return this.votes > 0;
};

// Method to add points and check level up
userSchema.methods.addPoints = async function(points) {
  this.points += points;
  
  // Level up logic
  const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (this.points >= levelThresholds[i]) {
      if (this.level < i + 1) {
        this.level = i + 1;
        // Add appropriate badges based on level
        if (this.level >= 3 && !this.badges.includes('regular_voter')) {
          this.badges.push('regular_voter');
        }
        if (this.level >= 5 && !this.badges.includes('super_voter')) {
          this.badges.push('super_voter');
        }
      }
      break;
    }
  }
  
  await this.save();
};

// Method to add vote badges
userSchema.methods.addVoteBadge = async function() {
  this.votesUsed += 1;
  
  // Add vote count badges
  if (this.votesUsed >= 10 && !this.badges.includes('voter_10')) {
    this.badges.push('voter_10');
  }
  if (this.votesUsed >= 50 && !this.badges.includes('voter_50')) {
    this.badges.push('voter_50');
  }
  if (this.votesUsed >= 100 && !this.badges.includes('voter_100')) {
    this.badges.push('voter_100');
  }
  
  await this.save();
};

module.exports = mongoose.model('User', userSchema); 