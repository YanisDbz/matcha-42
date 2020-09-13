import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TagUSer from './Tags/Tag'
import TabPanel from './Tab/Tabs'
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CakeSharpIcon from '@material-ui/icons/CakeSharp';
import Gender from '@material-ui/icons/Wc';


const useStyles = makeStyles((theme) => ({
  	list: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: '#333',
	}
}));


export default function UserProfile(props) {
	const classes = useStyles();
	const user =  props.user

	return (
 		 <Container fixed>
			 <div className="profil-container">
				 <Avatar className="profil-avatar" alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
				 <Typography variant="caption" style={{fontSize: '1.25rem', lineHeight: '5.66'}} display="block" gutterBottom>
					 {user.firstname + ' ' + user.lastname}
      			</Typography>
				  <Grid 
					  container
					  direction="row"
					  justify="space-around"
					  alignItems="baseline"
					  spacing={10}
				  >
					<Grid item xs={3}>
						<TagUSer/>
					</Grid>
					<Grid item xs={6}>
						<TabPanel user={user}/>
					</Grid>
					<Grid item xs={3}>
					<List className={classes.list}>
						<ListItem>
							<ListItemAvatar>
							<Avatar>
								<Gender />
							</Avatar>
							</ListItemAvatar>
							<ListItemText  primary={user.gender} />
						</ListItem>
						<ListItem>
							<ListItemAvatar>
							<Avatar>
								<FavoriteIcon />
							</Avatar>
							</ListItemAvatar>
							<ListItemText primary={user.orientation} />
						</ListItem>
						<ListItem>
							<ListItemAvatar>
							<Avatar>
								<CakeSharpIcon />
							</Avatar>
							</ListItemAvatar>
							<ListItemText primary={user.age} />
						</ListItem>
						</List>
					</Grid>
			 	</Grid>
			 </div>
     	 </Container>
 	)
}