import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";
import Artists from "./containers/Artists/Artists";
import ArtistDetial from "./containers/ArtistDetial/ArtistDetial";
import Albums from "./containers/Albums/Albums";
import AlbumDetial from "./containers/AlbumDetial/AlbumDetial";
import RegisterLoginForm from './containers/RegisterLoginForm/RegisterLoginForm';
import UserDetail from "./containers/UserDetail/UserDetail";
import AlbumAddForm from './containers/AlbumAddForm/AlbumAddForm';
import ArtistAddForm from './containers/ArtistAddForm/ArtistAddForm';
import TrackAddForm from './containers/TrackAddForm/TrackAddForm';

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to='/login'/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);
  return (
    <Switch>
      <Route path="/" exact component={Artists} />
      <Route path="/register" exact component={ RegisterLoginForm } />
      <Route path="/login" exact component={ RegisterLoginForm }/>
      <Route path="/artists/:id" component={ArtistDetial} />
      <Route path="/artists" component={Artists} />
      <Route path="/albums/:id" component={AlbumDetial} />
      <Route path="/albums" component={Albums} /> 
      <ProtectedRoute isAllowed={user} path="/add-album" exact component={ AlbumAddForm } /> 
      <ProtectedRoute isAllowed={user} path="/add-artist" exact component={ ArtistAddForm } /> 
      <ProtectedRoute isAllowed={user} path="/add-track" exact component={ TrackAddForm } /> 
      <ProtectedRoute isAllowed={user} path="/users/:id" component={UserDetail} /> 
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  )
}

export default Routes
