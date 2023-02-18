import express from "express";
import {
    addBackEndProject,
    addEducationTimeline,
    addFrontEndProject,
    addFullStackProject,
    addKnownLanguage,
    addSkill,
    addWorkTimeline,
    contact,
    deletebackEndProject,
    deleteEducationTimeline,
    deleteFrontEndProject,
    deleteFullStackProject,
    deleteKnownLanguage,
    deleteSkill,
    deleteWorkTimeline,
    getUser,
    login,
    logout,
    myProfile,
    updateUser,
} from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRoute = express.Router();

userRoute.route("/login").post(login);

userRoute.route("/logout").get(logout);

userRoute.route("/user").get(getUser);

userRoute.route("/me").get(isAuthenticated, myProfile);


userRoute.route("/dashboard/update-details").put(isAuthenticated, updateUser);

userRoute.route("/dashboard/update/education-timeline/add").post(isAuthenticated, addEducationTimeline);
userRoute.route("/dashboard/update/work-timeline/add").post(isAuthenticated, addWorkTimeline);
userRoute.route("/dashboard/update/skills/add").post(isAuthenticated, addSkill);
userRoute.route("/dashboard/update/known-language/add").post(isAuthenticated, addKnownLanguage);
userRoute.route("/dashboard/update/frontend-project/add").post(isAuthenticated, addFrontEndProject);
userRoute.route("/dashboard/update/fullstack-project/add").post(isAuthenticated, addFullStackProject);
userRoute.route("/dashboard/update/backend-project/add").post(isAuthenticated, addBackEndProject);

userRoute.route("/dashboard/update/education-timeline/delete/:id").delete(isAuthenticated, deleteEducationTimeline);
userRoute.route("/dashboard/update/work-timeline/delete/:id").delete(isAuthenticated, deleteWorkTimeline);
userRoute.route("/dashboard/update/skills/delete/:id").delete(isAuthenticated, deleteSkill);
userRoute.route("/dashboard/update/known-language/delete/:id").delete(isAuthenticated, deleteKnownLanguage);
userRoute.route("/dashboard/update/frontend-project/delete/:id").delete(isAuthenticated, deleteFrontEndProject);
userRoute.route("/dashboard/update/fullstack-project/delete/:id").delete(isAuthenticated, deleteFullStackProject);
userRoute.route("/dashboard/update/backend-project/delete/:id").delete(isAuthenticated, deletebackEndProject);


userRoute.route("/contact").post(contact);
