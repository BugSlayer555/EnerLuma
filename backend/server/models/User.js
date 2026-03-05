import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        provider: {
            type: String,
            enum: ["local", "google", "apple"],
            required: true,
            default: "local",
        },
        providerId: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            select: false, // don't return password by default
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

// Hash password before saving (only for local signups)
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Static: find or create user from OAuth profile
userSchema.statics.findOrCreateFromOAuth = async function ({
    provider,
    providerId,
    email,
    name,
    avatar,
}) {
    let user = await this.findOne({ email });

    if (user) {
        // Update provider info if they previously used a different method
        if (!user.providerId) {
            user.provider = provider;
            user.providerId = providerId;
            if (avatar && !user.avatar) user.avatar = avatar;
            if (name && !user.name) user.name = name;
            await user.save();
        }
        return user;
    }

    // Create new user
    user = await this.create({
        email,
        name: name || "",
        avatar: avatar || "",
        provider,
        providerId,
    });

    return user;
};

const User = mongoose.model("User", userSchema);
export default User;
