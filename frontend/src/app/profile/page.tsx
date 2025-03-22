"use client"
import React from 'react'
import TopBar from '../../../section/TopBar'
import ProtectedRoute from '../../../components/ProtectedRoute'

function Profile() {
  return (
    <div>
      <ProtectedRoute>
        <TopBar />
      </ProtectedRoute>
    </div>
  );
}

export default Profile
