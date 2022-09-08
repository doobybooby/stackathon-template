import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/pages/Home';
import { Blogs } from './components/pages/Blogs';
import {me} from './store'
import { Root } from './components/pages/Root';
import { BlogDetails } from './components/pages/BlogDetails';
import { ProfilePage } from './components/pages/ProfilePage';
import { Landing } from './components/pages/Landing';
import { NavAccount } from './components/utils/NavAccount';
import { ProfilePageEdit } from './components/pages/ProfilePageEdit';
import { BlogForm } from './components/utils/BlogForm';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div >
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Landing} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/profile/create_blog" component={BlogForm} />
            <Route path="/profile/edit" component={ProfilePageEdit} />
            <Route path="/profile" component={ProfilePage} />
            <Redirect to="/profile" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/root" component={Root} />
            <Route path="/account" component={NavAccount} />
            <Route path='/' exact component={ Landing } />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
