import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery(
    ["userProfile"],
    async () =>
      await fetch(`http://localhost:5000/users?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );
  if (isLoading || loading) {
    return;
  }
  const updateProfile = async (event) => {
    event.preventDefault();
    const name = event?.target.name.value;
    const address = event?.target.address.value;
    const education = event?.target.education.value;
    const phone = event?.target.phone.value;
    const linkedin = event?.target.linkedin.value;
    const url = `http://localhost:5000/users/${profile._id}`;
    await axios
      .put(
        url,
        {
          name: name,
          address: address,
          education: education,
          linkedin: linkedin,
          phone: phone,
        },
        {
          headers: {
            authorization: `${user?.email} ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        // console.log(data);
        if (data) {
          toast("Profile updated");
          refetch();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <section className="">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="mx-auto card-title">Profile:</h2>
          <p>Name: {profile?.name || ""}</p>
          <p>Email: {profile?.email || ""}</p>
          <p>Address: {profile?.address || ""}</p>
          <p>Education: {profile?.education || ""}</p>
          <p>Phone: {profile?.phone || ""}</p>
          <p>LinkedIn profile: {profile?.linkedin || ""}</p>
        </div>
      </div>
      <div>
        <div className="card mt-10 w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mx-auto">Update Profile</h2>
            <form onSubmit={(event) => updateProfile(event)}>
              <label htmlFor="name">Name:</label>
              <input
                defaultValue={profile?.name}
                name="name"
                type="text"
                placeholder="Update your name"
                className="my-2 input input-bordered input-success w-full max-w-xs"
              />
              <label htmlFor="address">Address:</label>
              <input
                defaultValue={profile?.address}
                name="address"
                type="text"
                placeholder="Update your address"
                className="my-2 input input-bordered input-success w-full max-w-xs"
              />
              <label htmlFor="comment">Education:</label>
              <input
                defaultValue={profile?.education}
                name="education"
                type="text"
                placeholder="Update education background"
                className="my-2 input input-bordered input-success w-full max-w-xs"
              />
              <label htmlFor="phone">Phone:</label>
              <input
                defaultValue={profile?.phone}
                name="phone"
                type="number"
                placeholder="Update phone number"
                className="my-2 input input-bordered input-success w-full max-w-xs"
              />
              <label htmlFor="linkedin">LinkedIn Address:</label>
              <input
                defaultValue={profile?.linkedin}
                type="text"
                name="linkedin"
                placeholder="Update linkedin address"
                className="mt-2 input input-bordered input-success w-full max-w-xs"
              />
              <div className="card-actions justify-end">
                <input
                  type="submit"
                  value="Update"
                  className="mt-4 btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
