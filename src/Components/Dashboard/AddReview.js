import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const AddReview = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return;
  }
  // console.log(user);
  const handleReview = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    const ratting = event.target.ratting.value;
    const email = user?.email;
    const name = user?.displayName;
    axios
      .post(
        "https://audiobee.onrender.com/review",
        {
          comment: comment,
          ratting: ratting,
          email: email,
          name: name,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response) {
          event.target.comment.value = "";
          event.target.ratting.value = "";
          toast("Review added");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <section>
      <div className="card mx-auto mt-10 w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add review</h2>
          <form onSubmit={handleReview}>
            <label htmlFor="comment">Comment:</label>
            <input
              required
              name="comment"
              type="text"
              placeholder="Add your comment"
              className="my-2 input input-bordered input-success w-full max-w-xs"
            />
            <label className="" htmlFor="ratting">
              Ratting:
            </label>
            <input
              required
              type="number"
              name="ratting"
              min="0"
              max="5"
              placeholder="Rate us between 0 to 5"
              className="mt-2 input input-bordered input-success w-full max-w-xs"
            />
            <div className="card-actions justify-end">
              <input
                type="submit"
                value="Post"
                className="mt-4 btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
