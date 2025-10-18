// import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   try {
//     const decoded = jwt_decode(token);
//     const currentTime = Date.now() / 1000;

//     if (decoded.exp < currentTime) {
//       localStorage.removeItem("token");
//       return <Navigate to="/login" />;
//     }

//     return children;
//   } catch (err) {n
//     localStorage.removeItem("token");
//     return <Navigate to="/login" />;
//   }
// }

// ProtectedRoute.jsx
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const persisted = localStorage.getItem("persist:UserInfo");
  let token;
  if (persisted) {
    try {
      const parsedPersist = JSON.parse(persisted);
      token = JSON.parse(parsedPersist.token);

      console.log(token);
    } catch (err) {
      console.error("Failed to parse persisted user info:", err);
    }
  }

  if (!token) {
    return <Navigate to="/login" />;
  }
  console.log(
    "tokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentoken"
  );
  console.log(token);
  console.log(
    "tokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentokentoken"
  );

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("persist:UserInfo");
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  } catch (err) {
    localStorage.removeItem("persist:UserInfo");
    console.log(err);
    return <Navigate to="/login" />;
  }
}
