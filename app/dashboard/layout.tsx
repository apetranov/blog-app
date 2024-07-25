import { ClerkLoaded } from "@clerk/nextjs"
import Header from "@/components/SignedInHeader"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function DashboardLayout({children} : {children: React.ReactNode}) {
    return <ClerkLoaded>
        <ToastContainer />
          <div className="flex-1 flex flex-col h-screen">
            <Header />
              
              <main className="flex-1 overflow-y-auto">
                  {children}
              </main>
  
              
          </div>
    </ClerkLoaded>
  }
  
  export default DashboardLayout