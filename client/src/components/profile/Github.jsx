import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//  LOCAL
import { getGithub } from "../../actions/profile";


export default function ProfileGithub(props) {
    const { username } = props;
    const { repos } = useSelector(state => state.profile);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getGithub(username));
        // eslint-disable-next-line
    }, []);

    
    return (
        <section className="github">

            <i className="fab fa-github github__heading"></i>

            {repos.map(repo => (
                <div key={repo.id} className="github__repo">

                    <div className="github__info">
                        <a href={repo.html_url} rel="noopener noreferrer">
                            {repo.name.length > 30 ? repo.name.slice(0 , 30).concat("...") : repo.name}
                        </a>
                        <small>
                            {repo.description}
                        </small>
                    </div>
                    
                    <ul className="github__icons">
                        <li>
                            <i className="far fa-star github__icon github__icon--star"/>
                            {
                                repo.stargazers_count > 0 &&
                                <small>
                                    {repo.stargazers_count}
                                </small>
                            }
                        </li>
                        <li>
                            <i className="far fa-eye github__icon github__icon--watcher"/>
                            {
                                repo.watchers_count > 0 &&
                                <small>
                                    {repo.watchers_count}
                                </small>
                            }
                        </li>
                        <li>
                            <i className="fas fa-code-branch github__icon github__icon--fork"/>
                            {
                                repo.forks_count > 0 &&
                                <small>
                                    {repo.forks_count}
                                </small>
                            }
                        </li>
                    </ul>

                </div>
            ))}

        </section>
    );
}