import { NoteModel } from "../models/Note.js";
export const addNote = async (req, res) => {
  const { contactId, note } = req.body;

  try {
    const newNote = new NoteModel({
      contactId,
      note
    });

    const savedNote = await newNote.save();

    return res.status(201).json({
      success: true,
      note: savedNote
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};


export const getNotesByContact = async (req, res) => {
  const { id } = req.params;

  try {
    const notes = await NoteModel.find({ contactId: id });

    return res.json({
      success: true,
      notes
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};