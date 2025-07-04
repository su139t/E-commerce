import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthWrappe = (props) => {
  const { users } = useSelector((state) => state.userReducer);
    return users ? props.children : <Navigate to="/login" />;
}

export default AuthWrappe