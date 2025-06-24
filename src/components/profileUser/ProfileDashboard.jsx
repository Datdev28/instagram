import React from 'react'
import useMostInteractedPost from '../../hooks/useMostInteractedPost';
import useAuthStore from '../../store/authStore'
const ProfileDashboard = () => {
  const user = useAuthStore(state => state.user);
  const {post} = useMostInteractedPost(user?.uid);
  console.log(post);
  return (
    <div>
      
    </div>
  )
}

export default ProfileDashboard
