import React, { useState } from 'react';
import './index.scss';
import COE from "../../../assets/images/osucoe.png";
import MT from "../../../assets/images/mt.png";

const Timeline = () => {
  const [events, setEvents] = useState([
    {
      date: 'August 2023 - Present',
      title: 'Ohio State Engineering Education Department',
      description: [
        '●	Educating students on <b>MATLAB</b> and <b>C</b> coding, guiding them toward a final software design project',
        '●	Grading lab reports and guiding students through <b>electronics</b> and <b>coding</b> labs, teamworking with other staff members',
        '●	<b>Full stack development</b> of online robotics store on <b>Node.js</b>, accessible by students',
        ],
      expanded: false,
      image: COE,
    },
    {
      date: 'June - August 2024',
      title: 'M&T Bank Technology Internship',
      description: [
        '●	Replaced an obsolete SAS tool to calculate monthly estimated credit losses for the bank using <b>Python</b> and <b>SQL</b> scripts',
        '●	Used a variety of libraries such as <b>Pandas</b> and <b>PYODBC</b> to simulate a hierarchical structure and preserve replicability on similar services',
        '●	Presented the cost-effective solution to auditors, which <b>saved thousands of dollars</b> in services fees',
        ],
      expanded: false,
      image: MT,
    },
  ]);

  const handleItemClick = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event, idx) => {
        if (idx === index) {
          return { ...event, expanded: !event.expanded };
        }
        return event;
      });
      return updatedEvents;
    });
  };

  return (
    <>
      <div className="timeline-container">
        {events.map((event, index) => (
          <div
            className={`timeline-item ${event.expanded ? 'expanded' : ''}`}
            key={index}
            onClick={() => handleItemClick(index)}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h2>{event.title}</h2>
              {event.expanded ? (
                <div>
                  {event.description.map((desc, descIndex) => (
                    <p key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="more">
                    <p>Click for more</p>
                  </div>
                  <div className="date">{event.date}</div>
                  <br/>
                  <img src={event.image} alt = "coe" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Hidden div for text-to-speech that includes all titles */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {events.map((event, index) => (
          <div key={`tts-${index}`}>
            <h2>{event.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Timeline;
