const connection= require("../config/db")
const bcrypt = require("bcrypt");


const setUserImg = (user_id, imgid, imgsrc) => {
  connection.query(`UPDATE user_image SET ${imgid} = ? where user_id = ?`,
  [imgsrc, user_id], (error, results) =>{
    if(error) {
      console.log(error);
      throw error
    } else {
       return true
    }
  })
}

const updateProfilImage = (user_id, imgsrc) => {
  connection.query(`UPDATE user SET ? where id = ?`,
  [{imgprofil: imgsrc}, user_id], (error, results) => {
    if (error) {
      console.log(error)
      return false
    } else {
      console.log("Img Profil updated")
      return true
    }
  })
}

const updateUserGender = (user_id, gender) => {
  connection.query('UPDATE user SET ? where id = ?', 
  [{gender: gender}, user_id], (error, results) => {
    if(error){
      console.log(error)
      return false
    } else {
      console.log("User Gender updated")
      return true
    }
  })
}

const updateUserOrientation = (user_id, orientation) => {
  connection.query('UPDATE user SET ? where id = ?', 
  [{orientation: orientation}, user_id], (error, results) => {
    if(error){
      console.log(error)
      return false
    } else {
      console.log("User Orientation updated")
      return true
    }
  })
}

const accountactivated = (email) => {
  connection.query("UPDATE user SET ? WHERE email = ?", 
  [{activate: 1, activate_token: null}, email], (error, results) => {
    if(error) {
      console.log("accountacvited error" + error)
      throw error
    } else {
       return true
    }
  })
}

const updateSetPwdToken = (token, email) => {
  connection.query("UPDATE user SET ? WHERE email = ?",
  [{password_token: token}, email], (error, results) => {
    if(error) {
      console.log("updatepasswordtoken error" + error)
      throw error
    } else {
      console.log("Password token updated")
      return true
    }
  })
}

const setProfilData = (path_img, user_id, age, gender, orientation) => {
  connection.query("UPDATE user SET ? where id = ?", [
    {imgprofil: path_img, verify: "1", age: age, gender: gender, orientation: orientation}, user_id], (error, results) => {
    if(error){
      console.log("set imgprofil error\n" + error);
      return error
    } else {
      console.log("Imgprofil Set")
      return true
    }
  })
}

const SetProfilDataUserImage = (path_img, user_id) => {
  connection.query("INSERT INTO user_image SET ?",[
    {img1: path_img, user_id: user_id}
  ], (error, results) => {
    if(error){
      console.log(error)
      return error
    } else {
      return true
    }
  })
}

