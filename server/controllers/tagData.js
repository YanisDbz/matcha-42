const jwt = require("jsonwebtoken")
const connection = require("../config/db")
const {UpdateAddTag, UpdateRemoveTag} = require("../utils/utils")

const getTagData = (req, res) => {
  const jwt_token = req.cookies.login

  if(jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    connection.query("SELECT tag_id, label FROM tag JOIN user_tag ON tag.id = user_tag.tag_id WHERE user_tag.user_id = ?",
    [user_id], (error, results) => {
      if(error){
        throw error
      } else {
        return res.json({
          success: true,
          active_tag: results
        })
      }
    })
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}

const getMatchTagData = (req, res) => {
  const {match_id} = req.body

  if(match_id) {
     connection.query("SELECT tag_id, label FROM tag JOIN user_tag ON tag.id = user_tag.tag_id WHERE user_tag.user_id = ?",
    [match_id], (error, results) => {
      if(error){
        throw error
      } else {
        return res.json({
          success: true,
          active_tag: results
        })
      }
    })
  }
}

const addTag = (req, res) => {
  const jwt_token = req.cookies.login

  if(jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const {tag_id} = req.body
    UpdateAddTag(tag_id, user_id, (result) => {
      if(result){
        return res.json({
          success: true,
        })
      } else {
        return ;
      }
    })
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}


const removeTag = (req, res) => {
  const jwt_token = req.cookies.login

  if(jwt_token) {
    const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
    const user_id = decode.id
    const {tag_id} = req.body
    UpdateRemoveTag(tag_id, user_id, (result) => {
      if(result){
        return res.json({
          success: true,
        })
      } else {
        return ;
      }
    })
  } else {
    return res.json({
      success: false,
      error: "USER_NOT_LOGGED",
      message: "User not logged"
    })
  }
}
module.exports = {getTagData, addTag, removeTag, getMatchTagData}