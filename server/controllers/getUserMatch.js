const jwt = require("jsonwebtoken")
const NodeGeocoder = require('node-geocoder');
const {selectMatch, getDistance} = require("../utils/utils")
const {
    AgeCroissant,
    AgeDecroissant,
    FameCroissant,
    FameDecroissant,
    InterestCroissant,
    InterestDecroissant,
    DistanceCroissant,
    DistanceDecroissant
} 
= require("../utils/Filtrage")
 
const getUserMatch = async (req, res) => {
    const jwt_token = req.cookies.login
 
     if(jwt_token){
        const decode = jwt.verify(jwt_token, process.env.JWT_SECRET)
        const user_id = decode.id
        const  {orientation, gender, userLat, userLon, ageSort, distanceSort, interestSort, filterAge, filterDistance, fameSort} =  req.body
        const allprofile = await selectMatch(user_id, gender, orientation)
        const age = filterAge.split(',')
        const ageMin = age[0]
        const ageMax = age[1]

       allprofile.forEach(element => {
           const distance = Math.round(getDistance(userLat, userLon, element.latitude, element.longitude))
           element.distance = distance
        });

       if(ageSort) {
             if(ageSort === "asc") {
                allprofile.sort(AgeCroissant)
            } else if (ageSort === "desc") {
                allprofile.sort(AgeDecroissant)
            }
        }
        if(fameSort) {
            if(fameSort === "asc") {
                allprofile.sort(FameCroissant)
            } else if (fameSort === "desc") {
                allprofile.sort(FameDecroissant)
            }
        }
        if(interestSort) {
            if(interestSort === "asc") {
                allprofile.sort(InterestCroissant)
            } else if (interestSort === "desc") {
                allprofile.sort(InterestDecroissant)
            }
        }
        if(distanceSort){
            if(distanceSort === "asc"){
                allprofile.sort(DistanceCroissant)
            } else if (distanceSort === "desc") {
                allprofile.sort(DistanceDecroissant)
            }
        }
        if((ageMin != "18" || ageMax != "100") && filterDistance <= "800"){
            const  profileFilter = allprofile.filter(data => data.age >= ageMin && data.age <= ageMax && data.distance <= filterDistance)
            return res.json({
                success: true,
                allprofile: profileFilter,
            })
        }
         return res.json({
           success: true,
           allprofile: allprofile,
           filterDistance: filterDistance
         })
    } else {
        return res.json({
            success: false,
            error: "USER_NOT_LOGGED"
        })
    }
}

module.exports = getUserMatch