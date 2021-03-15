import React, {useEffect, useState} from "react";
import axios from 'axios';
import Cookie from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TabUser from './Tab/Tabs'
import Grid from '@material-ui/core/Grid';
import Navbar from '../../Navbar/NavBar'
 
const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	  paddingTop: '10%',
	  margin: '0',
	  width: '100%'
	},
	drawer: {
	  backgroundColor: '#333',
	  width: '250px',
	  marginTop: '-85px',
	},
	filter:{
	  position: 'fixed',
	  display: 'flex',
	  flexDirection: 'column',
	  width: '230px'
	}
  }));

export default function UserProfile(props) {
	const cookie = Cookie.get("login")
	const [userImg, setUserImg] = useState([])
   	const user =  props.user
	const classes = useStyles();
	
	useEffect(() => {
		const getImg = async () => {
			axios.post('/user/getimage', cookie).then((res) => {
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
		}
		const sendPos = async () => {
			const options = {
				enableHighAccuracy: true,
				timeout: 30000,
				maximumAge: 27000,
			};
			const formData = new FormData();
			navigator.geolocation.getCurrentPosition((pos) => {
				if(pos) {
					const userPos = {
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude
					}
					formData.append('latitude', userPos.latitude)
					formData.append('longitude', userPos.longitude)
					axios.post('/sendpos', formData).then((res) => {
						console.log(res.data)
					})
 				}
			}, (err) => {

			}, options)
		}
		sendPos()
		getImg()
  	 }, [])
	
	 return (
		<>
		<Navbar />
		<Grid container className={classes.root} spacing={2}>
			<Grid item xs={3}>
				<Avatar className="profil-avatar" alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
			</Grid>
			<Grid item  xs>
 					<TabUser user={user} userImg={userImg}/>
 			</Grid>
		</Grid>
		</>
 	)
}