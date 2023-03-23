import React, { useState, useEffect } from "react";
import YouTube from 'react-youtube';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


const Play = () => {

    const Location = useLocation();
    const data = Location.state?.data.id;

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [link, setLink] = useState(null);
    const [noteMsg, setNoteMsg] = useState(null);
    const [notes, setNotes] = useState([]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }

    const fetchCourseData = async (data) => {
        try {
            const res = await axios.get('/course/' + data);

            const courseData = res.data;
            const { lesson, link } = courseData.lessons[0];
            const defaultLink = {
                lesson,
                link
            }

            setLink(defaultLink);
            setCourse(courseData);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    const saveNote = async () => {
        const note = {
            courseId: course._id,
            lessonId: link.lesson,
            title: "Untitled",
            content: noteMsg
        }
        try {
            const res = await axios.post('/new/note', note);

            if (res.status === 201) {
                setNoteMsg("");
                fetchNotes();
            }
        } catch (error) {
            window.alert("Failed to save!");
        }
    }

    const fetchNotes = async () => {
        try {
            const notes = await axios.post('/note', { lessonId: link.lesson, courseId: course._id });

            if (notes.status === 200) {
                setNotes(notes.data);
            } else {
                setNotes([]);
            }

        } catch (error) {
            setNotes([]);
        }
    }

    const handleNote = e => setNoteMsg(e.target.value);

    useEffect(() => {
        if (!data) {
            return navigate("/dashboard");
        }

        fetchCourseData(data);
    }, []);


    return (<>
        <section className="sec-player">
            <div className="container">
                <div class="ratio ratio-21x9">
                    {link && <YouTube videoId={link.link} opts={opts} />}
                </div>

            </div>
        </section>


        <section className="course-content">
            <div className="container">
                <div>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation"><a className="nav-link active" role="tab" data-bs-toggle="tab"
                            href="#tab-1"><i className="fa-solid fa-book me-2"></i>Chapters</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-2"><i className="fa-solid fa-code me-2"></i>Practice</a></li>
                        <li onClick={fetchNotes} className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-3"><i className="fa-solid fa-note-sticky me-2"></i>Notes</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-4"><i className="fa-solid fa-link me-2"></i>Resources</a></li>
                    </ul>
                    <div className="tab-content py-4">
                        <div id="tab-1" className="tab-pane active" role="tabpanel">
                            <ul className="list-unstyled">
                                {course && <>{course.lessons.map(chapter => {
                                    const { lesson, link, lessonName } = chapter;
                                    return <li>
                                        <Link onClick={() => setLink({ lesson, link })}>
                                            <div>
                                                <h5>{lessonName}</h5><i
                                                    className="fa-solid fa-2x me-2 fa-caret-right"></i>
                                            </div>
                                        </Link>
                                    </li>
                                })}</>}
                            </ul>
                        </div>
                        <div id="tab-2" className="tab-pane" role="tabpanel">
                            <h5>It's empty!<i className="fa-regular fa-folder-open ms-3"></i></h5>
                        </div>
                        <div id="tab-3" className="tab-pane" role="tabpanel">
                            <div className="note mb-5">
                                <div className="note-top">
                                    <div className="timestamp">
                                        <h6 style={{ marginBottom: "0" }}>01:20</h6>
                                    </div>
                                    <div className="input-field">
                                        <input type="text" className="name-field" onFocus={(event) => event.target.select()} name="title"
                                            placeholder="Title" value="Untitled" />
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div className="timestamp">
                                        <i className="fa-solid fa-palette" style={{ color: "#fff" }}></i>
                                    </div>
                                    <div className="pallete">
                                        <div className="bold ms-2 ps-2 pe-2"><strong>B</strong></div>
                                        <div className="italic ps-2 pe-2"><em>I</em></div>
                                        <div className="color ps-2 pe-2">A</div>
                                    </div>
                                </div>
                                <div className="note-box">
                                    <textarea value={noteMsg} onChange={handleNote} className="note-content" placeholder="Write note here..." rows="4" />
                                </div>
                                <div className="note-bottom">
                                    <button onClick={saveNote} className="btn save-btn">Save note</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <h5>{notes.length ? "Your Notes" : "Notes empty"}</h5>
                            </div>
                            {notes && notes.map(note => {
                                return <>
                                    <div className="show-note">
                                        <div className="note-top">
                                            <div className="timestamp me-3">
                                                <h6 style={{ color: "ghostwhite" }} className="saved-note">01:20</h6>
                                            </div>
                                            <div className="saved-note">
                                                <h6>{note.title}</h6>
                                            </div>
                                            <div className="del-edit">
                                                <div><button className="btn"><i class="fa-solid fa-pencil"></i></button></div>
                                                <div><button className="btn"><i className="fa-solid fa-trash"></i></button></div>
                                            </div>
                                        </div>
                                        <div className="show-noteText">
                                            <p>{note.content}</p>
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                        <div id="tab-4" className="tab-pane" role="tabpanel">
                            <h5>No Resources for module.<i className="fa-solid fa-link-slash ms-3"></i></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Play;