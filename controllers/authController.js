import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js'
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {


    try {

        const { name, email, password, phone, address } = req.body;

        //validations
        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'email is required' })
        }
        if (!password) {
            return res.send({ error: 'password is required' })
        }
        if (!phone) {
            return res.send({ error: 'phone is required' })
        }
        if (!address) {
            return res.send({ error: 'address is required' })
        }


        //check exisiting users in db
        const existingUser = await userModel.findOne({ email });

        //found existing user again registering
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'This user is Already Registerd, please login'
            })
        }

        // register new user

        const hashedPassword = await hashPassword(password);

        //save new user
        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save()


        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        });

    } catch (error) {
        console.log(error);
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


//test controller

export const testController = (req, res) => {
    res.send("protected route")

}

