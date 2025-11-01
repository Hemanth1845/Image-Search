const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'mern-image-search-jwt-secret'
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
  scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ 
      $or: [
        { googleId: profile.id },
        { email: profile.emails[0].value }
      ]
    });
    
    if (user) {
      if (!user.googleId) {
        user.googleId = profile.id;
        user.profilePicture = profile.photos[0].value;
        await user.save();
      }
      return done(null, user);
    }
    
    user = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      profilePicture: profile.photos[0].value,
      authMethod: 'google'
    });
    
    await user.save();
    
    return done(null, user);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error, false);
  }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'name', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@facebook.com`;
    
    const profilePicture = (profile.photos && profile.photos[0]) ? profile.photos[0].value : '';
    
    const name = profile.displayName || (profile.name ? `${profile.name.givenName} ${profile.name.familyName}` : 'Facebook User');

    let user = await User.findOne({ 
      $or: [
        { facebookId: profile.id },
        { email: email }
      ]
    });
    
    if (user) {
      if (!user.facebookId) {
        user.facebookId = profile.id;
        if (!user.profilePicture) {
            user.profilePicture = profilePicture;
        }
        await user.save();
      }
      return done(null, user);
    }
    
    user = new User({
      facebookId: profile.id,
      name: name,
      email: email,
      profilePicture: profilePicture,
      authMethod: 'facebook'
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return done(error, false);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@users.noreply.github.com`;
    
    const profilePicture = (profile.photos && profile.photos[0]) ? profile.photos[0].value : '';

    let user = await User.findOne({ 
      $or: [
        { githubId: profile.id },
        { email: email }
      ]
    });
    
    if (user) {
      if (!user.githubId) {
        user.githubId = profile.id;
         if (!user.profilePicture) {
            user.profilePicture = profilePicture;
         }
        await user.save();
      }
      return done(null, user);
    }
    
    user = new User({
      githubId: profile.id,
      name: profile.displayName || profile.username,
      email: email,
      profilePicture: profilePicture,
      authMethod: 'github'
    });
    
    await user.save();
    return done(null, user);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});