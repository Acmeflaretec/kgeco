import React,{useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


function Reset() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>Reset</div>
  )
}

export default Reset