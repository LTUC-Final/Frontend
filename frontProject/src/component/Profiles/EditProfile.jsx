import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditProfile({ profile, onUpdate, onCancel }) {
const [form, setForm] = useState({
  firstname: profile.firstname || "",
  lastname: profile.lastname || "",
  email: profile.email || "",
  phone: profile.phone || "",
  profile_image: profile.profile_image ||  `https://ui-avatars.com/api/?name=${profile.firstname}+${profile.lastname}&background=random&color=fff`,
  bio: profile.role === "provider" ? profile.bio || "" : "",
  skills: profile.role === "provider" ? profile.skills || "" : ""
});


  useEffect(() => {
    if (profile) {
      setForm({
        firstname: profile.firstname ?? "",
        lastname: profile.lastname ?? "",
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        profile_image: profile.profile_image ?? null,
       bio: profile.role === "provider" ? profile.bio ?? "" : "",
       skills: profile.role === "provider" ? profile.skills ?? "" : ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name , value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      firstname: profile.firstname ?? "",
      lastname: profile.lastname ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      profile_image: profile.profile_image ?? null,
     bio: profile.role === "provider" ? profile.bio ?? "" : "",
     skills: profile.role === "provider" ? profile.skills ?? "" : ""

    });
    if (onCancel) onCancel(profile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });

    if (!result.isConfirmed) {
      if (result.isDenied) handleCancel();
      return;
    }

    try {
      const port = import.meta.env.VITE_PORT;
      let endpoint = "";
      let payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        phone: form.phone,
        profile_image: form.profile_image || null
      };

      if (profile.role === "provider") {
        
        payload.bio = form.bio;
        payload.skills = form.skills;
        endpoint = `http://localhost:${port}/api/provider/updateProviderProfile/${profile.user_id}`;
      } else {
    
        endpoint = `http://localhost:${port}/api/user/updateUserProfile/${profile.user_id}`;
      }

      const { data: updatedProfile } = await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
     
      onUpdate({ ...profile, ...updatedProfile.updated });

   
      Swal.fire("Saved!", "", "success");
    } catch (err) {
      console.error("Error updating profile:", err);
      Swal.fire("Error", "Failed to save changes.", "error");
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="space-y-4 max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border-2 border-navy-500"
>
      <div>
        <label className="block font-bold mb-1">First Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          value={form.firstname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          value={form.lastname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-bold mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {profile.role === "provider" ?(
        <>
          <div>
            <label className="block font-bold mb-1">Bio</label>
            <textarea
              name="bio"
              placeholder="Your bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </>
      ):<div></div>}

      <div className="flex gap-2 mt-3">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Save
        </button>
        <button type="button" className="bg-gray-400 px-3 py-1 rounded" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
