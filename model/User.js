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



    about: {
        fullName: String,
        dob: Date,
        address: String,
        email: String,
        phoneNumber: String,
        freeLancing: String,
        cvweblink: String,
        cvfileLink: String,
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
            description: String,
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
            description: String,
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
            description: String,
            image: {
                public_id: String,
                url: String,
            },
            gitLink: String,
            demoLink: String,
        }
    ],
});

export const User = mongoose.model("User", userSchema);