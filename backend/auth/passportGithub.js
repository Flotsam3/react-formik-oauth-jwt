import { Strategy as GitHubStrategy } from 'passport-github2';
import passport from 'passport';
import User from '../models/User.js';

async function getGithubEmails(accessToken) {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'User-Agent': 'Node.js'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub emails');
  }

  return response.json(); // array of emails
}

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      /* 
      Email is not automatically sent by github (especially if it's private)
      hence this function to fetch the email
      */
      const emails = await getGithubEmails(accessToken);
      const email = emails.find(e => e.primary)?.email || emails[0]?.email;
      console.log("emails", emails[0]);
      let user = await User.findOne({ email });
      console.log("accessToken", accessToken, {profile});
      
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          name: profile.displayName,
          email: email || null,
          profileImage: profile.photos[0]?.value || null,
        });
      }

      return done(null, user);
    } catch (err) {
      console.error("Error during authentication", err);
      return done(err, null);
    }
  }
));
