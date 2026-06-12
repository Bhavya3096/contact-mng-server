import express from 'express'
import { Register, Login, Auth } from '../controller/userController.js'
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createContact, getContacts, getContact, updateContact, deleteContact } from '../controller/contactController.js';
import {addNote, getNotesByContact} from '../controller/noteController.js';

const router = express.Router()
router.post('/register', [
    body('name').trim().notEmpty().withMessage("Name should not be empty"),
    body('email').trim().notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Invalid Email"),
    body('password').trim().notEmpty().withMessage("Password should not be empty").isLength({ min: 5, max: 30 }).withMessage("Password length must be 5–30")
], Register)

router.post('/login', [
    body('email').trim().notEmpty().withMessage("Email should not be empty").isEmail().withMessage("Invalid Email"),
    body('password').trim().notEmpty().withMessage("Password should not be empty").isLength({ min: 5, max: 30 }).withMessage("Password length must be 5–30")
], Login)

router.get('/verify', VerifyUser, Auth)
router.post('/add-contact', VerifyUser, createContact)
router.get('/contacts', VerifyUser, getContacts)
router.get('/contacts/:id', VerifyUser, getContact)

router.put('/update-contact/:id', VerifyUser, updateContact)
router.delete('/contacts/:id', VerifyUser, deleteContact)

router.post('/add-note',VerifyUser,addNote);
router.get('/notes/:id',VerifyUser,getNotesByContact);

export { router as Router }