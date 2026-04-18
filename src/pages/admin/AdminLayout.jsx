import { Navigate , Outlet , NavLink} from "react-router-dom";
import { useGlobalContext } from "../../context/AuthContext";
import { TiThMenu } from "react-icons/ti";

const AdminLayout = () => {
  const { user } = useGlobalContext();
  if (user?.role !== "admin") {
    return <Navigate to={"/"} />;
  }
  const closeDrawer =()=>{
    return document.getElementById("my-drawer-1").checked = false;
  }
  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        
        {/* Drawer Content */}
        <div className="drawer-content flex flex-col">
          {/* Header with Toggle Button */}
          <div className="bg-base-200 px-4 py-3 lg:hidden flex items-center">
            <label htmlFor="my-drawer-1" className="btn btn-ghost btn-square">
              <TiThMenu className="text-lg" />
            </label>
          </div>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
        
        {/* Sidebar - Drawer Side */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
          <aside className="bg-base-200 w-64 min-h-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 text-primary">Admin Panel</h2>
              <nav className="flex flex-col gap-2">
                <NavLink 
                  onClick={() => closeDrawer()}
                  to="/admin" 
                  end  
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
                    ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`
                  }
                >
                  📊 Dashboard
                </NavLink>
                <NavLink 
                  to="/admin/posts"
                  onClick={() => closeDrawer()} 
                  end
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
                    ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`
                  }
                >
                  📝 All Posts
                </NavLink>
                <NavLink 
                  onClick={() => closeDrawer()}
                  to="/admin/posts/create" 
                  end
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
                    ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`
                  }
                >
                  ✨ Create Post
                </NavLink>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