const selectMatch = async (user_id, gender, orientation) => {
  const promise = new Promise((resolve, reject) => {
    if (orientation === "Hetero") {
      const query_if_interests = `SELECT count(*) AS cntinterests, b.*
      from user_tag a INNER JOIN user b ON b.id = a.user_id
      WHERE a.tag_id IN (SELECT tag_id FROM user_tag WHERE user_id = '${user_id}') 
      AND a.user_id != '${user_id}'
      AND b.gender != '${gender}'
      AND b.orientation != 'Homo'
      GROUP BY a.user_id
      ORDER BY cntinterests DESC`;
      connection.query(query_if_interests, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } else if (orientation === "Homo") {
      const query_if_interests = `SELECT count(*) AS cntinterests, b.*
      from user_tag a INNER JOIN user b ON b.id = a.user_id
      WHERE a.tag_id IN (SELECT tag_id FROM user_tag WHERE user_id = '${user_id}') 
      AND a.user_id != '${user_id}'
      AND b.gender != '${gender}'
      AND b.orientation != 'Hetero'
      GROUP BY a.user_id
      ORDER BY cntinterests DESC`;

      connection.query(query_if_interests, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    } else if (orientation === "Bi") {
      const query_if_interests = `SELECT count(*) AS cntinterests, b.*
      from user_tag a INNER JOIN user b ON b.id = a.user_id
      WHERE a.tag_id IN (SELECT tag_id FROM user_tag WHERE user_id = '${user_id}') 
      AND a.user_id != '${user_id}'
      AND ((b.gender = '${gender}' AND b.orientation != 'Hetero') 
      OR (b.gender != '${gender}' AND  b.orientation != 'Homo'))  
      GROUP BY a.user_id
      ORDER BY cntinterests DESC`;

      connection.query(query_if_interests, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    }
  });
  return promise;
};


const setMatchLike = (user_id, match_id) => {
 const promise = new Promise((resolve, reject) => {
   connection.query('INSERT INTO match_like(user_id, match_id) VALUES(?, ?)', [user_id, match_id], (err, results) => {
     if(err) return reject(err);
     return resolve(results)
   })
 })
 return promise;
}

const setMatchUnlike = (user_id, match_id) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('DELETE FROM match_like WHERE user_id = ? AND match_id = ?', [user_id, match_id], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
 }

const checkLike =  async (user_id, match_id) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT id FROM match_like WHERE user_id = ? AND match_id = ?', [user_id, match_id], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
}

const checkBlock =  async (user_id, match_id) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT id FROM match_block WHERE user_id = ? AND match_id = ?', [user_id, match_id], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
}

const setUserTag = (user_id, value) => {
  connection.query(`INSERT INTO user_tag(user_id, tag_id) VALUES(?, ?)`, [user_id, value], (error, results) => {
    if(error){
      console.log(error);
      return error
    } else {
      console.log("User Tag Set");
      return true
    }
  })
}

const updateSetNewPassword = (password, email) => {
  bcrypt.hash(password, 10, function(err, hash) {
    connection.query("UPDATE user SET ? WHERE email = ?",
    [{password: hash, password_token: null}, email], (error, results) => {
      if(error) {
        console.log("New Password change error" + error)
        throw error
      } else {
        console.log("Password changed success")
        return true
      }
    })
  });
}

const updateSetEditNewPassword = (password, user_id) => {
  bcrypt.hash(password, 10, function(err, hash) {
    connection.query("UPDATE user SET ? WHERE id = ?",
    [{password: hash}, user_id], (error, results) => {
      if(error) {
        console.log("New Password change error" + error)
        throw error
      } else {
        console.log("Password changed success")
        return true
      }
    })
  });
}

const updateSetNewEmail = (email, user_id) => {
  connection.query("UPDATE user SET ? where id = ?", 
  [{email: email}, user_id], (error, results) => {
    if(error){
      throw error
    } else {
      return true
    }
  })
}

const updateSetNewFirstname = (firstname, user_id) => {
  connection.query("UPDATE user SET ? where id = ?", 
  [{firstname: firstname}, user_id], (error, results) => {
    if(error){
      throw error
    } else {
      return true
    }
  })
}


const updateSetNewLastname = (lastname, user_id) => {
  connection.query("UPDATE user SET ? where id = ?", 
  [{lastname: lastname}, user_id], (error, results) => {
    if(error){
      throw error
    } else {
      return true
    }
  })
}

const UpdateAddTag = (tag_id, user_id, callback) => {
  connection.query("INSERT INTO user_tag(user_id, tag_id) VALUES(?, ?)", 
  [user_id, tag_id], (error, results) => {
    if(error){
       return callback(false)
    } else {
      return callback(true)
    }
  })
}

const UpdateRemoveTag = (tag_id, user_id, callback) => {
  connection.query("DELETE FROM user_tag WHERE user_id = ? AND tag_id = ?", 
  [user_id, tag_id], (error, results) => {
    if(error){
       return callback(false)
    } else {
      return callback(true)
    }
  })
}
const CheckPassword = (password, user_id, callback) => {
  connection.query("SELECT password FROM user WHERE id = ?", [user_id], (error, results) => {
    if(error){
      throw error
    } else {
      bcrypt.compare(password, results[0].password).then((result)=>{
        if(result){
          console.log("good password")
          return callback(true)
        } else {
          console.log("wrong")
          return callback(false)
        }
      })
    }
  })
}
const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function setUserPos(user_id, latitude, longitude) {
  const promise = new Promise((resolve, reject) => {

    connection.query('UPDATE user SET ? WHERE id = ?', [{
      latitude: latitude, longitude: longitude
    }, user_id], (err, results) => {
      if(err) return reject(err)
      if(results){
        resolve(results)
        return true
      }
    })
  })

  return promise;
}

function userOffline(user_id) {
  const today = new Date()
  const promise = new Promise((resolve, reject) => {

    connection.query('UPDATE user SET ? WHERE id = ?', [{
      online: 0, date_logout: today.getTime()
    }, user_id], (err, results) => {
      if(err) return reject(err)
      if(results){
        resolve(results)
        return true
      }
    })
  })

  return promise;
}

function userOnline(user_id) {
  const promise = new Promise((resolve, reject) => {

    connection.query('UPDATE user SET ? WHERE id = ?', [{
      online: 1
    }, user_id], (err, results) => {
      if(err) return reject(err)
      if(results){
        resolve(results)
        return true
      }
    })
  })

  return promise;
}


function getHistoryLike(user_id) {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user JOIN match_like ON match_like.match_id = user.id WHERE match_like.user_id = ?', 
    [user_id], (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    })
  })

  return promise;
}

function getHistoryBlock(user_id) {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user JOIN match_block ON match_block.match_id = user.id WHERE match_block.user_id = ?', 
    [user_id], (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    })
  })

  return promise;
}

function getUserData(user_id) {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user WHERE id = ?', 
    [user_id], (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    })
  })

  return promise;
}

const setMatchBlock = (user_id, match_id) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('INSERT INTO match_block(user_id, match_id) VALUES(?, ?)', [user_id, match_id], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
 }

 const setMatchUnBlock = (user_id, match_id) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('DELETE FROM match_block WHERE user_id = ? AND match_id = ?', [user_id, match_id], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
 }

 const setNotif = (id_from, id_for, type) => {
  const promise = new Promise((resolve, reject) => {
    connection.query('INSERT INTO notification(id_from, id_for, type) VALUES(?, ?, ?)', [id_from, id_for, type], (err, results) => {
      if(err) return reject(err);
      return resolve(results)
    })
  })
  return promise;
 }

 
 function getUserImage(user_id) {
  const promise = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user_image WHERE user_id = ?', 
    [user_id], (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    })
  })

  return promise;
}

const checkMatch = async (user_id, match_id) => {
  const check1 = await checkLike(user_id, match_id);
  const check2 = await checkLike(match_id, user_id);
  if(check1.length === 1 && check2.length === 1){
    return true
  }
  return false
 }
module.exports = { 
  accountactivated, 
  updateSetPwdToken, 
  updateSetNewPassword, 
  getAge, 
  setUserTag, 
  setProfilData, 
  setUserImg, 
  updateProfilImage, 
  updateUserGender, 
  updateUserOrientation, 
  CheckPassword, 
  updateSetNewEmail, 
  updateSetNewLastname, 
  updateSetNewFirstname, 
  updateSetEditNewPassword, 
  UpdateAddTag, 
  UpdateRemoveTag, 
  SetProfilDataUserImage, 
  selectMatch,
  setMatchLike,
  checkLike,
  checkBlock,
  setMatchUnlike,
  setUserPos,
  getDistance,
  userOffline,
  userOnline,
  getHistoryLike,
  getHistoryBlock,
  getUserData,
  setMatchBlock,
  setMatchUnBlock,
  getUserImage,
  setNotif,
  checkMatch
}