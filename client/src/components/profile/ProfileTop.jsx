import React from "react";


export default function ProfileTop(props) {
    const {
        profile: {
            avatar,
            status,
            company,
            location,
            website,
            social,
            user: {
                name
            }
        }
    } = props;

    return (
        <section className="profile__top">

            <img className="profile__avatar" src={avatar} alt="user avatar" />

            <h1 className="profile__name">
                {name}
            </h1>

            <small className="profile__details">
                {status} {company && <span> at {company}</span>}
            </small>

            <small>
                {location && <span>{location}</span>}
            </small>

            <div className="profile__links">
                {website && (
                    <a href={website} target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x' />
                    </a>
                )}
                {social && social.twitter && (
                    <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-twitter fa-2x' />
                    </a>
                )}
                {social && social.facebook && (
                    <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-facebook fa-2x' />
                    </a>
                )}
                {social && social.linkedin && (
                    <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-linkedin fa-2x' />
                    </a>
                )}
                {social && social.youtube && (
                    <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-youtube fa-2x' />
                    </a>
                )}
                {social && social.instagram && (
                    <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-instagram fa-2x' />
                    </a>
                )}
            </div>

        </section>
    );
}