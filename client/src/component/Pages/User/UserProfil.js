import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cookie from "js-cookie";
import Avatar from '@material-ui/core/Avatar';
import TabUser from './Tab/Tabs'
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CakeSharpIcon from '@material-ui/icons/CakeSharp';
import Gender from '@material-ui/icons/Wc';


export default function UserProfile(props) {
	const cookie = Cookie.get("login")
	const [userImg, setUserImg] = useState([])
	const user =  props.user

	useEffect(() => {
		axios.post('/user/getimage', cookie)
	   .then((res) => {
		 if(res.data.success === true){
		   setUserImg([
			 {id: '1', img: res.data.img1, name: 'img1'},
			 {id: '2', img: res.data.img2, name: 'img2'},
			 {id: '3', img: res.data.img3, name: 'img3'},
			 {id: '4', img: res.data.img4, name: 'img4'},
			 {id: '5', img: res.data.img5, name: 'img5'},
		   ])
		 }
	   })
	 }, [])
	return (
					<React.Fragment>
						<Grid
							container
							className="profil-container"
							justify="flex-start"
						>
						<Grid
							item
							xs={3}
							sm={3}
						>
							<Avatar className="profil-avatar" alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
						</Grid>
						<Grid
							item
						>
							<TabUser user={user} userImg={userImg}/>
						</Grid>
					</Grid>
					</React.Fragment>
 	)
}