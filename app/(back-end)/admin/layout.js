import AdminMenu from "@/components/back-end/AdminMenu"
import NavBar from "@/components/back-end/Navbar"


const AdminLayout = ({children}) => {
  return (
    <div data-theme='sunset'  className="theme-controller  top-0 left-0 z-[1000] h-full w-full ">
      <NavBar/>
      <hr />
      <section className="main flex h-">
        <div className="admin_menu w-[20%]  h-[calc(100vh-4rem)] overflow-y-scroll scrollbar-none " data-theme='luxury'>
          <AdminMenu />

        </div>
          <div className="scrollbar-none w-full h-[calc(100vh-4rem)] overflow-y-auto">
          {children}  
          </div>
      </section>
    </div>
  )
}

export default AdminLayout
