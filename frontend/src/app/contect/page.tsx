"use client "
import React from 'react'
import ProtectedRoute from '../../../components/ProtectedRoute'

function Contect() {
  return (
    <div>
      <ProtectedRoute>
        <h1>Contect</h1>
    </ProtectedRoute>
    </div>
  )
}

export default Contect
