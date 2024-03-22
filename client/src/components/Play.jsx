import React, { useState, useEffect, useRef } from "react";
import YouTube from 'react-youtube';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { IoChatboxOutline } from "react-icons/io5";
import { FaRegNoteSticky, FaLink, FaLinkSlash } from "react-icons/fa6";
import { VscBook } from "react-icons/vsc";


const Play = (props) => {

    const Location = useLocation();
    const data = Location.state?.id;
    const likeStatus = Location.state?.isLiked;

    const navigate = useNavigate();
    const pdfRef = useRef();

    const [course, setCourse] = useState(null);
    const [link, setLink] = useState(null);
    const [noteMsg, setNoteMsg] = useState(null);
    const [noteTitle, setNoteTitle] = useState("Untitled");
    const [notes, setNotes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isLiked, setIsLiked] = useState(likeStatus);
    const [totalLikes, setTotalLikes] = useState(0);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }

    const clickScroll = (id) => {
        const element = document.querySelector('#' + id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const nextLesson = (data) => {
        clickScroll("mainPlayer");
        setLink(data);
    }

    const fetchCourseData = async (data) => {
        try {
            const res = await axios.get(`/api/course/detail/${data}`);

            const courseData = res.data;
            setTotalLikes(courseData.love);

            const { lesson, link, lessonName } = courseData.lessons[0];
            const defaultLink = {
                lesson,
                link,
                lessonName
            }

            setLink(defaultLink);
            setCourse(courseData);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    const saveNote = async (e) => {
        e.preventDefault();
        if (!noteMsg) {
            return;
        }
        const note = {
            courseId: course._id,
            lessonId: link.lesson,
            title: noteTitle,
            content: noteMsg
        }
        try {
            const res = await axios.post('/note/new', note);

            if (res.status === 201) {
                setNoteMsg("");
                setNoteTitle("Untitled");
                fetchNotes();
            }
        } catch (error) {
            window.alert("Failed to save!");
        }
    }

    const setEdit = (id) => {
        setIsEditing(true);
        setEditingId(id);
        clickScroll("notes-sec");

        const element = document.querySelector("#i" + id);
        const prevNote = element.innerText;
        if (prevNote) {
            setNoteMsg(prevNote);
        }
    }

    const editNote = async (e, id) => {
        e.preventDefault();
        if (!noteMsg) {
            return;
        }
        const note = {
            courseId: course._id,
            lessonId: link.lesson,
            content: noteMsg,
            noteId: id
        }
        try {
            const res = await axios.post('/note/edit', note);

            if (res.status === 201) {
                setNoteMsg("");
                setNoteTitle("Untitled");
                fetchNotes();
                setIsEditing(false);
                setEditingId(null);
            }
        } catch (error) {
            window.alert("Failed to save!");
        }
    }
    const deleteNote = async (id) => {

        setNoteMsg("");
        setIsEditing(false);
        setEditingId(null);

        const note = {
            courseId: course._id,
            lessonId: link.lesson,
            noteId: id
        }

        try {
            const res = await axios.post('/note/delete', note);

            if (res.status === 200 && res.data.msg === 1) {
                fetchNotes();
            }
        } catch (error) {
            window.alert("Failed to delete!");
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

    const dolike = async () => {
        let link = '';

        if (isLiked) {
            setIsLiked(false);
            setTotalLikes(course.love - 1);
            link = '/user/course/unloved';
        } else {
            setIsLiked(true);
            setTotalLikes(course.love + 1);
            link = '/user/course/loved'
        }

        try {
            const res = await axios.post(link, { id: course._id });

            if (res.status === 200) {
                setTotalLikes(res.data.love);
            } else {
                setIsLiked(!isLiked);
            }

        } catch (error) {
            //
        }
    }

    const handleNote = e => setNoteMsg(e.target.value);
    const handleNoteTitle = e => setNoteTitle(e.target.value);

    useEffect(() => {
        if (props.setLoggedOff() === false) {
            navigate("/login");
        }
        if (!data) {
            return navigate("/dashboard");
        }

        fetchCourseData(data);
    }, []);


    return (<>
        <section id="mainPlayer" className="sec-player">
            <div className="container">
                <div className="ratio my-ratio">
                    {link && <YouTube
                        videoId={link.link}
                        opts={opts}
                        loading={"Loading..."}
                    />}
                </div>

            </div>
        </section>


        <section className="course-content">
            <div className="container">
                <div>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item" role="presentation"><a className="nav-link active" role="tab" data-bs-toggle="tab"
                            href="#tab-1"><VscBook className="me-2" size={"1.2rem"} />Chapters</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-2"><IoChatboxOutline className="me-2" size={"1.2rem"} />Discussion</a></li>
                        <li onClick={fetchNotes} className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-3"><FaRegNoteSticky className="me-2" size={"1.1rem"} />Notes</a></li>
                        <li className="nav-item" role="presentation"><a className="nav-link" role="tab" data-bs-toggle="tab"
                            href="#tab-4"><FaLink className="me-2" size={"1.2rem"} />Resources</a></li>
                    </ul>

                    <div className="tab-content py-4">
                        {link && <div className="playing acrdn-shadow">
                            <div className="creator-love mt-1 mb-2">
                                <p style={{ fontWeight: "500" }}>
                                    <img src={"/image/wave.gif"} alt="playing" />
                                    &nbsp;&nbsp;Module {link.lesson}</p>
                                <div className="like-comp">
                                    <i onClick={dolike} className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: (isLiked ? "#ff0000" : "#fff"), fontSize: "1.5em" }}></i>
                                    <span>{totalLikes}</span>
                                </div>
                            </div>
                            <div>
                                <p>{link.lessonName}</p>
                            </div>
                        </div>}

                        <div id="tab-1" className="tab-pane active" role="tabpanel">
                            <div className="accordion acrdn-shadow" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            {course && <p className='accordion-p'>{course.lessons.length} modules</p>}
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                        <div className="accordion-body">
                                            <ul className='list-group'>
                                                {course && <>{course.lessons.map(chapter => {
                                                    const { lesson, link, lessonName } = chapter;
                                                    return <li className='list-group-item'>
                                                        <Link onClick={() => nextLesson({ lesson, link, lessonName })}>
                                                            <div>
                                                                <i className="fa-solid fa-video"></i>
                                                                <p className="module-name">{lessonName}</p>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                })}</>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="tab-2" className="tab-pane" role="tabpanel">
                            <h5>It's empty!<i className="fa-regular fa-folder-open ms-3"></i></h5>
                        </div>
                        <div id="tab-3" className="tab-pane" role="tabpanel">
                            <div id="notes-sec" className="note mb-5">
                                <form>
                                    <div className="note-top">
                                        <div className="timestamp">
                                            <h6 style={{ marginBottom: "0" }}>N</h6>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" className="name-field" onFocus={(event) => event.target.select()} name="title"
                                                placeholder="Title" required onChange={handleNoteTitle} value={noteTitle} maxLength={15} />
                                        </div>
                                    </div>
                                    {/* <div style={{ display: "flex" }}>
                                        <div className="timestamp">
                                            <i className="fa-solid fa-palette" style={{ color: "#fff" }}></i>
                                        </div>
                                        <div className="pallete">
                                            <div className="bold ms-2 ps-2 pe-2"><strong>B</strong></div>
                                            <div className="italic ps-2 pe-2"><em>I</em></div>
                                            <div className="color ps-2 pe-2">A</div>
                                        </div>
                                    </div> */}
                                    <div className="note-box">
                                        <textarea value={noteMsg} required maxLength={500} onChange={handleNote} className="note-content" placeholder="Write note here..." rows="4" />
                                    </div>
                                    <div className="note-bottom">
                                        <button onClick={isEditing ? (e) => editNote(e, editingId) : (e) => saveNote(e)} className="btn save-btn">Save note</button>
                                    </div>
                                </form>
                            </div>
                            <div className="mb-3 note-download">
                                <h5>{notes.length ? "Your Notes" : "Notes empty"}</h5>
                                <div>
                                    {/* <h5 style={{ fontSize: "1.5rem" }} className="btn btn-sm">
                                        <i className="fa-solid fa-download" style={{ color: "#4882e5" }}></i>
                                    </h5> */}
                                </div>
                            </div>
                            {notes && notes.map(note => {
                                return <>
                                    <div ref={pdfRef} className="show-note mb-2" style={{ width: '100%' }}>
                                        <div className="note-top">
                                            <div className="saved-note">
                                                <h6 className="ps-1">{note.title}</h6>
                                            </div>
                                            <div className="del-edit">
                                                <div><button onClick={() => setEdit(note._id)} className="btn"><i className="fa-solid fa-pencil"></i></button></div>
                                                <div><button onClick={() => deleteNote(note._id)} className="btn"><i className="fa-solid fa-trash"></i></button></div>
                                            </div>
                                        </div>
                                        <div className="show-noteText">
                                            <p id={"i" + note._id}>{note.content}</p>
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>
                        <div id="tab-4" className="tab-pane" role="tabpanel">
                            <h5>No Resources for module.<FaLinkSlash className="ms-3" size={"1.5em"} /></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Play;