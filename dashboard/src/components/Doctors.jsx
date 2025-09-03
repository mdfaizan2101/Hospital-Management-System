import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [loadingIds, setLoadingIds] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const navigateTo = useNavigate();

  const setLoading = (id, isLoading) =>
    setLoadingIds((prev) => ({ ...prev, [id]: isLoading }));

  const refreshDoctors = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };
  useEffect(() => {
    refreshDoctors();
  }, []);

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!doctorToDelete) return;
    
    try {
      setLoading(doctorToDelete._id, true);
      await axios.delete(
        `http://localhost:4000/api/v1/user/doctor/${doctorToDelete._id}?confirm=true`,
        { withCredentials: true }
      );
      toast.success("Doctor deleted successfully");
      try {
        localStorage.setItem("doctors:changed", String(Date.now()));
      } catch {}
      // Remove from local state without refetch for snappy UX
      setDoctors((prev) => prev.filter((d) => d._id !== doctorToDelete._id));
      setShowDeleteModal(false);
      setDoctorToDelete(null);
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(Array.isArray(message) ? message[0] : message || "Delete failed");
    } finally {
      setLoading(doctorToDelete._id, false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDoctorToDelete(null);
  };

  const handleUpdate = (doctor) => {
    navigateTo(`/doctor/update/${doctor._id}`);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    Aadhar Number: <span>{element.aadhaar}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                  
                </div>
                <div className="actions" style={{ 
                  display: "flex", 
                  flexDirection: "row",
                  gap: 10, 
                  marginTop: 15,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}>
                  <button
                    onClick={() => handleUpdate(element)}
                    disabled={!!loadingIds[element._id]}
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      minWidth: "80px",
                      maxWidth: "120px",
                    }}
                  >
                    {loadingIds[element._id] ? "Updating..." : "Update"}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(element)}
                    disabled={!!loadingIds[element._id]}
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      minWidth: "80px",
                      maxWidth: "120px",
                    }}
                  >
                    {loadingIds[element._id] ? "Deleting..." : "Delete"}
                  </button>  
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          }}>
            <h3 style={{
              color: "#dc2626",
              marginBottom: "15px",
              fontSize: "20px",
              fontWeight: "600",
            }}>
              Confirm Deletion
            </h3>
            <p style={{
              color: "#666",
              marginBottom: "25px",
              fontSize: "16px",
              lineHeight: "1.5",
            }}>
              Are you sure you want to permanently delete{" "}
              <strong>{doctorToDelete?.firstName} {doctorToDelete?.lastName}</strong>?
              <br />
              <span style={{ color: "#dc2626", fontSize: "14px" }}>
                This action cannot be undone.
              </span>
            </p>
            <div style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
            }}>
              <button
                onClick={handleDeleteCancel}
                style={{
                  background: "#6b7280",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  minWidth: "80px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={!!loadingIds[doctorToDelete?._id]}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  minWidth: "80px",
                  opacity: loadingIds[doctorToDelete?._id] ? 0.6 : 1,
                }}
              >
                {loadingIds[doctorToDelete?._id] ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;