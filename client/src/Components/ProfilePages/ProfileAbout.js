import React, {useState} from 'react'


export default function ProfileAbout({user, handleDelete}) {

const {username, bio, email, profile_pic} = user

  let intitialForm= {
    username: username,
    bio: bio,
    email: email,
    profile_pic: profile_pic,
  }

  const [profileEdits, setProfileEdits] = useState(intitialForm)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const token = localStorage.getItem('token')

  const handleEdit = (e) => {
        setProfileEdits({
            ...profileEdits,
            [e.target.name]: e.target.value,
        });
    };

  function handleEditClick(){
    setShowUpdateForm(!showUpdateForm)
  }

  function handleProfileEdit(e){
    e.preventDefault();
    fetch(`/profile/${username}`, {
      method: 'PATCH', 
      body: JSON.stringify(profileEdits),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      setShowUpdateForm(!showUpdateForm)
  }

  function handleDelete(){
    fetch(`/users/${user.id}`, {
      method: 'DELETE',
      'Authorization': `Bearer ${token}`
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }
console.log(user.posts)

  return (
<>
  {showUpdateForm?
  <form className="form" onSubmit={handleProfileEdit}>

      <h2>Edit Profile</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        defaultValue={username}
        onChange={handleEdit}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        defaultValue={email}
        onChange={handleEdit}
      />

    <label htmlFor="bio">Bio</label>
      <input
        type="text"
        name="bio"
        defaultValue={bio}
        onChange={handleEdit}
      />

      <label htmlFor="profile_pic">Photo</label>
      <input
        type="text"
        name="image"
        defaultValue={profile_pic}
        onChange={handleEdit}
      />

      <button type="submit">Save</button>
    </form>

    :

    <div className='about'>
      <h2>{user.username}</h2>
      <p>{user.bio}</p>
      <img src={user.profile_pic} />
      <p>Followers {user.follower_count}</p>
    </div>

  }
  <button onClick={handleEditClick} >Edit Profile</button>
  <button onClick={handleDelete} >Delete Profile</button>  
</>
  )
}
