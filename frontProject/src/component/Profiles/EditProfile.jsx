import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditProfile({ profile, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    firstname: profile.firstname || "",
    lastname: profile.lastname || "",
    email: profile.email || "",
    phone: profile.phone || "",
    profile_image:
      profile.profile_image ||
      `https://ui-avatars.com/api/?name=${profile.firstname}+${profile.lastname}&background=random&color=fff`,
    bio: profile.role === "provider" ? profile.bio || "" : "",
    skills: profile.role === "provider" ? profile.skills || "" : "",
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
        skills: profile.role === "provider" ? profile.skills ?? "" : "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      skills: profile.role === "provider" ? profile.skills ?? "" : "",
    });
    if (onCancel) onCancel(profile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const result = await Swal.fire({
  title: "Do you want to save the changes?",
  text: "Make sure all information is correct.",
  icon: "question",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#E78B48",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: "Don't Save",
  cancelButtonText: "Cancel",
  confirmButtonColor: "#F5C45E",
  denyButtonColor: "#BE3D2A",
  cancelButtonColor: "#ccc",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm",
    denyButton: "swal2-custom-deny",
    cancelButton: "swal2-custom-cancel"
  }
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
        profile_image: form.profile_image || null,
      };

      if (profile.role === "provider") {
        payload.bio = form.bio;
        payload.skills = form.skills;
        endpoint = `https://backend-a2qq.onrender.com/api/provider/updateProviderProfile/${profile.user_id}`;
      } else {
        endpoint = `https://backend-a2qq.onrender.com/api/user/updateUserProfile/${profile.user_id}`;
      }

      const { data: updatedProfile } = await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      onUpdate({ ...profile, ...updatedProfile.updated });
     Swal.fire({
  title: "Saved!",
  text: "Your profile has been updated successfully.",
  icon: "success",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#F5C45E", 
  confirmButtonText: "OK",
  confirmButtonColor: "#F5C45E",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm"
  }
});

    } catch (err) {
      console.error("Error updating profile:", err);
Swal.fire({
  title: "Error",
  text: "Failed to save changes.",
  icon: "error",
  background: "#FFF6E9",
  color: "#102E50",
  iconColor: "#BE3D2A", 
  confirmButtonText: "OK",
  confirmButtonColor: "#BE3D2A",
  customClass: {
    popup: "swal2-custom-popup",
    title: "swal2-custom-title",
    confirmButton: "swal2-custom-confirm"
  }
});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-2xl mx-auto p-4 sm:p-6 bg-[#FFF6E9] border border-[#BE3D2A] rounded-xl shadow-md"
    >
      {/* First Name */}
      <div>
        <label className="block text-sm font-semibold text-[#102E50] mb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstname"
          placeholder="First name"
          value={form.firstname}
          onChange={handleChange}
          className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-semibold text-[#102E50] mb-1">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          value={form.lastname}
          onChange={handleChange}
          className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-[#102E50] mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-[#102E50] mb-1">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
        />
      </div>

      {/* Bio & Skills for Providers */}
      {profile.role === "provider" && (
        <>
          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-[#102E50] mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Your bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
              rows={4}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-[#102E50] mb-1">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full border border-[#102E50]/30 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5C45E] transition"
            />
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-start gap-3 pt-2">
        <button
          type="submit"
          className="bg-[#BE3D2A] text-[#FFF6E9] px-5 py-2 rounded-md shadow hover:bg-[#a3301f] transition"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-[#102E50] px-5 py-2 rounded-md shadow hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}