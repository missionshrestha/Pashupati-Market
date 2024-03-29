import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {


    try {

        const { name, email, password, phone, address,answer } = req.body;

        //validations
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'email is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }


        //check exisiting users in db
        const existingUser = await userModel.findOne({ email });

        //found existing user again registering
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'This user is Already Registerd, please login'
            })
        }

        // register new user

        const hashedPassword = await hashPassword(password);

        //save new user
        const user = await new userModel({ name, email, password: hashedPassword, phone, address ,answer}).save()


        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        });

    } catch (message) {
        console.log(message);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        });
    }

};


// POST LOGIN

export const loginController = async (req, res) => {

    try {

        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        //check user in db based on email
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        //compare current password with user password in db
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Password not matched!'
            })
        }

        // create token after validated
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role:user.role,
            },
            token

        });

        // const token = await JWT.sign({ _id: user._id }, process.env.JWT.SECRET, { expiresIn: '7d' })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {

        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'Answer is required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: 'New Password is required' })
        }


        //check
        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or answer"
            })
        }

        const newHashedPassword = await hashPassword(newPassword);

        //change password
        await userModel.findByIdAndUpdate(user._id, { password: newHashedPassword })

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error,
        })
    }


}


//test controller

export const testController = (req, res) => {
    res.send("protected route")

}

