import { useSelector } from "react-redux"

const ShowTo = ({published, children, role, token}) => {
 
  const user = useSelector(state => state.users.user);
  if ((published) || (user && user.role === role) || (user && user.token === token) ) {
     return children;
  }

  return null

};

export default ShowTo;