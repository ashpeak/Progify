import React, { useState } from "react";
import axiosHelper from "../lib/axiosHelper";


const MCQGenerator = ({ lessonName }) => {
    const [mcqs, setMcqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState({}); // { [qIdx]: optionIdx }
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const generateMCQs = async () => {
        setLoading(true);
        setError("");
        setMcqs([]);
        setSelected({});
        setSubmitted(false);
        setScore(0);
        try {
            const res = await axiosHelper("/api/gemini-mcq", "POST", { lessonName });
            if (res?.data?.mcqs) setMcqs(res.data.mcqs.slice(0, 5)); // Only 5 questions
            else setError("No MCQs generated.");
        } catch (e) {
            setError("Failed to generate MCQs.");
        }
        setLoading(false);
    };

    const handleSelect = (qIdx, optIdx) => {
        if (submitted) return;
        setSelected(prev => ({ ...prev, [qIdx]: optIdx }));
    };

    const handleSubmit = () => {
        let sc = 0;
        mcqs.forEach((mcq, idx) => {
            if (selected[idx] !== undefined && mcq.options[selected[idx]] === mcq.answer) {
                sc++;
            }
        });
        setScore(sc);
        setSubmitted(true);
    };

    return (
        <div className="mb-4">
            <button className="btn btn-primary mb-3" onClick={generateMCQs} disabled={loading || !lessonName}>
                {loading ? "Generating MCQs..." : "Generate MCQs for this Lesson"}
            </button>
            {error && <div className="alert alert-danger">{error}</div>}
            {mcqs.length > 0 && (
                <form className="card p-3">
                    <div className="mb-3">
                        {mcqs.map((mcq, qIdx) => (
                            <div key={qIdx} className="list-group-item mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div className="mb-2"><strong>Q{qIdx + 1}. {mcq.question}</strong></div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    {mcq.options.map((opt, optIdx) => (
                                        <div className="form-check" key={optIdx} style={{ textAlign: 'left', width: '100%', display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`q${qIdx}`}
                                                id={`q${qIdx}opt${optIdx}`}
                                                value={optIdx}
                                                checked={selected[qIdx] === optIdx}
                                                onChange={() => handleSelect(qIdx, optIdx)}
                                                disabled={submitted}
                                                style={{ marginRight: '0.75rem' }}
                                            />
                                            <label className={`form-check-label ${submitted && mcq.options[optIdx] === mcq.answer ? 'fw-bold text-success' : ''} ${submitted && selected[qIdx] === optIdx && mcq.options[optIdx] !== mcq.answer ? 'text-danger' : ''}`}
                                                htmlFor={`q${qIdx}opt${optIdx}`}
                                                style={{ textAlign: 'left', width: '100%', marginBottom: 0 }}
                                            >
                                                {opt}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {submitted && (
                                    <div className="mt-2">
                                        {selected[qIdx] === undefined ? (
                                            <span className="badge bg-warning text-dark">Not answered</span>
                                        ) : mcq.options[selected[qIdx]] === mcq.answer ? (
                                            <span className="badge bg-success">Correct</span>
                                        ) : (
                                            <span className="badge bg-danger">Incorrect</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {!submitted && (
                        <button type="button" className="btn btn-success" onClick={handleSubmit} disabled={Object.keys(selected).length !== mcqs.length}>
                            Submit
                        </button>
                    )}
                    {submitted && (
                        <div className="alert alert-info mt-3">
                            Your Score: <strong>{score} / {mcqs.length}</strong>
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}

export default MCQGenerator;