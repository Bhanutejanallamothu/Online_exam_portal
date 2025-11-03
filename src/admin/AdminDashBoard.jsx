import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminDashBoard() {
  const admin = JSON.parse(sessionStorage.getItem('admin'));

  return (
    <div className="container mt-4">
      <h2>Welcome, {admin ? admin.username : 'Admin'}</h2> {/* match column name */}
      <p>This is the admin dashboard.</p>
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">View Courses</div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">View Students</div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">View Teachers</div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">View Exams</div>
        </div>
      </div>
    </div>
  );
}
