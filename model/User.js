import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name: String,
    userName: {
        type: String,
        unique: true,
        required: [true, "Please Enter UserName"],
    },
    password: {
        type: String,
        select: false,
        required: [true, "Please Enter Password"],
    },

    home: {
        detail: String,
        quote: String,
        banner_img: {
            public_id: String,
            url: String,
        },
        background: {
            public_id: String,
            url: String,
        },
    },

    about: {
        fullName: String,
        dob: Date,
        address: String,
        email: String,
        phoneNumber: String,
        freeLancing: String,
        cvweblink: String,
        cvfileLinkLight: String,
        cvfileLinkDark: String,
        avatar: {
            public_id: String,
            url: String,
        },
    },
    languagesKnown: [
        {
            name: String,
        }
    ],



    educationTimeline:[
        {
            title: String,
            description: String,
            startdate: Date,
            enddate: Date,
        }
    ],

    workTimeline:[
        {
            title: String,
            description: String,
            startdate: Date,
            enddate: Date,
        }
    ],



    skillsCubeImg: {
        image1: {
            public_id: String,
            url: String,
        },
        image2: {
            public_id: String,
            url: String,
        },
        image3: {
            public_id: String,
            url: String,
        },
        image4: {
            public_id: String,
            url: String,
        },
        image5: {
            public_id: String,
            url: String,
        },
        image6: {
            public_id: String,
            url: String,
        },
    },

    skills: [
        {
            name: String,
        }
    ],


    frontendProjects: [
        {
            title: String,
            techstack: String,
            image: {
                public_id: String,
                url: String,
            },
            gitLink: String,
            demoLink: String,
        }
    ],
    fullstackProjects: [
        {
            title: String,
            techstack: String,
            image: {
                public_id: String,
                url: String,
            },
            gitLink: String,
            demoLink: String,
        }
    ],
    backendProjects: [
        {
            title: String,
            techstack: String,
            image: {
                public_id: String,
                url: String,
            },
            gitLink: String,
            demoLink: String,
        }
    ],

    socialLinks: [
        {
            name: String,
            link: String,
            color: String,
            icon: {
                public_id: String,
                url: String,
            },
        }
    ],

    feedbacks: [
        {
            name: String, 
            email: String, 
            message: String,
        },
    ],

});

export const User = mongoose.model("User", userSchema);