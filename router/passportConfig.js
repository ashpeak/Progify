const User = require("../model/userSchema");
const LocalStrategy = require("passport-local").Strategy;

function initializingPassport(passport) {

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await User.findOne({ username });

                if (!user) return done(null, false);
                if (user.password !== password) return done(null, false);

                done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });
}


module.exports = initializingPassport;