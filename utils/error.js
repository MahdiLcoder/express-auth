const handleErrors = (err) => {
    let errors = { email: "", password: "", confirmPassword: "" };

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};
export default handleErrors;
