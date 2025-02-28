import Joi from "joi";

const validateAddress = (address) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required().label("First Name"),
        lastName: Joi.string().min(1).required().label("Last Name"),
        email: Joi.string().email().required().label("Email")
    });

    return schema.validate(address);
};

export default validateAddress;
