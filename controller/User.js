import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // find user
        const user = await User.findOne({ userName, password });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Credentials" });
        }

        // generate token on finding user and login
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

        // cretae cookie which expires in 10 min
        res.status(200)
            .cookie("token", token, {
                expires: new Date(Date.now() + 10 * 60 + 1000),
                httpOnly: true,
            })
            .json({ success: true, message: "Logged In Successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        // set cookie null and change expires to current time
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

// this function is called when website is loaded
export const getUser = async (req, res) => {
    try {
        //finds very first user without username and password
        const user = await User.findOne().select("-userName -password");

        res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const myProfile = async (req, res) => {
    try {
        // finds firrst user with specified id
        const user = await User.findById(req.user._id);

        res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        sendMail(name, email, message);

        res.status(200).json({
            success: true,
            message: "Message sent Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        //finds very first user without username and password
        const user = await User.findById(req.user._id);

        // extract all new details and will use new funciton for arrays
        const { name, userName, password, about, skillsCubeImg } = req.body;

        if (name) {
            user.name = name;
        }
        if (userName) {
            user.userName = userName;
        }
        if (password) {
            user.password = password;
        }
        if (about) {
            user.about.fullName = about.fullName;
            user.about.dob = about.dob;
            user.about.address = about.address;
            user.about.email = about.email;
            user.about.phoneNumber = about.phoneNumber;
            user.about.freeLancing = about.freeLancing;
            user.about.cvweblink = about.cvweblink;
            user.about.cvfileLink = about.cvfileLink;

            if (about.avatar) {
                // deletes old image before uploading a new image
                await cloudinary.v2.uploader.destroy(
                    user.about.avatar.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    about.avatar,
                    { folder: "portfolio" }
                );

                user.about.avatar = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }
        if (skillsCubeImg) {
            if (skillsCubeImg.image1) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image1.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image1,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image1 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (skillsCubeImg.image2) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image2.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image2,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image2 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (skillsCubeImg.image3) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image3.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image3,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image3 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (skillsCubeImg.image4) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image4.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image4,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image4 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (skillsCubeImg.image5) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image5.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image5,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image5 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
            if (skillsCubeImg.image6) {
                await cloudinary.v2.uploader.destroy(
                    user.skillsCubeImg.image6.public_id
                );

                const myCloud = await cloudinary.v2.uploader.upload(
                    skillsCubeImg.image6,
                    { folder: "portfolio" }
                );

                user.skillsCubeImg.image6 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                };
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

export const addEducationTimeline = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // finds firrst user with specified id
        const user = await User.findById(req.user._id);

        // educationTimeline
        user.educationTimeline.unshift({ title, description, date });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Education Timeline Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const addWorkTimeline = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        const user = await User.findById(req.user._id);

        user.workTimeline.unshift({ title, description, date });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Work Timeline Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const addSkill = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findById(req.user._id);

        user.skills.unshift({ name });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Skill Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const addKnownLanguage = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findById(req.user._id);

        user.languagesKnown.unshift({ name });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Known Language Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


export const addFrontEndProject = async (req, res) => {
    try {
        const { title, description, image, gitLink, demoLink } = req.body;

        // finds firrst user with specified id
        const user = await User.findById(req.user._id);

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        });

        user.frontendProjects.unshift({
            title,
            description,
            date,
            gitLink,
            demoLink,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Frontend Project Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const addFullStackProject = async (req, res) => {
    try {
        const { title, description, image, gitLink, demoLink } = req.body;

        const user = await User.findById(req.user._id);

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        });

        user.fullstackProjects.unshift({
            title,
            description,
            date,
            gitLink,
            demoLink,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Full Stack Project Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const addBackEndProject = async (req, res) => {
    try {
        const { title, description, image, gitLink, demoLink } = req.body;

        const user = await User.findById(req.user._id);

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio",
        });

        user.backendProjects.unshift({
            title,
            description,
            date,
            gitLink,
            demoLink,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Backend Project Added Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};



export const deleteEducationTimeline = async (req, res) => {
    try {
        const { id } = req.params;

        // finds firrst user with specified id
        const user = await User.findById(req.user._id);

        // educationTimeline
        const newEduTimeline = user.educationTimeline.filter((item) => item._id !== id);
        user.educationTimeline = newEduTimeline;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Education Timeline Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const deleteWorkTimeline = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const newWorkTimeline = user.workTimeline.filter((item) => item._id !== id);
        user.workTimeline = newWorkTimeline;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Work Timeline Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const newskills = user.skills.filter((item) => item._id !== id);
        user.skills = newskills;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Skill Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const deleteKnownLanguage = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const newKnownLan = user.languagesKnown.filter((item) => item._id !== id);
        user.languagesKnown = newKnownLan;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Language Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


export const deleteFrontEndProject = async (req, res) => {
    try {
        const { id } = req.params;

        // finds firrst user with specified id
        const user = await User.findById(req.user._id);

        // find project with id to delete image from cloudinary
        const project = user.frontendProjects.filter((project) => project._id === id);
        await cloudinary.v2.uploader.destroy(project.image.public_id);

        // forntend projects
        const newFrontEndProjects = user.frontendProjects.filter((project) => project._id !== id);
        user.frontendProjects = newFrontEndProjects;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Frontend Project Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const deleteFullStackProject = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const project = user.fullstackProjects.filter((project) => project._id === id);
        await cloudinary.v2.uploader.destroy(project.image.public_id);

        const newFullStackProjects = user.fullstackProjects.filter((project) => project._id !== id);
        user.fullstackProjects = newFullStackProjects;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Full Stack Project Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};
export const deletebackEndProject = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(req.user._id);

        const project = user.backendProjects.filter((project) => project._id === id);
        await cloudinary.v2.uploader.destroy(project.image.public_id);

        const newBackendProjects = user.backendProjects.filter((project) => project._id !== id);
        user.backendProjects = newBackendProjects;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Backend Project Deleted Successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};