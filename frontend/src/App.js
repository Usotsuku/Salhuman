
import React, { useState, useEffect } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import { BrowserRouter,Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import AddEmployee from './components/Employee/AddEmployee';
import EmployeManagementPage from './components/Employee/EmployeesManagement';
import UpdateEmployee from './components/Employee/UpdateEmployee';
import DemanderCongePage from './components/Conge/DemanderConge';
import CongeListPage from './components/Conge/EmployeConge';
import ManagerCongesPage from './components/Manager/CongeList';
import AddHeureTravaillee from './components/Employee/AddHeureTravaillee';
import HoursWorked from './components/Manager/HoursWorked';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import PrivateRoute from './layouts/PrivateRoute';
import PayslipPage from './components/Manager/payslip';
import HoursWorkedPage from './components/Manager/tableHeure';
import EmployePayrollManagementPage from './components/Manager/EmployePayslipList';
import PayrollManagementPage from './components/Manager/PayslipList';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LoginPage />} />
                
                
                
                {UserService.managerOnly() && (
              <>
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/employe-management" element={<EmployeManagementPage />} />
                <Route path="/update-employe/:employeId" element={< UpdateEmployee />} />
                <Route path="/hours-worked/:employeId" element={<HoursWorkedPage />} />
                <Route path="/employefichepaielist" element={<EmployePayrollManagementPage />}/>
                <Route path="/fichepaielist" element={<PayrollManagementPage />}/>
                <Route path="/payroll/:ficheId" element={<PayslipPage />}/>
                <Route path="/managerCongeList" element={< ManagerCongesPage />} />
              </>
            )}

              
              
              {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/employe-management" element={<EmployeManagementPage />} />
                <Route path="/update-employe/:employeId" element={< UpdateEmployee />} />
                <Route path="/hours-worked/:employeId" element={<HoursWorkedPage />} />
                <Route path="/employefichepaielist" element={<EmployePayrollManagementPage />}/>
                <Route path="/fichepaielist" element={<PayrollManagementPage />}/>
                <Route path="/payroll/:ficheId" element={<PayslipPage />}/>
              </>
            )}
              {UserService.userOnly() &&(
              <>
              <Route path="/employefichepaielist" element={<EmployePayrollManagementPage />}/>
              <Route path="/hours-worked/:employeId" element={<HoursWorkedPage />} />
              <Route path="/add-hours-worked" element={<AddHeureTravaillee/>} />
              <Route path="/demanderConge" element={< DemanderCongePage />} />
              <Route path="/CongeList" element={< CongeListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/payroll/:ficheId" element={<PayslipPage />}/>
              </>
            )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;


/*
<div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />

            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/employe-management" element={<EmployeManagementPage />} />
                <Route path="/update-employe/:employeId" element={< UpdateEmployee />} />
                <Route path="/managerCongeList" element={< ManagerCongesPage />} />
                <Route path="/add-hours-worked" element={<AddHeureTravaillee/>} />
                <Route path="/hours-worked/:employeId" element= {<HoursWorked/>} />
              </>
            )}
            {UserService.userOnly() &&(
              <>
              <Route path="/demanderConge" element={< DemanderCongePage />} />
              <Route path="/CongeList" element={< CongeListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>



        <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/employe-management" element={<EmployeManagementPage />} />
                <Route path="/update-employe/:employeId" element={< UpdateEmployee />} />
                <Route path="/managerCongeList" element={< ManagerCongesPage />} />
                <Route path="/add-hours-worked" element={<AddHeureTravaillee/>} />
                <Route path="/hours-worked/:employeId" element= {<HoursWorked/>} />
              <Route path="/demanderConge" element={< DemanderCongePage />} />
              <Route path="/CongeList" element={< CongeListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
    </BrowserRouter>

              <div className="grid-container">
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        
      </div>
*/
