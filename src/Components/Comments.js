import React, { useEffect, useState } from 'react'
import './Comments.css'

const Comments = ({ selectedUser, onSelectedUserChange }) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch('/api/comments').then(r => {
            if (!r.ok)
                return
            r.json().then(c => {
                setComments(c)
            })
        })
    }, [])

    console.log({ comments });
    return <section className='comments'>
        {comments.map(c => <div key={c.comment_id}>
            <CommentList  {...c} />
        </div>)}
    </section>
}

export { Comments }

const CommentList = (props) => {

    return <div>
        <CommentBox {...props} />
        {props.replies && props.replies.map(r => {
            return <CommentBox nested key={r.comment_id} {...r} />
        })}
    </div>
}

function formatDate(d) {
    const dateObj = new Date(d),
        currentDateObj = new Date(),
        milliSecondsInYear = 1000 * 60 * 60 * 24 * 365,
        milliSecondsInMonth = 1000 * 60 * 60 * 24 * 30,
        milliSecondsInDay = 1000 * 60 * 60 * 24,
        date = getDateObj(dateObj),
        currentDate = getDateObj(currentDateObj),

        diff = currentDate.ms - date.ms;

    if (diff < milliSecondsInDay) {
        if (currentDate.day === date.day)
            return `Today at ${('0' + date.hours).slice(-2)}:${('0' + date.minutes).slice(-2)} ${date.period}`
        else
            return `Yesterday at ${('0' + date.hours).slice(-2)}:${('0' + date.minutes).slice(-2)} ${date.period}`
    } else if (diff < milliSecondsInMonth) {
        const monthsDiff = Math.ceil(diff / milliSecondsInMonth)
        if (monthsDiff === 1)
            return `A month ago`
        else
            return `${monthsDiff} months ago`
    } else if (diff < milliSecondsInYear) {
        const yearsDiff = Math.ceil(diff / milliSecondsInYear)
        if (yearsDiff === 1)
            return `A year ago`
        else
            return `${yearsDiff} years ago`
    }
    return `A while ago`
}

function getDateObj(date) {
    const day = date.getDay(),
        month = date.getMonth(),
        year = date.getFullYear(),
        minutes = date.getMinutes();
    let hours = date.getHours(), period = 'AM'

    if (hours > 12) {
        hours = hours - 12;
        period = 'PM'
    }

    const ms = date.getTime()
    return ({ day, date, ms, month, year, hours, minutes, period })
}

const CommentBox = ({ comment, user_name, nested, reply_to_user_name, timestamp, user_color }) => {
    return <div className={`commentBox ${nested ? 'nested' : ''}`}>
        <div>
            <div style={{
                background: user_color
            }}className='avatar'><span>{user_name.slice(0, 1)}</span></div>
            <b className='name'>{user_name}</b>
            <span className='date'>{formatDate(timestamp)}</span>
            <p className='comment'>
                {reply_to_user_name && <a onClick={() => {
                    alert('TODO: redirect to users profile')
                }} className='userLink'>@{reply_to_user_name}</a>}
                {comment}</p>
        </div>
        <span className='reply'>Reply</span>
    </div>
}