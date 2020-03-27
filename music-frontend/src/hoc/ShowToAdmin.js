import { useSelector } from "react-redux"

const ShowToAdmin = ({published, children, role}) => {
 
  const user = useSelector(state => state.users.user);
  if (user && user.role === role && !published) {
     return children;
  }

  return null

};

export default ShowToAdmin;