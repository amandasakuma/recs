import React, {useState, useEffect, useParams} from 'react'
import {Link } from "react-router-dom"
import Microlink from '@microlink/react'


export default function RecCard({post, loggedInUser, onLike}) {

  const token = localStorage.getItem('token')
  const {hed, dek, pretty_time, content, like_count, user, link, tags} = post

    const liked = post.likes.find(element => {
      return element.user_id === loggedInUser.id
  })

  function handleLike(){
    fetch('/create-like', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",   
      },
      body: JSON.stringify({post_id:post.id, user_id:user.id})
    })
      .then(res => res.json())
      .then(data => {
        console.log('success:', data)
        if(data){
        }
      })
      .then(onLike)
    }



  return (
    <div className='rec-card'>
        <div className='card-body'>
      <div className='card-cosign'>
              {liked ? 
                  <button>Co-signed</button>
                  :
                  <button onClick={handleLike} >Co-sign</button >
                }
              <p>{like_count}</p>
            </div>  
            <h2 id="card-hed">{hed}</h2>
     
            <p>{dek}</p>
            <Link to={`/profile/${user.username}/posts`}>
              <img className="avatar" src={user.profile_pic} />
              <span>{user.username}</span>
            </Link>
            <p id="body" >{content}</p>
            {link?
            <Microlink url={link} size='large'/>
            : null
            }
            <span>{pretty_time}</span>
            {/* <span>#{tags}</span>   */}
      
        </div>
    </div>
  )
}
