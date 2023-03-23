import React from 'react';

const AddCourse = () => {
    return (<>
        <section>
            <div className='container'>
                <h5>Add link to automate!</h5>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Playlist link" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button class="btn btn-success" type="button" id="button-addon2">start</button>
                </div>
            </div>
            <div className="container mt-5">
                <h2 className="mb-4">Add Chapters</h2>
                <form>
                    <div className="form-group">
                        <label for="chapterTitle">Chapter ID</label>
                        <input type="text" className="form-control" id="ID" placeholder="Enter Chapter Title" />
                    </div>
                    <div className="form-group">
                        <label for="chapterTitle">Chapter Title</label>
                        <input type="text" className="form-control" id="chapterTitle" placeholder="Enter Chapter Title" />
                    </div>
                    <div className="form-group">
                        <label for="chapterNumber">Chapter Number</label>
                        <input type="number" className="form-control" id="chapterNumber" placeholder="Enter Chapter Number" />
                    </div>
                    <div className="form-group">
                        <label for="chapterAuthor">Chapter Author</label>
                        <input type="text" className="form-control" id="chapterAuthor" placeholder="Enter Chapter Author" />
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-auto">
                            <button type="button" className="btn btn-secondary mr-2">Cancel</button>
                            <button type="submit" className="btn btn-primary">Add Chapter</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>);
}

export default AddCourse;