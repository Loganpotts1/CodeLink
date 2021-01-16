import React from "react";
//  LOCAL
import guestIcon from "../../img/CodeLink_Guest_Icon.png";


export default function user(props) {
    const {
        profile: {
            avatar,
            status,
            company,
            location,
            website,
            social,
            bio,
            skills,
            user: {
                name
            }
        }
    } = props;

    
    return (
        <section className="user">


            <div className="user__top">

                <img className="user__avatar" src={avatar.length > 0 ? avatar : guestIcon} alt="user avatar" />

                <div className="user__details">

                    <h1>
                        {name}
                    </h1>

                    <aside>
                        <small>
                            {status} {company && <span> at {company}</span>}
                        </small>

                        <small>
                            {location && <span>{location}</span>}
                        </small>
                    </aside>
                    
                    <span className="user__links">
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
                    </span>

                </div>

            </div>


            {
                bio && 
                <div className="user__bio">
                    <h2>
                        {name.trim().split(' ')[0]}'s Bio
                    </h2>
                    <p>{bio}</p>
                </div>
            }


            <div className="line" />


            <div className="user__skills">
                {skills.map((skill, index) => (
                    <span key={index}>
                        {" " + skill}
                    </span>
                ))}
            </div>
        
        
        </section>
    );
}