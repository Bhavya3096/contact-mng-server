import express from 'express'
import { ContactModel } from '../models/Contact.js'
const createContact = async (req, res) => {
    const { name, email, phone, address } = req.body;
    try {
        const newContact = new ContactModel({
            name,
            email,
            phone,
            address,
            postedBy: req.user._id
        });
        const result = await newContact.save();
        return res.status(201).json({
            success: true,
            contact: result
        });
    } catch (err) {
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already exists for this user"
    });
  }

  return res.status(500).json({
    success: false,
    error: err.message
  });
}
};
const getContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find({
            postedBy: req.user._id
        });
        return res.status(200).json({
            success: true,
            contacts
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
const getContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ error: "No Id specified" });
    }
    try {
        const contact = await ContactModel.findOne({
            _id: id,
            postedBy: req.user._id  
        });
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        return res.status(200).json({
            success: true,
            contact 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};
const updateContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ error: "No Id specified" });
    }
    try {
        const result = await ContactModel.findOneAndUpdate(
            { _id: id, postedBy: req.user._id },
            { ...req.body },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }
        return res.status(200).json({ 
            success: true,
            contact: result
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(401).json({ error: "No Id specified" });
    }
    try {
        const contact = await ContactModel.findOne({_id: id});
        if (!contact) {
            return res.status(401).json({error: "Contact not found"});
        }
        const deleteRecord=await ContactModel.findByIdAndDelete({_id:id})
        const contacts=await ContactModel.find({postedBy:req.user._id})
        return res.status(200).json({ success: true, contacts });
    } catch (err) {
        return res.status(500).json({ success: false,error: err.message});
    }
};
export {createContact,getContacts,getContact,updateContact,deleteContact}      