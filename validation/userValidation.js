const {check}=require("express-validator")

exports.signupValidation=[
    check("userEmail","userEmail is required").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check("password",
    "password must greater than 8 charecter ,one lowerCase latter,one upperCase latter ,and one number,one speacial charecter"
    ).isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1
    })
]