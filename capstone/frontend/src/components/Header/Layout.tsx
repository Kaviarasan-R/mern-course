import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
      <>
        <div className="container bg-gray-800/70">
          <Outlet />
        </div>
      </>
    );
}

export default Layout