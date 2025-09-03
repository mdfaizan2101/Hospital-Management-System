import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const UpdateDoctor = () => {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
  
  const { isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/v1/user/doctors`,
          { withCredentials: true }
        );
        const doctor = data.doctors.find(d => d._id === id);
        if (doctor) {
          setFirstName(doctor.firstName || "");
          setLastName(doctor.lastName || "");
          setEmail(doctor.email || "");
          setPhone(doctor.phone || "");
          setAadhaar(doctor.aadhaar || "");
          setDob(doctor.dob ? doctor.dob.substring(0, 10) : "");
          setGender(doctor.gender || "");
          setDoctorDepartment(doctor.doctorDepartment || "");
          setDocAvatarPreview(doctor.docAvatar?.url || "");
        } else {
          toast.error("Doctor not found");
          navigateTo("/doctors");
        }
      } catch (error) {
        toast.error("Failed to fetch doctor data");
        navigateTo("/doctors");
      }
    };

    if (id) {
      fetchDoctorData();
    }
  }, [id, navigateTo]);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDocAvatarPreview(reader.result);
        setDocAvatar(file);
      };
    }
  };

  

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("aadhaar", aadhaar);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      
      if (docAvatar) {
        formData.append("docAvatar", docAvatar);
      }

      await axios.put(
        `${API_BASE}/api/v1/user/doctor/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Doctor updated successfully");
      navigateTo("/doctors");
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">UPDATE DOCTOR INFORMATION</h1>
        <form onSubmit={handleUpdateDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatar} />
              <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
                Leave empty to keep current photo
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Aadhaar Number"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={doctorDepartment}
                onChange={(e) => setDoctorDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>

              

              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Doctor"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default UpdateDoctor;
