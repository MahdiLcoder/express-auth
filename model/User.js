import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        minlength: 6,
        validate: {
            validator: function (v) {
                return v === this.password;
            },
            message: 'Password and confirm password do not match!'
        }
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})
userSchema.methods.correctPassword = (candidatePassword, userPassword) => {
    return bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema);
export default User;