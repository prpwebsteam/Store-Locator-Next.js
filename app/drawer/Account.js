import React, { useEffect, useState } from 'react';

function Account() {
  const [userDetails, setUserDetails] = useState({
    email: '',
});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, "bhairav")
    if (user) {
      setUserDetails({
        ...userDetails,
        email: user.email,
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col py-10 overflow-hidden bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-[24px] font-bold py-4">User Details</h2>
        <div className="flex flex-col w-[90%] md:w-[45%]">
          <p>Email: {userDetails.email}</p>
        </div>
      </div>
    </>
  );
}

export default Account;