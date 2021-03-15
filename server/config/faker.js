const connection = require("../config/db");
const faker = require("faker")

const {getAge} = require("../utils/utils");
 

const deleteUser = () => {
    const query = "DELETE from user";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER TABLE DELETED")
            return ;
        }
    })
 };

 const deleteUserTag = () => {
    const query = "DELETE from user_tag";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER_TAG table deleted")
            return ;
        }
    })
 };

 const deleteUserImage = () => {
    const query = "DELETE from user_image";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER_IMAGE table deleted")
            return ;
        }
    })
 };

const resetUser = () => {
    
    const query = "ALTER TABLE user AUTO_INCREMENT = 1";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER TABLE REINITIALISED")
            return ;
        }
    })
};
const resetUserTag = () => {
    
    const query = "ALTER TABLE user_tag AUTO_INCREMENT = 1";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER_TAG TABLE REINITIALISED")
            return ;
        }
    })
};
const resetUserImage = () => {
    
    const query = "ALTER TABLE user_image AUTO_INCREMENT = 1";
    connection.query(query, (error, results) => {
        if(error){
            return error
        } else {
            console.log("USER_IMAGE TABLE REINITIALISED")
            return ;
        }
    })
};
const randomDateLogout = (start, end) => {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var dateObj = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = addZero(dateObj.getHours());
    var minutes = addZero(dateObj.getUTCMinutes());
    var seconds = addZero(dateObj.getUTCSeconds());

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const updateInterest = (iduser, interest) => {
    const query = "INSERT INTO user_tag SET ?";
    connection.query(query,
        [{user_id: iduser, tag_id: interest}], (error, results) => {
        if(error){
            console.log(error)
            return error
        } else {
            console.log("User Tag initialized")
            return ;
        }
    })
};


const updateTable =  (i) => {
    const orientationlist = ["Hetero", "Homo", "Bi"];
    const genderlist = ["Homme", "Femme"];
    const onlinelist = [1, 0];

    var lat = getRandomArbitrary(43, 51);
    var lon = getRandomArbitrary(-4.8, 8);

    let firstname = "";
    let lastname = faker.name.lastName();
    let email = faker.internet.email();
    let gender = genderlist[Math.floor(Math.random() * genderlist.length)];
    let orientation = orientationlist[Math.floor(Math.random() * orientationlist.length)];
    let birthday = randomDate(new Date(1920, 0, 1), new Date(2002, 0, 1));
    let created = "1596121052799"
    let age = getAge(birthday)
    let password = "$2b$10$Nl9ZrpkqGTVBM7rHqQ3.teCZXevImG/DXnpx99i5a6fiXxwcQ.A96";
    let fames = Math.floor(Math.random() * 1000);
    let online = onlinelist[Math.floor(Math.random() * onlinelist.length)];
    let bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    let latitude = lat;
    let longitude = lon;
    let date_logout = randomDateLogout(new Date(2019, 0, 1), new Date(2020, 9, 1))
    if (gender == "Homme") {
        firstname = faker.name.firstName("Homme");
        pic = "men";
    } else if (gender == "Femme") {
        firstname = faker.name.firstName("Femme");
        pic = "women";
    }

    const query = "INSERT INTO user SET ?";
    const queryImage = "INSERT INTO user_image SET ?"
    connection.query(query,
        {
            firstName: firstname,
            lastname: lastname,
            email: email,
            password: password,
            created: created,
            online: online,
            birthday: birthday,
            activate: 1,
            imgprofil: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
            verify: 1,
            bio: bio,
            date_logout: date_logout,
            age: age,
            gender: gender,
            orientation: orientation,
            popularity: fames,
            latitude: latitude,
            longitude: longitude
        }, (error, results) => {
            if(error){
                return error
            } else {
                console.log("User Created");
            }
        })
        
        connection.query(queryImage, 
            {
                user_id: i,
                img1: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
                img2: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
                img3: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
                img4: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
                img5: `https://randomuser.me/api/portraits/${pic}/${i}.jpg`,
            }, (error, results) => {
                if(error){
                    console.log(error);
                    return error;
                } else {
                    console.log("Image ADDED");
                    return;
                }
            })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/* DELETE */
deleteUser();
deleteUserTag();
deleteUserImage();

/* RESET INCREMENT */

resetUser();
resetUserImage();
resetUserTag();
for (let i = 1; i <= 99; i++) {
    updateTable(i)
    shuffle(arr)
    for (let j = 0; j < Math.floor(Math.random() * 10) + 2; j++) {
        if (arr[j]) updateInterest(i, arr[j]);
        else break;
        
    }
}