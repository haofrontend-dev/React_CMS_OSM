import React from 'react';
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  Typography,
  Avatar,
  Box,
  Grid,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import useAppSelector from '@/hooks/useAppSelector';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
}));



const ProfileManagerView = () => {
  const { dataProfile } = useAppSelector(state => state.profile);

  const classes = useStyles();

  const profilesArray = Array.isArray(dataProfile) ? dataProfile : [dataProfile];
  
    return (
      <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          alt="User Avatar"
          src={dataProfile.avatar}
          className={classes.avatar}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Full name" variant="outlined" defaultValue={dataProfile.fullname} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email address" variant="outlined" defaultValue={dataProfile.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone number" variant="outlined" defaultValue={dataProfile.phone} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth className={classes.formControl}>
            <InputLabel>Country</InputLabel>
            <Select defaultValue={dataProfile.country} label="Country">
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="State/region" variant="outlined" defaultValue={dataProfile.state} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="City" variant="outlined" defaultValue={dataProfile.city} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Address" variant="outlined" defaultValue={dataProfile.address} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Zip/code" variant="outlined" defaultValue={dataProfiles.zipCode} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Company" variant="outlined" defaultValue={dataProfile.company} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Role" variant="outlined" defaultValue={dataProfile.role} />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Banned</Typography>
            <Switch defaultChecked={dataProfiles.banned} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Email verified</Typography>
            <Switch defaultChecked={dataProfile.emailVerified} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary">
              Delete user
            </Button>
            <Button variant="contained" color="primary">
              Save changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
    )
  
  }


export default ProfileManagerView;
