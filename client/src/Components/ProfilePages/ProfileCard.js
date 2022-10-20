import React from 'react'

export default function ProfileCard({post}) {
// console.log(post)
  return (
    <div className='rec-card'>
        <div className='card-body'>
            <h2>{post.hed}</h2>
            <p>{post.dek}</p>
            <span>By: {post.user.username}</span>
            <span>Published On: {post.pretty_time}</span>
            <p>{post.pub_date}</p> 
            <p id="body" >{post.content}</p> 
            <button>Like</button>
        </div>
    </div>
  )
}