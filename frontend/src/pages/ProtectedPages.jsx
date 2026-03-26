import { useUser } from "@clerk/react"
import { useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { Aftersignup, getuserdata } from "../services/api"
import Loading from "../components/Loading"

const ProtectedPages = ({ children, userdata, setuserdata }) => {
  const { isSignedIn, isLoaded, user } = useUser()

  //fetch the token and send a get request ot get the role and subscription plan
  useEffect(() => {
    const fetchdata = async () => {
      try {
        //try to fetch account if created
        const result = await getuserdata()
        const data = result.data
        setuserdata(data.data)
      } catch (error) {
        //if account not found create one 
        if (error.response.status == 404) {
          try {
            const result = await Aftersignup()
            const data = result.data
            setuserdata(data.data)
          } catch (error) {
            console.log(error.response.data);
          }
        }
      }
    }
    if (isSignedIn && isLoaded && !userdata) {
      fetchdata()
    }
  }, [isLoaded, isSignedIn])
  if(!isLoaded){
    return(
      <div className="flex justify-center items-center h-dvh">
        <Loading text="loading clerk..."/>
      </div>
    )
  }
  else if (!isSignedIn) {
    return (
      <Navigate to={"/login"} replace></Navigate>

    )
  }
  else if (!userdata) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Loading text="fetching user data, may take upto a min if server is turned down, please wait"/>
      </div>
    )
  }
  else if (!userdata.plan) {
    return (
      <Navigate to={"/pricing"} replace />
    )
  }
  else {
    return (
      children
    )
  }
}

export default ProtectedPages