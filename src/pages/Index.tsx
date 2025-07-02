import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to login since we're using authentication
  return <Navigate to="/login" replace />;
};

export default Index;
