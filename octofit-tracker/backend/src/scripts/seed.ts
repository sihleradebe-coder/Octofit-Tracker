import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SeedUser' }],
});

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'SeedUser', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'SeedUser', required: true },
  points: { type: Number, required: true },
});

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  exercises: [{ type: String }],
});

const User = mongoose.model('SeedUser', userSchema, 'users');
const Team = mongoose.model('SeedTeam', teamSchema, 'teams');
const Activity = mongoose.model('SeedActivity', activitySchema, 'activities');
const Leaderboard = mongoose.model('SeedLeaderboard', leaderboardSchema, 'leaderboard');
const Workout = mongoose.model('SeedWorkout', workoutSchema, 'workouts');

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@octofit.example', password: 'password123' },
      { username: 'jamie', email: 'jamie@octofit.example', password: 'password123' },
      { username: 'taylor', email: 'taylor@octofit.example', password: 'password123' },
    ]);
    const [alex, jamie, taylor] = users;

    if (!alex || !jamie || !taylor) {
      throw new Error('Expected three users to be created');
    }

    await Team.create([
      { name: 'Peak Performers', members: [alex._id, jamie._id] },
      { name: 'Trail Blazers', members: [jamie._id, taylor._id] },
    ]);

    await Activity.create([
      { user: alex._id, type: 'Running', duration: 30, date: new Date('2026-08-20') },
      { user: jamie._id, type: 'Cycling', duration: 45, date: new Date('2026-08-21') },
      { user: taylor._id, type: 'Strength', duration: 40, date: new Date('2026-08-22') },
    ]);

    await Leaderboard.create([
      { user: alex._id, points: 320 },
      { user: jamie._id, points: 285 },
      { user: taylor._id, points: 240 },
    ]);

    await Workout.create([
      {
        name: 'Full Body Foundations',
        type: 'Strength',
        duration: 30,
        exercises: ['Squats', 'Push-ups', 'Plank'],
      },
      {
        name: 'Cardio Starter',
        type: 'Cardio',
        duration: 25,
        exercises: ['Jumping jacks', 'High knees', 'Mountain climbers'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
