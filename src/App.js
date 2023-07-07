import './App.css';
import Body from './components/Body';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/store";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import Register from './components/Register'
import Login from './components/Login'
import PdfViewer from './components/PdfViewer';
import MyPdf from './components/MyPdf'
import Shared from './components/Shared'
import MyProfile from './components/MyProfile'

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>
  },
  {  
    path: "/",
    element: <Body/>,
    children:[
        {
          path: "/",
          element: <MainContainer/>,
        },          
        {
          path: "/dashboard/:id",
          element: <PdfViewer />
        },        
        {
          path: "/shared",
          element: <Shared />,
          children: [
            {
              path: "/shared/:id",
              element: <PdfViewer />
            }
          ]
        },
        {
          path: "/my-pdfs",
          element: <MyPdf />
        },
        {
          path: "/my-profile",
          element: <MyProfile />
        }             
    ]
  }
])

function App() {
  return (
      <>
        <Provider store={store}>                                
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router = {appRouter}/>                  
          </PersistGate>
        </Provider>
      </>
  );
}

export default App;
