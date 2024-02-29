const joi = require('joi');

const registerValidator = (data) => {
    const schema = joi.object({
        login: joi.string().min(3).required().alphanum(),
        password: joi.string().min(4).required().alphanum(),
        email: joi.string(),
        isAdmin: joi.boolean(),
        fullName: joi.string(),
        city: joi.string(),
        age: joi.number(),
        proffession: joi.string()
    })

    return schema.validate(data);
}

const loginValidator = (data) => {
    const schema = joi.object({
        login: joi.string().min(3).required().alphanum(),
        password: joi.string().min(5).required().alphanum()
    })

    return schema.validate(data);
}

module.exports.regValidator = registerValidator;
module.exports.loginValidator = loginValidator;