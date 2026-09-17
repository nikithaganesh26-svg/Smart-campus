import { useState } from "react";
import "./Rating.css";

function Rating() {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);


  function handleSubmit(event) {

    event.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }


    const ratingData = {
      rating: rating,
      feedback: feedback,
      submittedAt: new Date().toISOString()
    };


    // Save rating in browser
    localStorage.setItem(
      "smartCampusRating",
      JSON.stringify(ratingData)
    );


    setSubmitted(true);
  }


  // =========================
  // THANK YOU PAGE
  // =========================

  if (submitted) {

    return (

      <div className="rating-page">

        <div className="rating-card thank-you-card">

          <div className="rating-logo">
            SJ
          </div>


          <p className="rating-small-title">
            SMART CAMPUS
          </p>


          <h1>
            Thank You!
          </h1>


          <p>
            Thank you for rating your
            Smart Campus experience.
          </p>


          <div className="submitted-stars">

            {Array.from(
              { length: 5 },
              (_, index) => (

                <span key={index}>

                  {index < rating
                    ? "★"
                    : "☆"
                  }

                </span>

              )
            )}

          </div>


          <button
            className="rating-done-button"
            onClick={() => {
              window.close();
            }}
          >
            Done
          </button>

        </div>

      </div>

    );
  }


  // =========================
  // RATING PAGE
  // =========================

  return (

    <div className="rating-page">

      <div className="rating-card">

        <div className="rating-logo">
          SJ
        </div>


        <p className="rating-small-title">
          SMART CAMPUS
        </p>


        <h1>
          How was your
          <br />
          experience?
        </h1>


        <p className="rating-description">

          We would love to know what you
          think about your Smart Campus
          experience.

        </p>


        {/* STAR RATING */}

        <div className="stars">

          {Array.from(
            { length: 5 },
            (_, index) => {

              const starNumber = index + 1;

              return (

                <button
                  key={starNumber}
                  type="button"
                  className="star-button"

                  onClick={() =>
                    setRating(starNumber)
                  }

                  onMouseEnter={() =>
                    setHoverRating(starNumber)
                  }

                  onMouseLeave={() =>
                    setHoverRating(0)
                  }

                  aria-label={
                    `${starNumber} star rating`
                  }
                >

                  {starNumber <=
                  (hoverRating || rating)
                    ? "★"
                    : "☆"
                  }

                </button>

              );

            }
          )}

        </div>


        {/* RATING TEXT */}

        <p className="rating-label">

          {rating === 1
            ? "Poor"

            : rating === 2
            ? "Fair"

            : rating === 3
            ? "Good"

            : rating === 4
            ? "Very Good"

            : rating === 5
            ? "Excellent"

            : "Select your rating"
          }

        </p>


        {/* FEEDBACK */}

        <form onSubmit={handleSubmit}>

          <textarea
            placeholder="Tell us about your experience (optional)"
            value={feedback}

            onChange={(event) =>
              setFeedback(event.target.value)
            }
          />


          <button
            type="submit"
            className="submit-rating-button"
          >

            Submit Rating

            <span>
              →
            </span>

          </button>

        </form>


        <p className="rating-footer">
          St. Joseph's Group of Institutions
        </p>

      </div>

    </div>

  );
}


export default Rating;