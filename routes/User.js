import express from "express";
import {
    addBackEndProject,
    addEducationTimeline,
    addFeedback,
    addFrontEndProject,
    addFullStackProject,
    addKnownLanguage,
    addSkill,
    addSocialLink,
    addWorkTimeline,
    deleteBackEndProject,
    deleteEducationTimeline,
    deleteFeedback,
    deleteFrontEndProject,
    deleteFullStackProject,
    deleteKnownLanguage,
    deleteSkill,
    deleteSocialLink,
    deleteWorkTimeline,
    editEducationTimeline,
    editKnownLanguage,
    editSkill,
    editWorkTimeline,
    getUser,
    login,
    logout,
    myProfile,
    updateAbout,
    updateHome,
    updateLoginDetails,
    updateSkillImages,
} from "../controller/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRoute = express.Router();

userRoute.route("/login").post(login);

userRoute.route("/logout").get(logout);

userRoute.route("/user").get(getUser);

userRoute.route("/me").get(isAuthenticated, myProfile);

userRoute.route("/update-login-details").put(isAuthenticated, updateLoginDetails);
userRoute.route("/update-home-details").put(isAuthenticated, updateHome);
userRoute.route("/update-about-details").put(isAuthenticated, updateAbout);
userRoute.route("/update-skill-images").put(isAuthenticated, updateSkillImages);

userRoute.route("/update/education-timeline/add").post(isAuthenticated, addEducationTimeline);
userRoute.route("/update/work-timeline/add").post(isAuthenticated, addWorkTimeline);
userRoute.route("/update/skills/add").post(isAuthenticated, addSkill);
userRoute.route("/update/known-language/add").post(isAuthenticated, addKnownLanguage);
userRoute.route("/update/frontend-project/add").post(isAuthenticated, addFrontEndProject);
userRoute.route("/update/fullstack-project/add").post(isAuthenticated, addFullStackProject);
userRoute.route("/update/backend-project/add").post(isAuthenticated, addBackEndProject);
userRoute.route("/update/social-link/add").post(isAuthenticated, addSocialLink);

userRoute.route("/update/education-timeline/delete/:id").delete(isAuthenticated, deleteEducationTimeline);
userRoute.route("/update/work-timeline/delete/:id").delete(isAuthenticated, deleteWorkTimeline);
userRoute.route("/update/skills/delete/:id").delete(isAuthenticated, deleteSkill);
userRoute.route("/update/known-language/delete/:id").delete(isAuthenticated, deleteKnownLanguage);
userRoute.route("/update/frontend-project/delete/:id").delete(isAuthenticated, deleteFrontEndProject);
userRoute.route("/update/fullstack-project/delete/:id").delete(isAuthenticated, deleteFullStackProject);
userRoute.route("/update/backend-project/delete/:id").delete(isAuthenticated, deleteBackEndProject);
userRoute.route("/update/social-link/delete/:id").delete(isAuthenticated, deleteSocialLink);

userRoute.route("/update/education-timeline/edit/:id").put(isAuthenticated, editEducationTimeline);
userRoute.route("/update/work-timeline/edit/:id").put(isAuthenticated, editWorkTimeline);
userRoute.route("/update/known-language/edit/:id").put(isAuthenticated, editKnownLanguage);
userRoute.route("/update/skill/edit/:id").put(isAuthenticated, editSkill);

userRoute.route("/add/feedback").post(addFeedback);
userRoute.route("/delete/feedback/:id").delete(deleteFeedback);
